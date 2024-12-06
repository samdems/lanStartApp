<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GameKey extends Model
{
    protected $fillable = ['game_id', 'key', 'status'];

    public function game()
    {
        return $this->belongsTo(Game::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
