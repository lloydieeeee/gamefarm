<?php

namespace App\Models;

use Database\Factories\AppointmentFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['user_id', 'gamecock_id', 'appointment_start_at', 'appointment_end_at', 'appointment_status', 'appointment_purpose'])]
class Appointment extends Model
{
    /** @use HasFactory<AppointmentFactory> */
    use HasFactory;

    /**
     * Get the user that owns the appointment.
     *
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the gamecock the appointment is for.
     *
     * @return BelongsTo<Gamecock, $this>
     */
    public function gamecock(): BelongsTo
    {
        return $this->belongsTo(Gamecock::class);
    }
}
