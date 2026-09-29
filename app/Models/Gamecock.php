<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['gamecock_bloodline', 'gamecock_hatch_date', 'gamecock_weight', 'gamecock_price', 'gamecock_status'])]
class Gamecock extends Model
{
    /** @use HasFactory<\Database\Factories\GamecockFactory> */
    use HasFactory;
}
