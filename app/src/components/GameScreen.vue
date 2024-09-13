<script setup lang="ts">
import { useDownloaderStore } from "../store/DownloaderStore";
import { useGamesStore } from "../store/GamesStore";
const gamesStore = useGamesStore();
const downloaderStore = useDownloaderStore();

async function download() {
  downloaderStore.downloadGame(gamesStore.activeGame,0)
}
function play() {
}
</script>

<template>
  <div class="w-full h-full overflow-y-auto pb-20" v-if="gamesStore.activeGame">
    <img
      :src="gamesStore.activeGame?.cover_image"
      alt="game"
      class="w-full h-2/5
      object-cover">
    <div class="flex justify-between p-4">
      <div class="p-4">
        <h1 class="text-3xl font-bold pb-4">
          {{ gamesStore.activeGame.title }}
        </h1>
        <div class="flex justify-start gap-4">
          <button @click="download" class="btn btn-primary" :disabled="gamesStore.isActivedGameDownloaded"
            >Install</button>
          <button @click="play" class="btn btn-accent" :disabled="!gamesStore.isActivedGameDownloaded"
            >Play</button>
        </div>
        <div class="flex gap-4 pt-4">
          <div>{{ gamesStore.activeGame.description }}</div>
        </div>
      </div>
      <pre>{{ gamesStore.activeGame }}</pre>
      <img
        :src="gamesStore.activeGame?.box_image"
        alt="game"
        class="h-32 sm:h-48 md:h-64 lg:h-80 xl:h-96"
      />
    </div>
  </div>
  <div v-else class="w-full h-full flex items-center justify-center">
    <p class="text-2xl">Select a game to play</p>
  </div>
</template>
