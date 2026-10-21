<?php

namespace Database\Seeders;

use App\Models\Bloodline;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BloodlineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $bloodlines = [
            'Golden Boy Sweater',
            'Pyle Sweater',
            'Sweater Grey',
            'White Hatch',
            'Grey Hatch',
            'Pumpkin Hatch'
        ];

        foreach ($bloodlines as $bloodline) {
            Bloodline::create([
                'bloodline_name' => $bloodline,
            ]);
        }
    }
}
