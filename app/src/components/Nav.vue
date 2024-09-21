<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faCog,
  faArrowsRotate,
  faHome,
  faGamepad,
  faExclamationTriangle,
  faSignal,
} from "@fortawesome/free-solid-svg-icons";
import { useNavStore } from "../store/NavStore";
import { useGamesStore } from "../store/GamesStore";
import { useOnlineStore } from "../store/OnlineStore";
import { useUserStore } from "../store/UserStore";
import { useKeyStore } from "../store/KeyStore";

const navStore = useNavStore();
const gamesStore = useGamesStore();
const onlineStore = useOnlineStore();
const userStore = useUserStore();
const keyStore = useKeyStore();

gamesStore.error = "Error loading games";
</script>
<template>
  <div
    t
    class="flex justify-between items-center bg-neutral shadow-lg absolute w-full pe-4 gap-4"
  >
    <h1 class="text-4xl font-bold text-center p-4 text-neutral-content">
      Lan-Launch
    </h1>
    <div class="flex-grow"></div>
    <button
      class="btn"
      :class="{
        'btn-primary': navStore.active === 'home',
        'btn-ghost': navStore.active !== 'home',
        'text-primary-content': navStore.active === 'home',
        'text-neutral-content': navStore.active !== 'home',
      }"
      @click="navStore.active = 'home'"
    >
      <font-awesome-icon :icon="faHome" class="text-2xl" />
    </button>

    <button
      class="btn"
      :class="{
        'btn-primary': navStore.active === 'game',
        'btn-ghost': navStore.active !== 'game',
        'text-primary-content': navStore.active === 'game',
        'text-neutral-content': navStore.active !== 'game',
      }"
      @click="navStore.active = 'game'"
    >
      <FontAwesomeIcon :icon="faGamepad" class="text-2xl" />
    </button>

    <button
      class="btn"
      :class="{
        'btn-primary': navStore.active === 'settings',
        'btn-ghost': navStore.active !== 'settings',
        'text-primary-content': navStore.active === 'settings',
        'text-neutral-content': navStore.active !== 'settings',
      }"
      @click="navStore.active = 'settings'"
    >
      <FontAwesomeIcon :icon="faCog" class="text-2xl" />
    </button>
    <div class="flex-grow"></div>

    <div v-if="!onlineStore.isOnline" class="text-warning p-4">
      <div
        class="tooltip tooltip-bottom tooltip-warning"
        data-tip="You are offline"
      >
        <font-awesome-icon :icon="faExclamationTriangle" class="text-2xl" />
      </div>
    </div>

    <div v-if="onlineStore.isOnline" class="p-4 text-success">
      <div class="tooltip tooltip-bottom" data-tip="You are online">
        <font-awesome-icon :icon="faSignal" class="text-2xl" />
      </div>
    </div>

    <button
      class="btn btn-ghost text-neutral-content"
      @click="gamesStore.fetchGames() && keyStore.fetchKeys()"
    >
     
      <font-awesome-icon :icon="faArrowsRotate" class="text-2xl" :class="{'animate-spin': gamesStore.isLoading}" />
    </button>
      <div class="badge badge-outline badge-lg badge-accent">
        {{userStore.getName()}}
      </div>
  </div>
</template>
