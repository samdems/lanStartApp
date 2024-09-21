<script setup lang="ts">
import { ref, onMounted } from "vue";
import ThemeChange from "./theme-change.vue";
import { useOnlineStore } from "../store/OnlineStore";
import { useAlartsStore } from "../store/AlartsStore";
import { useUserStore } from "../store/UserStore";
import { useDownloaderStore } from "../store/DownloaderStore";
import { useKeyStore } from "../store/KeyStore";

onMounted(() => {
  serverAddress.value = onlineStore.host;
});

const onlineStore = useOnlineStore();
const alartStore = useAlartsStore();
const userStore = useUserStore();
const downloaderStore = useDownloaderStore();
const keyStore = useKeyStore();

function testAlert() {
  alartStore.add({
    title: "Test",
    message: "This is a test alart",
    type: "success",
  });
}
const serverAddress = ref("");
const showAll = ref(true);

function updateServer() {
  onlineStore.host = serverAddress.value;
  onlineStore.testOnline();
}
</script>

<template>
  <div class="w-full h-full overflow-y-auto pb-20 m-4 flex flex-col gap-4">
    <div>
      <h3 class="text-lg font-bold pb-4">Theme</h3>
      <theme-change />
    </div>
    <div>
      <h3 class="text-lg font-bold pb-4">Server</h3>
      <div class="flex gap-4">
        <input
          type="text"
          class="input w-full"
          :class="{
            'input-error': !onlineStore.isOnline,
            'input-success': onlineStore.isOnline,
          }"
          placeholder="Server Address"
          v-model="serverAddress"
        />

        <button class="btn btn-primary" @click="updateServer">update</button>
      </div>
      <div class="alert alert-error mt-4" v-if="!onlineStore.isOnline">
        Error connecting to server
      </div>
    </div>
    <div>
      <h3 class="text-lg font-bold pb-4">User name</h3>
      <input
        type="text"
        class="input w-full input-primary"
        placeholder="Username"
        v-model="userStore.name"
      />
    </div>

    <div>
      <h3 class="text-lg font-bold pb-4">Test</h3>
      <button class="btn btn-primary" @click="testAlert">Test Alert</button>
    </div>
    <div>
      <h3 class="text-lg font-bold pb-4">keys</h3>
      <div v-for="key in keyStore.getKeys()" :key="key.id">
        <div class="alert flex justify-between">
          <div>{{ key.key }}</div>
          <div>{{ key.game.title }}</div>
          <div>{{ key.user_name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
