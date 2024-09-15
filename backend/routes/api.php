<?php

use Illuminate\Support\Facades\Route;

Route::get('games', [App\Http\Controllers\GamesAPIController::class, 'index'])->name('api.games.index');
Route::get('ping', fn () => response()->json(['message' => 'pong']));
