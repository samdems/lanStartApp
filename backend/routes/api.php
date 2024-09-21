<?php

use Illuminate\Support\Facades\Route;

Route::get('keys', [App\Http\Controllers\GameKeyApiController::class, 'index'])->name('api.keys.index');
Route::get('games', [App\Http\Controllers\GamesApiController::class, 'index'])->name('api.games.index');
Route::post('games/{game}/keys/assign-next', [App\Http\Controllers\GameKeyApiController::class, 'assignNext'])->name('api.games.keys.assign-next');
Route::post('games/{game}/keys/unassign', [App\Http\Controllers\GameKeyApiController::class, 'unassign'])->name('api.games.keys.unassign');
Route::get('ping', fn () => response()->json(['message' => 'pong']));


Route::get('/', function () {
    return ['message' => 'Welcome to the Game API'];
});
