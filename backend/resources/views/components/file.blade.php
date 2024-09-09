@props(['disabled' => false])

<input type="file" {{ $disabled ? 'disabled' : '' }} {!! $attributes->merge(['class' => 'input input-bordered w-full p-2
    ']) !!}>
