<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\Game;
use App\Models\GameArchive;

class GameArchiveFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = GameArchive::class;

    /**
     * Define the model's default state.
     */
    public function definition(): array
    {
        return [
            'version' => $this->faker->word(),
            'file' => $this->faker->word(),
            'game_id' => Game::factory(),
        ];
    }
}
