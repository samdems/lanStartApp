import { defineStore } from 'pinia'
import { ref,watch} from 'vue'
import { useAlartsStore } from './AlartsStore'
import { useGamesStore } from './GamesStore'

export const useOnlineStore = defineStore('online', ()=>{

  const isOnline = ref(true)
  const checking = ref(false)
  const host = ref(localStorage.getItem('host') || 'http://localhost')

  const alartStore = useAlartsStore()
  const gamesStore = useGamesStore()


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

  watch(host, (newHost) => {
    localStorage.setItem('host',newHost)
  })

  watch(isOnline, (online) => {
    if(!online){
      alartStore.add({type:'error',title:"Offline",message:"connection lost",timeout:5000})
    }else{
      alartStore.add({type:'success',title:"Online",message:"connection restored",timeout:5000})
      gamesStore.fetchGames();
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


