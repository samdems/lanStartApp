<?php

namespace App\Http\Controllers;

use App\Http\Resources\GameResource;
use App\Models\Game;
use Illuminate\Http\Request;

class GamesController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $games = Game::paginate($perPage);

        return GameResource::collection($games);
    }

    public function show(Game $game, Request $request)
    {
        $game->load('keys');
        $game->load('archives');

        return GameResource::make($game);
    }
}
