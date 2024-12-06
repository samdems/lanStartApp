<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GameArchive extends Model
{
    protected $fillable = ['name', 'version', 'file','game_id'];

    function game()
    {
        return $this->hasOne(Game::class);
    }
}
