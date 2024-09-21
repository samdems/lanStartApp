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
        Schema::create('game_keys', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->string('user_name')->unique()->nullable();
            $table->foreignId('game_id')->constrained()->onDelete('cascade');
            $table->dateTime('assigned_at')->nullable();
            $table->timestamps();
        });

        Schema::table('games', function (Blueprint $table) {
            $table->boolean('has_keys')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('game_keys');

        Schema::table('games', function (Blueprint $table) {
            $table->dropColumn('has_keys');
        });
    }
};
