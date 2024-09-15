<script setup lang="ts">
import { ref, onMounted } from "vue";
import ThemeChange from "./theme-change.vue";
import { useOnlineStore } from "../store/OnlineStore";
import { useAlartsStore } from "../store/AlartsStore";
import { useUserStore } from "../store/UserStore";

onMounted(() => {
  serverAddress.value = onlineStore.host;
});

const onlineStore = useOnlineStore();
const alartStore = useAlartsStore();
const userStore = useUserStore();

function testAlert() {
  alartStore.add({
    title: "Test",
    message: "This is a test alart",
    type: "success",
  });
}
const serverAddress = ref("");

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
  </div>
</template>
