<?php

namespace App\Http\Controllers;

use App\Http\Resources\GameResource;
use Illuminate\Http\Request;
use App\Models\Game;

class GamesApiController extends Controller
{
    public function index(Request $request)
    {
        return GameResource::collection( Game::all());
    }

}
