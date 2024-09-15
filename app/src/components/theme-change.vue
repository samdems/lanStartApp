<script setup lang="ts">
  import { ref,watch,onMounted
  } from "vue";
const theme = ref();
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
onMounted(() => {
  theme.value = window.localStorage.getItem('theme')
});
watch(() => {
  if (theme.value) {
    window.document.getElementsByTagName('html')[0].dataset.theme = theme.value;
    window.localStorage.setItem('theme', theme.value);
  }
});
</script>

<template>
    <select
      v-model="theme"
      class="select select-bordered select-primary w-full"
    >
    <option v-for="theme in themes" :value="theme">{{theme}}</option>
    </select>
</template>
