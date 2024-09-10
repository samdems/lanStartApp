<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GameArchive;
use Illuminate\View\View;
use Illuminate\Http\RedirectResponse;
use App\Models\Game;

class GameArchiveController extends Controller
{
    public function index()
    {
        return GameArchive::all();
    }

    public function create(Request $request,Game $game): View
    {
        return view('gameArchives.create', compact('game'));
    }
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'version' => 'required|string|max:255',
            'operating_system' => 'required|string',
            'archive' => 'required|file|mimes:zip',
            'game_id' => 'required|exists:games,id',
            'script' => 'required|string',
        ]);

        $file = $request->file('archive')->store('public/archives');
        $validated['file'] = $file;
        GameArchive::create($validated);

        return redirect()->route('games.show', $validated['game_id']);
    }

    public function edit(Request $request,Game $game, GameArchive $gameArchive): View
    {
        return view('gameArchives.edit', compact('gameArchive', 'game'));
    }

    public function update(Request $request,Game $game, GameArchive $gameArchive)
    {
        $validated = $request->validate([
            'version' => 'required|string|max:255',
            'operating_system' => 'required|string',
            'archive' => 'file|mimes:zip',
            'game_id' => 'required|exists:games,id',
            'script' => 'required|string',
        ]);

        if ($request->hasFile('archive')) {
            $file = $request->file('archive')->store('public/archives');
            $validated['archive'] = $file;
        }

        $gameArchive->update($validated);

        return redirect()->route('games.show', $gameArchive->game_id);
    }

    public function destroy(Game $game, GameArchive $gameArchive): RedirectResponse
    {
        $gameArchive->delete();
        return redirect()->route('games.show', $gameArchive->game_id);
    }
}
