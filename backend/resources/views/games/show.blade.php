<x-app-layout>
    <x-slot name="header">
        {{ $game->title }}
    </x-slot>
    <img src="{{ Storage::url($game->cover_image) }}" alt="game" class="w-full h-64
      object-cover">
    <div class="flex justify-between p-4">
        <div class="p-4 w-full">
            <h1 class="text-3xl font-bold pb-4">
                {{ $game->title }}
            </h1>
            <div class="flex gap-4 py-4">
                <div>{{ $game->description }}</div>
            </div>
            <div class="flex flex-col gap-4 py-4 w-full">
                <div class="w-full">
                    <h2 class="text-2xl font-bold pb-4">Game Archives</h2>
                    <div class="flex flex-col justify-start gap-4 w-full">
                        @foreach ($game['gameArchives'] as $gameArchive)
                        <div
                                class="flex gap-2 w-full items-center alert">
                                <p class="text-lg font-bold">{{ $gameArchive['version'] }}</p>
                                <p class="text-lg font-bold">{{ $gameArchive['operating_system'] }}</p>
                                <div class="flex-grow">
                                </div>
                                <a href="{{ Storage::url($gameArchive['file']) }}" class="btn btn-primary">Download</a>
                                <a href="{{ route('gameArchives.edit', [$game, $gameArchive]) }}"
                                    class="btn btn-accent">edit</a>
                                <form action="{{ route('gameArchives.destroy', [$game, $gameArchive]) }}"
                                    method="POST">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-error">Delete</button>
                                </form>
                            </div>
                        @endforeach
                        @if (count($game['gameArchives']) === 0)
                            <p>No game archives found</p>
                        @endif
                        <a href="{{ route('gameArchives.create', $game) }}" class="btn btn-accent">New Archive</a>
                    </div>
                </div>
                <div class="w-full">
                    @if ($game->has_keys)
                    <h2 class="text-2xl font-bold pb-4">Game Keys</h2>
                    <div class="flex flex-col gap-4 w-full">
                            @foreach ($game->gameKeys as $gameKey)
                            <div class="alert flex items-center gap-4">
                                <div>
                                <p class="font-bold">{{ $gameKey->key }}</p>
                                <p class="text-sm">{{ $gameKey->assigned_at }}</p>
                                </div>

                                <div class="flex-grow"></div>
                                @if ($gameKey->user_name)
                                <form action="{{ route('gameKeys.unassign', [$game, $gameKey]) }}" method="POST">
                                    @csrf
                                    <input type="hidden" name="key_id" value="{{ $gameKey->id }}" />
                                    <input type="text" name='user_name' class="input" disabled value="{{ $gameKey->user_name }}" />
                                    <button type="submit" class="btn btn-error">Unassign</button>
                                </form>
                                @else
                                <form action="{{ route('gameKeys.assign', [$game, $gameKey]) }}" method="POST">
                                    @csrf
                                    <input type="hidden" name="key_id" value="{{ $gameKey->id }}" />
                                    <input type="text" name='user_name' class="input" placeholder="Enter User Name" />
                                    <button class="btn btn-primary">Assign</button>
                                </form>
                                @endif
                                <form action="{{ route('gameKeys.destroy', [$game, $gameKey]) }}" method="POST">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-error">Delete</button>
                                </form>
                            </div>
                        @endforeach
                    </div>
                    <form class="flex gap-4 w-full mt-4" action="{{ route('gameKeys.store', $game) }}" method="POST">
                        @csrf
                        <input type="hidden" name="game_id" value="{{ $game->id }}" />
                        <input type="text" name="key" class="input w-full " placeholder="Enter Key" />
                        <x-input-error for="key" :messages="$errors->first('key')" />
                        <button class="btn btn-accent ">add Key</button>
                    </form>
                    @endif
                </div>
            </div>
            <div class="flex gap-4 py-4 justify-end">
                <a href="{{ route('games.edit', $game) }}" class="btn btn-primary">Edit</a>
            </div>
        </div>
        <img src="{{ Storage::url($game->box_image) }}" alt="game" class="w-32 sm:w-48 md:w-64 lg:w-80 xl:w-96" />
    </div>
</x-app-layout>
