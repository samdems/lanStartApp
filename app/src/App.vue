<script setup lang="ts">
import { ref, computed } from "vue";

import SettingsScreen from "./components/SettingsScreen.vue";
import ProgressBar from "./components/ProgressBar.vue";
import GameScreen from "./components/GameScreen.vue";
import Dialog from "./components/dialog.vue";
import alarts from "./components/Alarts.vue";
import NavSide from "./components/NavSide.vue";
import { useNavStore } from "./store/NavStore";
import Nav from "./components/Nav.vue";

if(localStorage.getItem('theme')) {
  document.getElementsByTagName('html')[0].dataset.theme = localStorage.getItem('theme');
}

const navStore = useNavStore();

</script>

<template>
  <div class="flex flex-col h-full w-full overflow-hidden">
    <Nav />
    <div class="pb-2"></div>
    <div class="flex h-full w-full pt-16
      sm:pt-22">
      <GameScreen v-if="navStore.active === 'game'" />
      <SettingsScreen v-if="navStore.active === 'settings'" />
      <div v-if="navStore.active === 'home'" class="w-full h-full">
        <div class="flex flex-col items-center justify-center h-full w-full">
          <h1 class="text-4xl font-bold text-center">
            Welcome to the <span class="text-accent">Lan-Launch </span>
          </h1>
          <p class="text-center">
            This is a simple game launcher that allows you to install and play
            games.
          </p>
          <Dialog id="play-dialog" title="Play">
            <h3 class="text-lg font-bold">Hello!</h3>
              <p class="py-4">Press ESC key or click the button below to close</p>
              <div class="modal-action">
              <form method="dialog">
                <button class="btn">Close</button>
              </form>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  </div>
  <ProgressBar />
  <alarts />
</template>
