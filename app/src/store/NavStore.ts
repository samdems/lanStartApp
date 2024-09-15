import { defineStore } from 'pinia'
import { ref} from 'vue'

export const useNavStore = defineStore('nav', ()=>{

  const active = ref('home');

  return {
    active
  }
});
