<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['bloodline_name'])]
class Bloodline extends Model
{
    /** @use HasFactory<\Database\Factories\BloodlineFactory> */
    use HasFactory;

    /**
     * Get the gamecocks for the bloodline.
     */
    public function gamecocks(): HasMany
    {
        return $this->hasMany(Gamecock::class);
    }
}
