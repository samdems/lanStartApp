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
    Route::resource('gameKeys', App\Http\Controllers\GameKeyController::class)->except('index','show');
    Route::post('gameKeys/{gameKey}/assign', [App\Http\Controllers\GameKeyController::class, 'assign'])->name('gameKeys.assign');
    Route::post('gameKeys/{gameKey}/unassign', [App\Http\Controllers\GameKeyController::class, 'unassign'])->name('gameKeys.unassign');
});

