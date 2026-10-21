<?php

namespace Database\Seeders;

use App\Models\Maturity;
use Illuminate\Database\Seeder;

class MaturitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Maturity::create([
            'maturity_name' => 'Young Stag',
            'maturity_min_age' => 6,
            'maturity_max_age' => 12,
        ]);

        Maturity::create([
            'maturity_name' => 'Bull Stag',
            'maturity_min_age' => 12,
            'maturity_max_age' => 18,
        ]);

        Maturity::create([
            'maturity_name' => 'Battle Stag',
            'maturity_min_age' => 24,
            'maturity_max_age' => 36,
        ]);
    }
}
