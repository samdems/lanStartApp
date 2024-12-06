<?php

namespace App\Filament\Resources\GameKeyResource\Pages;

use App\Filament\Resources\GameKeyResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditGameKey extends EditRecord
{
    protected static string $resource = GameKeyResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
