<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Game;
use App\Models\Games;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\GamesController
 */
final class GamesControllerTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function index_displays_view(): void
    {
        $games = Games::factory()->count(3)->create();

        $response = $this->get(route('games.index'));

        $response->assertOk();
        $response->assertViewIs('games.index');
    }


    #[Test]
    public function show_displays_view(): void
    {
        $game = Games::factory()->create();
        $game = Game::factory()->create();

        $response = $this->get(route('games.show', $game));

        $response->assertOk();
        $response->assertViewIs('games.show');
    }


    #[Test]
    public function create_displays_view(): void
    {
        $response = $this->get(route('games.create'));

        $response->assertOk();
        $response->assertViewIs('games.create');
    }


    #[Test]
    public function update_displays_view(): void
    {
        $game = Games::factory()->create();

        $response = $this->put(route('games.update', $game));

        $game->refresh();

        $response->assertOk();
        $response->assertViewIs('games.update');
    }


    #[Test]
    public function delete_deletes_and_displays_view(): void
    {
        $game = Game::factory()->create();

        $response = $this->get(route('games.delete'));

        $response->assertOk();
        $response->assertViewIs('games.delete');

        $this->assertModelMissing($game);
    }
}
