<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GamesController;

Route::resource('games', GamesController::class)->only(['index', 'show']);
