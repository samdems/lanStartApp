<x-app-layout>
    <x-slot name="header">
            {{ $game->title }}
    </x-slot>
    <img
      src="{{Storage::url($game->cover_image)}}"
      alt="game"
      class="w-full h-64
      object-cover">
    <div class="flex justify-between p-4">
      <div class="p-4 w-full">
        <h1 class="text-3xl font-bold pb-4">
          {{ $game->title }}
        </h1>
        <div class="flex gap-4 py-4">
          <div>{{ $game->description }}</div>
        </div>
        <h2 class="text-2xl font-bold pb-4">Game Archives</h2>
            <div class="flex flex-col justify-start gap-4 w-full">
                    @foreach($game['gameArchives'] as $gameArchive)
                        <div class="flex gap-2 w-full bg-base-100  text-neutral-content p-4 rounded-box items-center">
                            <p class="text-lg font-bold">{{$gameArchive['version']}}</p>
                            <p class="text-lg font-bold">{{$gameArchive['operating_system']}}</p>
                            <div class="flex-grow">
                            </div>
                            <a href="{{Storage::url($gameArchive['file'])}}" class="btn btn-primary">Download</a>
                            <a href="{{ route('gameArchives.edit', [$game, $gameArchive]) }}" class="btn btn-accent">edit</a>
                            <form action="{{ route('gameArchives.destroy', [$game, $gameArchive]) }}" method="POST">
                                @csrf
                                @method('DELETE')
                                <button type="submit" class="btn btn-error">Delete</button>
                            </form>
                        </div>
                    @endforeach
                @if(count($game['gameArchives']) === 0)
                    <p>No game archives found</p>
                @endif
                <a href="{{ route('gameArchives.create', $game) }}" class="btn btn-accent">New Archive</a>
        </div>
        <div class="flex gap-4 py-4 justify-end">
            <a href="{{ route('games.edit', $game) }}" class="btn btn-primary">Edit</a>
        </div>
      </div>
      <img
        src="{{Storage::url($game->box_image)}}"
        alt="game"
        class="h-32 sm:h-48 md:h-64 lg:h-80 xl:h-96"
      />
    </div>
</x-app-layout>
