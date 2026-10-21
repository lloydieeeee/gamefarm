<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['bloodline_id', 'maturity_id', 'gamecock_hatch_date', 'gamecock_image', 'gamecock_weight', 'gamecock_price', 'gamecock_status'])]
class Gamecock extends Model
{
    /** @use HasFactory<\Database\Factories\GamecockFactory> */
    use HasFactory;

    /**
     * Get the gamecock that belongs to a bloodline.
     */
    public function bloodline(): BelongsTo
    {
        return $this->belongsTo(Bloodline::class);
    }

    /**
     * Get the gamecock that belongs to a maturity.
     */
    public function maturity(): BelongsTo
    {
        return $this->belongsTo(Maturity::class);
    }
}
