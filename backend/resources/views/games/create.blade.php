<x-app-layout>
    <x-slot name="header">
            {{ __('Dashboard') }}
    </x-slot>

    <form action="{{ route('games.store') }}" method="POST" enctype="multipart/form-data">
        @csrf
         @include('games.partials.form')

        <button type="submit" class="btn btn-primary">Create</button>
    </form>

</x-app-layout>
