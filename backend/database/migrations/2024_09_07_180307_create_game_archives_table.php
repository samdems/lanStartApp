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
        Schema::create('game_archives', function (Blueprint $table) {
            $table->id();
            $table->string('version');
            $table->string('file');
            $table->foreignId('game_id')->constrained();
            $table->string('operating_system');
            $table->longText('script');

            $table->unique(['game_id', 'version']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('game_archives');
    }
};
