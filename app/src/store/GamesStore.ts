import { defineStore } from 'pinia'
import { ref,computed,watch } from 'vue'
import dayjs from 'dayjs'
import fs from 'fs'
import { useOnlineStore } from './OnlineStore'
import { useUserStore } from './UserStore'
import { useAlartsStore } from './AlartsStore'

export const useGamesStore = defineStore('games', ()=>{
  
  const games = ref({});
  const activeGameId = ref(null);
  const isLoading = ref(false);
  const error = ref('');
  const downloadDir = ref('downloads');
  const downloadedGames = ref([]);
  const onlineStore = useOnlineStore();
  const userStore = useUserStore();
  const alertStore = useAlartsStore();

  const activateKey = async () => {
    const response = await fetch(`${onlineStore.host}/api/assignKey`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({key: 'value',user_name:useUserStore().name.value })
    });
    const data = await response.json();
    return;
  }

  const fetchGames = async () =>{
    if(!onlineStore.isOnline){
      error.value = "No internet connection";
      checkInstalledGames();
      return;
    } 
     isLoading.value = true;
     const start = dayjs();
    try {
      const response = await fetch(`${onlineStore.host}/api/games`);
      const data = await response.json();
      games.value = {};
      data.data.forEach((game) => {
        game.host = onlineStore.host;
        game.installed = false;
        games.value[game.id] = game;
      });
    }catch(e){
      error.value = "Error loading games";
      return console.error(e);
    }finally{
      checkInstalledGames();
      if(dayjs().diff(start,'second') < 1){
        console.log('waiting 2 seconds');
        await new Promise((resolve) => setTimeout(resolve,1000));
      }
      isLoading.value = false;
    }
    
  }
  const fiximage = async (game,filename:string,type:string) => {
    const coverImageExtionsion = game[type].split('.').pop();
    game[type] = await window.readImage(`${downloadDir.value}/${filename}/_assets/${type}.${coverImageExtionsion}`);
    game[type] = `data:image/${coverImageExtionsion};base64,` + game[type]
    return game;
  }
  const checkInstalledGames = async () => {
    debugger;
    if(! onlineStore.isOnline){
      games.value = {};
    }

    const gamesdir = await window.readDir(downloadDir.value);
      for (const game of gamesdir) {
        try {
          const file = await window.readFile(`${downloadDir.value}/${game}/_gameinfo.json`);
          let gameinfo = JSON.parse(file); 
          gameinfo.installed = true;
          gameinfo.file = game;
          gameinfo = await fiximage(gameinfo,game,'cover_image');
          gameinfo = await fiximage(gameinfo,game,'box_image');
          gameinfo = await fiximage(gameinfo,game,'icon_image');
          gameinfo = await fiximage(gameinfo,game,'logo_image');
          games.value[gameinfo.id] = gameinfo;
        }catch(e){
          alertStore.add({type:'error',title:"Error loading game",message:e.message,timeout:5000})
          delete games.value[game];
          console.error(e);
        }
      }
  }
  window.checkInstalledGames = checkInstalledGames;

  const selectGame = (game) => {
    activeGameId.value = game.id;
  }

  const activeGame = computed(() => {
    return games.value[activeGameId.value];
  });
  watch(downloadDir,() => {
    checkInstalledGames();
  });

  document.addEventListener("DOMContentLoaded", () => {
    if(onlineStore.isOnline){
      fetchGames();
    }else{
      checkInstalledGames();
    }
  });


    return {
      games,
      error,
      selectGame,
      activeGame,
      fetchGames,
      isLoading,
      downloadedGames,
      activateKey,
      downloadDir,
    }
})

