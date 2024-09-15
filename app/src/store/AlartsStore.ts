import { defineStore } from 'pinia'
import { ref} from 'vue'

export const useAlartsStore = defineStore('alart', ()=>{

  const alarts = ref({
  });

  const add = (alart) => {
    const id = Math.random().toString(36).substring(7);
    alart.title = alart.title || alart.type
    alarts.value[id] = alart;
    setTimeout(() => {
      delete alarts.value[id];
    }, alart.timeout || 5000);
  }

  return {
    alarts,
    add
  }
});
