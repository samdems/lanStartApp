<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $fillable = [
        'title',
        'description',
        'cover_image',
        'box_image',
        'icon_image',
        'logo_image',
    ];

    public function keys()
    {
        return $this->hasMany(GameKey::class);
    }

    public function archives()
    {
        return $this->hasMany(GameArchive::class);
    }
}
