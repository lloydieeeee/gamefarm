<?php

namespace App\Http\Controllers\Appointment;

use App\Enums\AppointmentStatus;
use App\Enums\GamecockStatus;
use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminAppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('appointments/index', [
            'appointments' => Appointment::with(['user', 'gamecock.bloodline'])->latest()->get(),
        ]);
    }

    /**
     * Approve the appointment and reserve its gamecock.
     */
    public function approve(Appointment $appointment): RedirectResponse
    {
        DB::transaction(function () use ($appointment): void {
            $appointment->update(['appointment_status' => AppointmentStatus::APPROVED->value]);

            $gamecock = $appointment->gamecock;

            if ($gamecock && $gamecock->gamecock_status !== GamecockStatus::SOLD->value) {
                $gamecock->update(['gamecock_status' => GamecockStatus::RESERVED->value]);
            }
        });

        return back();
    }

    /**
     * Cancel the appointment and free its gamecock again.
     */
    public function cancel(Appointment $appointment): RedirectResponse
    {
        DB::transaction(function () use ($appointment): void {
            $appointment->update(['appointment_status' => AppointmentStatus::CANCELLED->value]);

            $gamecock = $appointment->gamecock;

            if (! $gamecock || $gamecock->gamecock_status !== GamecockStatus::RESERVED->value) {
                return;
            }

            // Keep the gamecock reserved while another approved appointment is still open for it.
            $stillReserved = Appointment::query()
                ->where('gamecock_id', $gamecock->id)
                ->whereKeyNot($appointment->id)
                ->where('appointment_status', AppointmentStatus::APPROVED->value)
                ->exists();

            if (! $stillReserved) {
                $gamecock->update(['gamecock_status' => GamecockStatus::AVAILABLE->value]);
            }
        });

        return back();
    }
}
