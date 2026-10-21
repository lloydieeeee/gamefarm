<?php

use App\Models\Bloodline;
use App\Models\Gamecock;
use App\Models\Maturity;
use App\Models\User;
use Illuminate\Support\Facades\DB;

function makeGamecock(): Gamecock
{
    $bloodline = Bloodline::forceCreate(['bloodline_name' => 'Sweepers']);
    $maturity = Maturity::forceCreate([
        'maturity_name' => 'Stag',
        'maturity_min_age' => '10',
        'maturity_max_age' => '14',
    ]);

    return Gamecock::forceCreate([
        'bloodline_id' => $bloodline->id,
        'maturity_id' => $maturity->id,
        'gamecock_hatch_date' => '2026-01-01',
        'gamecock_price' => '5000',
        'gamecock_weight' => '3',
    ]);
}

test('guests cannot book an appointment', function () {
    $this->post('/appointments', [
        'gamecock_id' => makeGamecock()->id,
        'appointment_start_at' => '2026-11-05T01:00:00.000Z',
        'appointment_end_at' => '2026-11-05T02:00:00.000Z',
        'appointment_purpose' => 'preview',
    ])->assertRedirect('/login');
});

test('a logged in user can book a one hour slot', function () {
    $user = User::factory()->create();
    $gamecock = makeGamecock();

    $this->actingAs($user)->post('/appointments', [
        'gamecock_id' => $gamecock->id,
        'appointment_start_at' => '2026-11-05T01:00:00.000Z',
        'appointment_end_at' => '2026-11-05T02:00:00.000Z',
        'appointment_purpose' => 'preview',
    ])->assertRedirect()->assertSessionHasNoErrors();

    $this->assertDatabaseHas('appointments', [
        'user_id' => $user->id,
        'gamecock_id' => $gamecock->id,
        'appointment_start_at' => '2026-11-05 01:00:00',
        'appointment_end_at' => '2026-11-05 02:00:00',
        'appointment_purpose' => 'preview',
        'appointment_status' => 'pending',
    ]);
});

test('a slot in the past is rejected', function () {
    $user = User::factory()->create();
    $gamecock = makeGamecock();

    $this->actingAs($user)->post('/appointments', [
        'gamecock_id' => $gamecock->id,
        'appointment_start_at' => '2020-01-01T01:00:00.000Z',
        'appointment_end_at' => '2020-01-01T02:00:00.000Z',
        'appointment_purpose' => 'preview',
    ])->assertSessionHasErrors('appointment_start_at');

    expect(DB::table('appointments')->count())->toBe(0);
});

test('the slot must last exactly one hour', function () {
    $user = User::factory()->create();
    $gamecock = makeGamecock();

    $this->actingAs($user)->post('/appointments', [
        'gamecock_id' => $gamecock->id,
        'appointment_start_at' => '2026-11-05T01:00:00.000Z',
        'appointment_end_at' => '2026-11-05T03:00:00.000Z',
        'appointment_purpose' => 'preview',
    ])->assertSessionHasErrors('appointment_end_at');

    expect(DB::table('appointments')->count())->toBe(0);
});

test('the start, end and purpose are required', function () {
    $user = User::factory()->create();

    $this->actingAs($user)->post('/appointments', [
        'gamecock_id' => makeGamecock()->id,
        'appointment_purpose' => 'unknown',
    ])->assertSessionHasErrors([
        'appointment_start_at',
        'appointment_end_at',
        'appointment_purpose',
    ]);
});
