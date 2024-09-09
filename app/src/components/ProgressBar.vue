<script setup lang="ts">
  import { useDownloaderStore } from "../store/DownloaderStore";
  const downloaderStore = useDownloaderStore();

</script>
<template>
  <div>
    <div class="absolute bottom-0 w-full p-4 bg-base-300 shadow-lg">
      <div class="flex gap-4 h-12" v-if="downloaderStore.isActive">
        <p class="text-lg p-2">
          {{ downloaderStore.progressText }}
        </p>
        <progress
          class="progress progress-primary h-10"
          :value="downloaderStore.progress"
          max="100"
        ></progress>
        <p class="text-lg p-2 w-32 text-center">
          {{ downloaderStore.progress }}%
        </p>
      </div>
      <div v-else class="flex justify-center items-center h-12">
        <p class="text-lg">No active downloads</p>
      </div>
    </div>
  </div>
</template>
