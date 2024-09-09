<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\GameArchiveResource;

class GameResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        $host = config('app.url');
       return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'cover_image' => $host . Storage::url($this->cover_image),
            'box_image' =>  $host .  Storage::url($this->box_image),
            'icon_image' => $host . Storage::url($this->icon_image),
            'logo_image' => $host . Storage::url($this->logo_image),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'game_archives' => GameArchiveResource::collection($this->gameArchives),
        ];
    }
}
