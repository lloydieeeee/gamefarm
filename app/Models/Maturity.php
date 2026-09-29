<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['maturity_name', 'maturity_min_age', 'maturity_max_age'])]
class Maturity extends Model
{
    /** @use HasFactory<\Database\Factories\MaturityFactory> */
    use HasFactory;
}
