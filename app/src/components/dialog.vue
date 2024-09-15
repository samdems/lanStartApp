<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  id: String,
  title: String,
});

function openModal() {
  const modal = document.getElementById(props.id);
  modal.showModal();
}
</script>
<template>
  <dialog :id="id" class="modal">
    <div class="modal-box">
      <slot></slot>
    </div>
  </dialog>
</template>
