<script setup lang="ts">
import { ref, watch } from "vue";
import { useGamesStore } from "../store/GamesStore";
import { useAlartsStore } from "../store/AlartsStore";
import { useUserStore } from "../store/UserStore";
import { useKeyStore } from "../store/KeyStore";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const id = "play-dialog";
const options = ref([]);

const gamesStore = useGamesStore();
const alertsStore = useAlartsStore();
const userStore = useUserStore();
const keyStore = useKeyStore();

function openModal() {
  const modal = document.getElementById(id);
  modal.showModal();
}

function calculateOptions() {
  options.value = [];
  const script = gamesStore.activeGame.game_archives[0].script;

  const regex = /export\s+(?:const|let|var|function|class)\s+(\w+)/g;

  const matches = [];
  let match;

  while ((match = regex.exec(script)) !== null) {
    if (match[1] === "install") {
      continue;
    }
    if (match[1] === "uninstall") {
      continue;
    }
    matches.push(match[1]); // push only the captured name
  }
  options.value = matches.map((name) => ({
    id: name,
    title: name.charAt(0).toUpperCase() + name.slice(1).replace(/_/g, " "),
    action: () => {
      try {
        run(name, gamesStore.activeGame.file);
      } catch (error) {
        alertsStore.add({
          title: "Error",
          message: error.error || error.message || error,
          type: "error",
        });
        throw error;
      }
    },
  }));
}
async function run (name, file) {
  try {
    const gameoptions = {username:userStore.name,key:keyStore.getKey(gamesStore.activeGame.id)?.key};
    debugger;
    await window.runScript(name, file,gameoptions);
  } catch (error) {
    alertsStore.add({
      title: "Error",
      message: error.error || error.message || error,
      type: "error",
    }); 
    throw error;
  }
}
function play() {
  calculateOptions();
  if (options.value.length === 1) {
    run(options.value[0].id, gamesStore.activeGame.file);
  } else {
    openModal();
  }
}
</script>

<template>
  <button
    class="btn btn-accent"
    :disabled="!gamesStore.activeGame.installed"
    @click="play"
  >
    Play
    <font-awesome-icon :icon="faPlay" />
  </button>
  <dialog :id="id" class="modal">
    <div class="modal-box">
      <div
        v-for="(option, index) in options"
        :key="option.id"
        class="flex justify-between items-center p-4"
      >
        <h3 class="text-lg font-bold">{{ option.title }}</h3>
        <button
          class="btn"
          :class="{
            'btn-primary': index === 0,
            'btn-secondary': index !== 0,
          }"
          @click="option.action"
        >
          Play
        </button>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>
