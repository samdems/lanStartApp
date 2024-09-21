<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\View\View;
use App\Models\GameArchive;
use App\Models\GameKey;

class GamesController extends Controller
{
    public function index(Request $request): View
    {
        $games = Game::all();
        return view('games.index',compact('games'));
    }

    public function show(Request $request, Game $game): View
    {

        $game = $game->load('gameArchives', 'gameKeys');

        return view('games.show', compact('game'));
    }

    public function create(Request $request): View
    {
        return view('games.create');
    }

    public function store(Request $request)
    {

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'has_keys' => 'boolean',
            'cover_image' => 'required|file|mimes:jpeg,png',
            'box_image' => 'required|file|mimes:jpeg,png',
            'icon_image' => 'required|file|mimes:jpeg,png',
            'logo_image' => 'required|file|mimes:jpeg,png',
        ]);

        $boxImage = $request->file('box_image')->store('public/images');
        $coverImage = $request->file('cover_image')->store('public/images');
        $iconImage = $request->file('icon_image')->store('public/images');
        $logoImage = $request->file('logo_image')->store('public/images');

        $validated['cover_image'] = $coverImage;
        $validated['box_image'] = $boxImage;
        $validated['icon_image'] = $iconImage;
        $validated['logo_image'] = $logoImage;
        if ($request->has('has_keys')) {
            $validated['has_keys'] = true;
        } else {
            $validated['has_keys'] = false;
        }

        $game = Game::create($validated);

        return redirect()->route('games.index');
    }

    public function edit(Request $request, Game $game): View
    {
        return view('games.edit', compact('game'));
    }

    public function update(Request $request, Game $game)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'has_keys' => 'boolean',
        ]);

        if ($request->has('has_keys')) {
            $validated['has_keys'] = true;
        } else {
            $validated['has_keys'] = false;
        }
        $game->update($validated);

        return redirect()->route('games.show', $game);
    }

    public function delete(Request $request): View
    {
        $game->delete();

        return view('games.delete');
    }
    public function destroy(Request $request, Game $game)
    {
        $game->gameArchives()->delete();
        $game->delete();

        return redirect()->route('games.index');
    }

    public function unAssignkey(Request $request, Game $game, GameKey $gameKey)
    {
        $gameKey->update([
            'user_name' => null,
            'assigned_at' => null,
        ]);

    }
}
