<x-app-layout>
    <x-slot name="header">
            {{ $game->title }}
    </x-slot>
    <h1 class="text-2xl font-semibold">
        {{ $game->title }}</h1>
    <p>
        {{ $game->description }}
    </p>

    @foreach($game->toArray()['game_archives'] as $archive)
        <a href="{{ Storage::url($archive['file']) }}" class="btn btn-primary">{{$archive['version']}}</a>
    @endforeach
</x-app-layout>
