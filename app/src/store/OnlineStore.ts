import { defineStore } from 'pinia'
import { ref} from 'vue'

export const useOnlineStore = defineStore('online', ()=>{

  const isOnline = ref(true)

  async function testOnline(){
    try {
      const response = await fetch('http://localhost/api/ping');
      isOnline.value = response.status === 200
    } catch (_error) {
      isOnline.value = false
    } 
  }

  setInterval(testOnline, 5000)
  testOnline()


  return {
    isOnline
  }
});


