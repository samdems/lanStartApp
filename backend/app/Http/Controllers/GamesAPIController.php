<?php

namespace App\Http\Controllers;

use App\Http\Resources\GameResource;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Game;

class GamesAPIController extends Controller
{
    public function index(Request $request)
    {
        return GameResource::collection( Game::all());
    }
}
