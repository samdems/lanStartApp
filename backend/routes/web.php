<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';


Route::get('games/delete', [App\Http\Controllers\GamesController::class, 'delete']);
Route::resource('games', App\Http\Controllers\GamesController::class);

Route::prefix('games/{game}')->group(function () {
    Route::resource('gameArchives', App\Http\Controllers\GameArchiveController::class)->except('index','show');
});


Route::get('/api/games', [App\Http\Controllers\GamesAPIController::class, 'index'])->name('api.games.index');
Route::get('/api/ping', fn() => response()->json(['message' => 'pong']));
