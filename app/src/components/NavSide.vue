<script setup lang="ts">
import ThemeChange from "./theme-change.vue";
import { useGamesStore } from "../store/GamesStore";
import { useNavStore } from "../store/NavStore";

const gamesStore = useGamesStore();
const navStore = useNavStore();

function selectScreen(game) {
  navStore.active = 'game'
  gamesStore.selectGame(game)
}


</script>

<template>
  <div class="w-1/3 h-full bg-neutral shadow-lg flex flex-col pb-20 overflow-y-auto">
    <div>
      <div
        class="flex gap-4 p-4"
        v-for="game in gamesStore.games"
        :class="{
          'bg-primary': gamesStore.activeGame === game && navStore.active === 'game',
          'bg-neutral': gamesStore.activeGame !== game || navStore.active !== 'game',
        }"
        @click="selectScreen(game)"
      >
        <img
          :src="game.icon_image"
          alt="game"
          class="h-8 sm:h-16 sm:h-16 md:h-20 md:h-20 lg:h-24"
        />
        <div class="flex flex-col justify-center items-center">
          <div
            class="md:text-1xl lg:text-2xl font-bold"
            :class="{
              'text-primary-content': game.active && navStore.active === 'game',
              'text-neutral-content': !game.active || navStore.active !== 'game',
            }"
          >
          <p>{{ game.title }}</p>
          <span class="badge badge-outline" v-if="game.installed">
            installed
          </span>
          </div>
        </div>
      </div>
      <div class="flex gap-4 p-4 flex-justify-center items-center">
        <div
          class="skeleton h-8 sm:h-16 sm:h-16 md:h-20 md:h-20 lg:h-24 w-8 sm:w-16 sm:w-16 md:w-20 md:w-20 lg:w-24"
          v-if="gamesStore.isLoading && gamesStore.games.length === 0"
        ></div>
        <div
          class="skeleton h-8 w-1/2"
          v-if="gamesStore.isLoading && gamesStore.games.length === 0"
        ></div>
      </div>
      <div class="flex justify-center items-center h-12">
        <span
          v-show="gamesStore.isLoading"
          class="loading loading-dots loading-lg"
        ></span>
      </div>
    </div>
  </div>
</template>
