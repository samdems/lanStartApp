<x-app-layout>
    <x-slot name="header">
            {{ __('Games') }}
    </x-slot>
    <x-table>
        <x-slot name="header">
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
        </x-slot>
        @foreach($games as $game)
            <tr>
                <td>{{ $game->title }}</td>
                <td>{{ $game->description }}</td>
                <td class="flex gap-2 justify-end">
                    <a href="{{ route('games.show', $game) }}" class="btn btn-primary">Show</a>
                    <a href="{{ route('games.edit', $game) }}" class="btn btn-secondary">Edit</a>
                    <form action="{{ route('games.destroy', $game) }}" method="POST">
                        @csrf
                        @method('DELETE')
                        <button type="submit" class="btn btn-error">Delete</button>
                    </form>
                </td>
            </tr>
        @endforeach
    </x-table>
    <a href="{{ route('games.create') }}" class="btn btn-primary">Create</a>
</x-app-layout>
