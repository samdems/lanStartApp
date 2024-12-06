<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class GameResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $this->resource->load('keys');
        $this->resource->load('archives');
        $this->resource->cover_image = Storage::url($this->resource->cover_image);
        $this->resource->box_image = Storage::url($this->resource->box_image);
        $this->resource->icon_image = Storage::url($this->resource->icon_image);
        $this->resource->logo_image = Storage::url($this->resource->logo_image);
        $this->resource->archives = $this->resource->archives->map(function ($archive) {
            $archive->file = Storage::url($archive->file);
            return $archive;
        });

        return parent::toArray($request);
    }
}
