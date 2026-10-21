<?php

namespace Database\Seeders;

use App\Enums\GamecockStatus;
use App\Models\Gamecock;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class GamecockSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Gamecock::create([
            'bloodline_id' => 1,
            'maturity_id' => 1,
            'gamecock_image' => '/storage/images/1792426981_golden_boy_sweater.jpg',
            'gamecock_hatch_date' => Carbon::parse("2026-06-20"),
            'gamecock_price' => 1500,
            'gamecock_status' => GamecockStatus::AVAILABLE->value,
            'gamecock_weight' => 4
        ]);

        Gamecock::create([
            'bloodline_id' => 1,
            'maturity_id' => 1,
            'gamecock_image' => '/storage/images/1792427027_golden_boy_sweater (1).jpg',
            'gamecock_hatch_date' => Carbon::parse("2026-06-20"),
            'gamecock_price' => 1300,
            'gamecock_status' => GamecockStatus::AVAILABLE->value,
            'gamecock_weight' => 3
        ]);

        Gamecock::create([
            'bloodline_id' => 1,
            'maturity_id' => 1,
            'gamecock_image' => '/storage/images/1792427286_golden_boy_sweater (2).jpg',
            'gamecock_hatch_date' => Carbon::parse("2026-06-20"),
            'gamecock_price' => 1400,
            'gamecock_status' => GamecockStatus::AVAILABLE->value,
            'gamecock_weight' => 4
        ]);
        
        Gamecock::create([
            'bloodline_id' => 1,
            'maturity_id' => 2,
            'gamecock_image' => '/storage/images/1792427436_golden_boy_sweater.jpg',
            'gamecock_hatch_date' => Carbon::parse("2025-10-20"),
            'gamecock_price' => 3500,
            'gamecock_status' => GamecockStatus::AVAILABLE->value,
            'gamecock_weight' => 4
        ]);

        Gamecock::create([
            'bloodline_id' => 1,
            'maturity_id' => 2,
            'gamecock_image' => '/storage/images/1792427517_golden_boy_sweater (2).jpg',
            'gamecock_hatch_date' => Carbon::parse("2025-10-20"),
            'gamecock_price' => 4000,
            'gamecock_status' => GamecockStatus::AVAILABLE->value,
            'gamecock_weight' => 5
        ]);

        Gamecock::create([
            'bloodline_id' => 2,
            'maturity_id' => 2,
            'gamecock_image' => '/storage/images/1792427611_pyle_sweater.jpg',
            'gamecock_hatch_date' => Carbon::parse("2025-10-20"),
            'gamecock_price' => 5000,
            'gamecock_status' => GamecockStatus::AVAILABLE->value,
            'gamecock_weight' => 5
        ]);

        Gamecock::create([
            'bloodline_id' => 3,
            'maturity_id' => 2,
            'gamecock_image' => '/storage/images/1792427659_sweater_grey.jpg',
            'gamecock_hatch_date' => Carbon::parse("2025-10-20"),
            'gamecock_price' => 5500,
            'gamecock_status' => GamecockStatus::AVAILABLE->value,
            'gamecock_weight' => 6
        ]);

        Gamecock::create([
            'bloodline_id' => 1,
            'maturity_id' => 3,
            'gamecock_image' => '/storage/images/1792427954_golden_boy_sweater.jpg',
            'gamecock_hatch_date' => Carbon::parse("2025-05-20"),
            'gamecock_price' => 6000,
            'gamecock_status' => GamecockStatus::AVAILABLE->value,
            'gamecock_weight' => 7
        ]);

        Gamecock::create([
            'bloodline_id' => 5,
            'maturity_id' => 3,
            'gamecock_image' => '/storage/images/1792428051_grey_hatch.jpg',
            'gamecock_hatch_date' => Carbon::parse("2025-05-20"),
            'gamecock_price' => 6500,
            'gamecock_status' => GamecockStatus::AVAILABLE->value,
            'gamecock_weight' => 7
        ]);

        Gamecock::create([
            'bloodline_id' => 6,
            'maturity_id' => 3,
            'gamecock_image' => '/storage/images/1792428143_pumpkin_hatch.jpg',
            'gamecock_hatch_date' => Carbon::parse("2025-05-20"),
            'gamecock_price' => 6700,
            'gamecock_status' => GamecockStatus::AVAILABLE->value,
            'gamecock_weight' => 8
        ]);

        Gamecock::create([
            'bloodline_id' => 4,
            'maturity_id' => 3,
            'gamecock_image' => '/storage/images/1792428208_white_hatch.jpg',
            'gamecock_hatch_date' => Carbon::parse("2025-05-20"),
            'gamecock_price' => 7000,
            'gamecock_status' => GamecockStatus::AVAILABLE->value,
            'gamecock_weight' => 8
        ]);
    }
}
