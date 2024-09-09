<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;
use Illuminate\View\View;
use App\Models\GameArchive;

class GamesController extends Controller
{
    public function index(Request $request): View
    {
        $games = Game::all();
        return view('games.index',compact('games'));
    }

    public function show(Request $request, Game $game): View
    {

        $game->load('gameArchives');

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
            'archive' => 'required|file|mimes:zip',
            'cover_image' => 'required|file|mimes:jpeg,png',
            'box_image' => 'required|file|mimes:jpeg,png',
            'icon_image' => 'required|file|mimes:jpeg,png',
            'logo_image' => 'required|file|mimes:jpeg,png',
        ]);

        $file = $request->file('archive')->store('public/archives');
        $boxImage = $request->file('box_image')->store('public/images');
        $coverImage = $request->file('cover_image')->store('public/images');
        $iconImage = $request->file('icon_image')->store('public/images');
        $logoImage = $request->file('logo_image')->store('public/images');

        $validated['cover_image'] = $coverImage;
        $validated['box_image'] = $boxImage;
        $validated['icon_image'] = $iconImage;
        $validated['logo_image'] = $logoImage;

        $game = Game::create($validated);

        $gameArchive = GameArchive::create([
            'version' => '1.0',
            'file' => $file,
            'game_id' => $game->id,
        ]);

        return redirect()->route('games.index');
    }

    public function update(Request $request, Game $game): View
    {
        $game->update([]);

        return view('games.update');
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
}
