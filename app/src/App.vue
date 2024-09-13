<script setup lang="ts">
import { ref, computed } from "vue";
import ProgressBar from "./components/ProgressBar.vue";
import GameScreen from "./components/GameScreen.vue";
import NavSide from "./components/NavSide.vue";
import ThemeChange from "./components/theme-change.vue";
import { useGamesStore } from "./store/GamesStore";
import dayjs from "dayjs";

const gamesStore = useGamesStore();



</script>

<template>
  <div class="flex flex-col h-full w-full">
    <div
      class="flex justify-between items-center bg-neutral shadow-lg absolute w-full"
    >
      <h1 class="text-4xl font-bold text-center p-4 text-neutral-content">
        Game launcher
      </h1>
      <div class="flex-grow"></div>
      <div v-if="gamesStore.error" class="text-red-500 p-4">
        {{ gamesStore.error }}
      </div>
      <div>
        <ThemeChange class="w-32 p-4" />
      </div>
      <div class="flex items-center p-4 gap-4">
        <button class="btn btn-secondary" @click="gamesStore.fetchGames()" :disabled="gamesStore.isLoading">
          Reload Games
        </button>
      </div>
    </div>
    <div class="flex h-full w-full pt-20">
      <NavSide />
      <GameScreen />
    </div>
  </div>
  <ProgressBar />
</template>
