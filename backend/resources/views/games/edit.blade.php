<x-app-layout>
    <x-slot name="header">
            {{ __('Dashboard') }}
    </x-slot>

    <form action="{{ route('games.update', $game->id)
        }}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PUT')
         @include('games.partials.form', ['game' => $game])
        <button type="submit" class="btn btn-primary">
            Update
        </button>
    </form>

</x-app-layout>
