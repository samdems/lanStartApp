<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\GameKey;
use Illuminate\Http\Request;

class GameKeyApiController extends Controller
{
    public function index(Request $request)
    {
        $username = $request->input('username');

        if ($username) {
            return GameKey::where('user_name', $username)->with('game')->get();
        }

        return false;
    }

    public function assignNext(Request $request, Game $game)
    {
        $validated = $request->validate([
            'user_name' => 'required|string',
        ]);

        $gameKey = GameKey::where('game_id', $game->id)
            ->whereNull('user_name')
            ->first();

        if (!$gameKey) {
            return response()->json(['message' => 'No keys available'], 404);
        }

        $gameKey->user_name = $validated['user_name'];
        $gameKey->assigned_at = now();

        $gameKey->save();

        return response()->json(['message' => 'Key assigned']);
    }
    public function unassign(Request $request, Game $game)
    {
        $validated = $request->validate([
            'user_name' => 'required|string',
        ]);

        $gameKey = GameKey::where('game_id', $game->id)
            ->where('user_name', $validated['user_name'])
            ->first();

        if (!$gameKey) {
            return response()->json(['message' => 'Key not found'], 404);
        }

        $gameKey->user_name = null;
        $gameKey->assigned_at = null;

        $gameKey->save();

        return response()->json(['message' => 'Key unassigned']);
    }
}
