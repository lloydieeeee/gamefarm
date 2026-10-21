<?php

namespace App\Http\Controllers\Appointment;

use App\Enums\AppointmentPurpose;
use App\Enums\AppointmentStatus;
use App\Http\Controllers\Controller;
use App\Models\Appointment;
use Closure;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Validation\Rule;

class AppointmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'gamecock_id' => ['required', 'integer', 'exists:gamecocks,id'],
            'appointment_start_at' => ['required', 'date', 'after:now'],
            'appointment_end_at' => [
                'required',
                'date',
                'after:appointment_start_at',
                function (string $attribute, mixed $value, Closure $fail) use ($request) {
                    $this->lastsOneHour($request, $value, $fail);
                },
            ],
            'appointment_purpose' => ['required', Rule::enum(AppointmentPurpose::class)],
        ], [
            'appointment_start_at.required' => 'The appointment date field is required.',
            'appointment_start_at.after' => 'The appointment must be scheduled after the current date and time.',
            'appointment_end_at.required' => 'The appointment time field is required.',
            'appointment_purpose.required' => 'The appointment purpose field is required.',
            'appointment_purpose.enum' => 'The selected appointment purpose is invalid.',
        ]);

        Appointment::create([
            'user_id' => $request->user()->id,
            'gamecock_id' => $validated['gamecock_id'],
            'appointment_start_at' => Carbon::parse($validated['appointment_start_at'])->format('Y-m-d H:i:s'),
            'appointment_end_at' => Carbon::parse($validated['appointment_end_at'])->format('Y-m-d H:i:s'),
            'appointment_status' => AppointmentStatus::PENDING->value,
            'appointment_purpose' => $validated['appointment_purpose'],
        ]);

        return redirect()->route('gamecocks');
    }

    /**
     * Appointments always last exactly one hour.
     */
    private function lastsOneHour(Request $request, mixed $value, Closure $fail): void
    {
        $start = Carbon::parse($request->input('appointment_start_at'));
        $end = Carbon::parse($value);

        if ($end->format('Y-m-d H:i:s') !== $start->copy()->addHour()->format('Y-m-d H:i:s')) {
            $fail('The appointment must last exactly 1 hour.');
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Appointment $appointment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Appointment $appointment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Appointment $appointment)
    {
        //
    }
}
