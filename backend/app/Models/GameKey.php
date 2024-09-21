<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GameKey extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
    ];

    public function game()
    {
        return $this->belongsTo(Game::class);
    }
}
