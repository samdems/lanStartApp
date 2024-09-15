<script setup lang="ts">
import { useAlartsStore } from "../store/AlartsStore";

const alartStore = useAlartsStore(); 

</script>

<template>
  <div class="toast" >
    <div class="alert " v-for="alart in alartStore.alarts" :key="alart.id" :class="{
        'alert-error': alart.type === 'error',
        'alert-success': alart.type === 'success',
        'alert-warning': alart.type === 'warning',
        }">
      <span>
        <h2 class="text-lg font-bold">{{ alart.title }}</h2>
        {{alart.message}}
      </span>
    </div>
  </div>
</template>
