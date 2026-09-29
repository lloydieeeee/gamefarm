<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('maturities', function (Blueprint $table) {
            $table->id();
            $table->string('maturity_name')->unique();
            $table->string('maturity_min_age');
            $table->string('maturity_max_age');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maturities');
    }
};
