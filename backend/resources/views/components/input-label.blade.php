@props(['value'])

<label {{ $attributes->merge(['class' => 'text-sm text-neutral-content']) }}>
    {{ $value ?? $slot }}
</label>
