<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Admin::factory()->create([
            'name' => 'Test Admin',
            'email' => 'admin@email.com',
        ]);
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@email.com',
        ]);

        $this->call([
            BloodlineSeeder::class,
            MaturitySeeder::class,
            GamecockSeeder::class,
        ]);
    }
}
