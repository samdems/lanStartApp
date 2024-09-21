import { defineStore } from 'pinia'
import { ref} from 'vue'
import { useUserStore } from './UserStore'
import { useAlartsStore } from './AlartsStore'

export const useKeyStore = defineStore('keys', ()=>{

  const userStore = useUserStore();
  const alertsStore = useAlartsStore();
  const keys = ref(JSON.parse(localStorage.getItem('keys') || '[]'));


  const fetchKeys = async () =>{
    const response = await fetch(`http://localhost/api/keys?username=${userStore.getName()}`);
    const data = await response.json();
    localStorage.setItem('keys',JSON.stringify(data));
    keys.value = data
  }
  const assignKey = async (gameId: number) => {
    try {
      const response = await fetch(`http://localhost/api/games/${gameId}/keys/assign-next`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_name:userStore.getName()})
      });
      if(response.status !== 200){
        throw new Error('No keys available')
      }
      const data = await response.json();
      return data;
    }catch(e){
      alertsStore.add({type:'error',title:"Key Error",message:e.message,timeout:5000})
      throw e;
    }finally{
      await fetchKeys();
    }
  }

  const unassignKey = async (gameId: number) => {
    try {
      const response = await fetch(`http://localhost/api/games/${gameId}/keys/unassign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({user_name:userStore.getName()})
      });
      const data = await response.json();
      return data;
    }catch(e){
      alertsStore.add({type:'error',title:"Key Error",message:e.message,timeout:5000})
      throw e;
    }finally{
      fetchKeys();
    }
  }

  const getKeys = () =>{
    return keys.value
  }
  const getKey = (GameId: number) => {
    return keys.value.find((key) => key.game_id === GameId)
  }

  document.addEventListener('DOMContentLoaded', () => {
    fetchKeys();
  })
   
  return {
    fetchKeys,
    getKeys,
    getKey,
    assignKey,
    unassignKey,
    keys
  }
});
