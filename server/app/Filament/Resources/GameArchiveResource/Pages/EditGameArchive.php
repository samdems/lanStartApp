<?php

namespace App\Filament\Resources\GameArchiveResource\Pages;

use App\Filament\Resources\GameArchiveResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditGameArchive extends EditRecord
{
    protected static string $resource = GameArchiveResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
