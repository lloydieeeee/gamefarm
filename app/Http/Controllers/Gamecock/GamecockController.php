<?php

namespace App\Http\Controllers\Gamecock;

use App\Enums\AppointmentPurpose;
use App\Http\Controllers\Controller;
use App\Models\Gamecock;
use Inertia\Inertia;

class GamecockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $gamecocks = Gamecock::with(['bloodline', 'maturity'])->where('gamecock_status', 'available')->get();
        $appointment_purposes = AppointmentPurpose::options();

        return Inertia::render('gamecocks', [
            'gamecocks' => $gamecocks,
            'appointment_purposes' => $appointment_purposes
        ]);
    }
}
