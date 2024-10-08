<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faDownload, faPlay, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useDownloaderStore } from "../store/DownloaderStore";
import { useGamesStore } from "../store/GamesStore";
import { useUserStore } from "../store/UserStore";
import { useKeyStore } from "../store/KeyStore";
import { useOnlineStore } from "../store/OnlineStore";

import PlayDialog from "./PlayDialog.vue";
import NavSide from "./NavSide.vue";
import { ref } from "vue";
import dayjs from "dayjs";
const gamesStore = useGamesStore();
const downloaderStore = useDownloaderStore();
const userStore = useUserStore();
const keyStore = useKeyStore();
const onlineStore = useOnlineStore();

const files = ref<string[]>([]);

async function download() {
  await downloaderStore.downloadGame(gamesStore.activeGame, 0);
}

function play() {
  window.runScript("start", gamesStore.activeGame.file);
}

function uninstall() {
  downloaderStore.uninstall(gamesStore.activeGame);
}
function formatDate(date: string) {
  return dayjs(date).format("DD/MM/YYYY - HH:mm");
}
</script>

<template>
  <NavSide />
  <div class="w-full h-full overflow-y-auto pb-24" v-if="gamesStore.activeGame">
    <img
      :src="gamesStore.activeGame?.cover_image"
      alt="game"
      class="w-full h-2/5 object-cover"
    />
    <div class="flex justify-between p-4">
      <div class="p-4">
        <div class="flex justify-between items-center">
          <h1 class="text-3xl font-bold">
            {{ gamesStore.activeGame.title }} 
          </h1>
        </div>

        <div class="flex justify-start gap-4 mt-4 alert">
          <select
            class="select select-bordered"
            v-if="!gamesStore.activeGame.installed"
          >
            <option
              v-for="arcive in gamesStore.activeGame.game_archives"
              class="text-black"
              :value="arcive.id"
            >
              Version: {{ arcive.version }}
            </option>
          </select>
          <button
            @click="download"
            class="btn btn-primary"
            :disabled="gamesStore.activeGame.installed || !onlineStore.isOnline"
          >
            <font-awesome-icon :icon="faDownload" />
          </button>

          <button
            @click="uninstall"
            class="btn btn-error"
            :disabled="!gamesStore.activeGame.installed"
          >
            <font-awesome-icon :icon="faTrash" />
          </button>
          <div class="flex-grow"></div>
          <PlayDialog />
        </div>
        <div class="flex gap-4 pt-4 flex-col">
          <div>{{ gamesStore.activeGame.description }}</div>
          <span class="text-sm text-neutral-content" :class="{'text-error': gamesStore.activeGame.has_keys, 'text-success': !gamesStore.activeGame.has_keys }">
            {{gamesStore.activeGame.has_keys ? "This game requires a key" : "This game does not require a key"}} 
          </span>
        </div>
      </div>
      <img
        :src="gamesStore.activeGame?.box_image"
        alt="game"
        class="h-32 sm:h-48 md:h-64 lg:h-80 xl:h-96"
      />
    </div>
  </div>
</template>
