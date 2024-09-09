<script setup lang="ts">
  import { ref,watch } from "vue";
const theme = ref("dark");
const themes = [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ]

watch(() => {
  window.document.getElementsByTagName('html')[0].dataset.theme = theme.value;
});
</script>

<template>
  <div class="w-full h-full flex items-center justify-center">
    <select
      v-model="theme"
      class="select select-bordered select-primary w-full"
    >
    <option v-for="theme in themes" :value="theme">{{theme}}</option>
    </select>
    
  </div>
</template>
