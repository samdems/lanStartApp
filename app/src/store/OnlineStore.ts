import { defineStore } from 'pinia'
import { ref,watch} from 'vue'
import { useAlartsStore } from './AlartsStore'

export const useOnlineStore = defineStore('online', ()=>{

  const isOnline = ref(true)
  const checking = ref(false)
  const host = ref('http://localhost')

  const alartStore = useAlartsStore()


  async function testOnline(){
    try {
      checking.value = true
      const response = await fetch(`${host.value}/api/ping`);
      isOnline.value = response.status === 200
      checking.value = false
      
    } catch (_error) {
      isOnline.value = false
    } 
  }

  watch(isOnline, (online) => {
    if(!online){
      alartStore.add({type:'error',title:"Offline",message:"connection lost",timeout:5000})
    }
  })

  setInterval(testOnline, 5000)
  testOnline()


  return {
    isOnline,
    host,
    checking,
    testOnline
  }
});


