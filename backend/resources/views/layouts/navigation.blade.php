<nav class="navbar bg-neutral p-4 flex justify-between">
    <a class="btn btn-ghost text-xl">daisyUI</a>
    <div class="flex space-x-4">
        <x-nav-link href="dashboard" activeFor="dashboard">Dashboard</x-nav-link>
        <x-nav-link href="games.index" activeFor="games.*">Games</x-nav-link>
    </div>
    <x-nav-link href="profile.edit" activeFor="profile.*">Profile</x-nav-link>
</nav>
