<?php

use App\Models\Admin;
use App\Models\Appointment;
use App\Models\Bloodline;
use App\Models\Gamecock;
use App\Models\Maturity;
use App\Models\User;
use Illuminate\Support\Facades\DB;

function makeGamecockForAdminTest(): Gamecock
{
    $bloodline = Bloodline::forceCreate(['bloodline_name' => 'Sweepers '.uniqid()]);
    $maturity = Maturity::forceCreate([
        'maturity_name' => 'Stag '.uniqid(),
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

function makeAppointmentForAdminTest(Gamecock $gamecock, string $status = 'pending'): Appointment
{
    return Appointment::forceCreate([
        'user_id' => User::factory()->create()->id,
        'gamecock_id' => $gamecock->id,
        'appointment_start_at' => '2026-11-05 01:00:00',
        'appointment_end_at' => '2026-11-05 02:00:00',
        'appointment_status' => $status,
        'appointment_purpose' => 'preview',
    ]);
}

test('guests cannot approve or cancel appointments', function () {
    $appointment = makeAppointmentForAdminTest(makeGamecockForAdminTest());

    $this->patch("/admin/appointments/{$appointment->id}/approve")
        ->assertRedirect('/admin/login');

    $this->patch("/admin/appointments/{$appointment->id}/cancel")
        ->assertRedirect('/admin/login');

    expect(DB::table('appointments')->where('appointment_status', 'pending')->count())->toBe(1);
});

test('approving an appointment reserves the gamecock', function () {
    $admin = Admin::factory()->create();
    $gamecock = makeGamecockForAdminTest();
    $appointment = makeAppointmentForAdminTest($gamecock);

    $this->actingAs($admin, 'admin')
        ->patch("/admin/appointments/{$appointment->id}/approve")
        ->assertRedirect();

    expect($appointment->fresh()->appointment_status)->toBe('approved')
        ->and($gamecock->fresh()->gamecock_status)->toBe('reserved');
});

test('cancelling an appointment frees the gamecock', function () {
    $admin = Admin::factory()->create();
    $gamecock = makeGamecockForAdminTest();
    $appointment = makeAppointmentForAdminTest($gamecock, 'approved');
    $gamecock->update(['gamecock_status' => 'reserved']);

    $this->actingAs($admin, 'admin')
        ->patch("/admin/appointments/{$appointment->id}/cancel")
        ->assertRedirect();

    expect($appointment->fresh()->appointment_status)->toBe('cancelled')
        ->and($gamecock->fresh()->gamecock_status)->toBe('available');
});

test('a gamecock stays reserved while another appointment is still approved', function () {
    $admin = Admin::factory()->create();
    $gamecock = makeGamecockForAdminTest();
    $first = makeAppointmentForAdminTest($gamecock, 'approved');
    $second = makeAppointmentForAdminTest($gamecock, 'approved');
    $gamecock->update(['gamecock_status' => 'reserved']);

    $this->actingAs($admin, 'admin')
        ->patch("/admin/appointments/{$second->id}/cancel")
        ->assertRedirect();

    expect($second->fresh()->appointment_status)->toBe('cancelled')
        ->and($first->fresh()->appointment_status)->toBe('approved')
        ->and($gamecock->fresh()->gamecock_status)->toBe('reserved');
});
