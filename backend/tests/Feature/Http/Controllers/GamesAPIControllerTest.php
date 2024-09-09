<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\GamesAPI;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\GamesAPIController
 */
final class GamesAPIControllerTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function index_behaves_as_expected(): void
    {
        $gamesAPIs = GamesAPI::factory()->count(3)->create();

        $response = $this->get(route('games-a-p-is.index'));
    }
}
