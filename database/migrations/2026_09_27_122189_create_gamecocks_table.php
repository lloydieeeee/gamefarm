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
        Schema::create('gamecocks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('bloodline_id')->constrained();
            $table->foreignId('maturity_id')->constrained();
            $table->foreignId('payment_id')->nullable()->constrained();
            $table->string('gamecock_image')->nullable();
            $table->string('gamecock_hatch_date');
            $table->string('gamecock_price');
            $table->string('gamecock_status')->default('available');
            $table->string('gamecock_weight');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gamecocks');
    }
};
