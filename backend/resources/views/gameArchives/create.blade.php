<x-app-layout>
    <x-slot name="header">
    </x-slot>
        {{$errors}}
        {{$game->id}}
    <form action="{{ route('gameArchives.store', [$game]) }}" method="POST" enctype="multipart/form-data">
        @csrf
        @include('gameArchives.partials.form', ['errors' => $errors])
        <input type="hidden" name="game_id" value="{{ $game->id }}">
        <button type="submit" class="btn btn-primary">Update</button>
    </form>


</x-app-layout>
