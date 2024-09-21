<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\GameKey;
use Illuminate\Http\Request;

class GameKeyController extends Controller
{

    public function store(Request $request)
    {
        $request->validate([
            'game_id' => 'required|integer|exists:games,id',
            'key' => 'required|string|unique:game_keys,key',
        ]);

        Game::findOrFail($request->game_id)->gameKeys()->create([
            'key' => $request->key,
        ]);

        return redirect()->route('games.show', $request->game);
    }

    public function destroy(Game $game, GameKey $gameKey)
    {
        $gameKey->delete();

        return redirect()->route('games.show', $gameKey->game);
    }

    public function assign(Request $request, Game $game, GameKey $gameKey)
    {
        $validated = $request->validate([
            'user_name' => 'required|string',
        ]);

        $gameKey->user_name = $validated['user_name'];
        $gameKey->assigned_at = now();

        $gameKey->save();

        return redirect()->route('games.show', $gameKey->game);
    }
    public function unassign(Game $game, GameKey $gameKey)
    {

        $gameKey->user_name = null;
        $gameKey->assigned_at = null;

        $gameKey->save();

        return redirect()->route('games.show', $gameKey->game);
    }
}
