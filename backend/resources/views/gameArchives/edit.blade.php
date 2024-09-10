<x-app-layout>
    <x-slot name="header">
    </x-slot>

    <form action="{{ route('gameArchives.update', [$game, $gameArchive]) }}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PUT')

        <input type="hidden" name="game_id" value="{{ $game->id }}">
        @include('gameArchives.partials.form', ['gameArchive' => $gameArchive])

        <button type="submit" class="btn btn-primary">Update</button>
    </form>


</x-app-layout>
