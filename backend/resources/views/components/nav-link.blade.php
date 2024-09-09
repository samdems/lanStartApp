@props([
    'name',
    'href',
    'activeFor'
])

<a href="{{ route($href) }}" class="btn {{ request()->routeIs($activeFor) ? 'btn-primary' : 'btn-ghost' }}">
    {{$slot}}
</a>
