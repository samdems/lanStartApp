import { defineStore } from 'pinia'
import { ref,computed,watch } from 'vue'
import dayjs from 'dayjs'
import fs from 'fs'

export const useGamesStore = defineStore('games', ()=>{
  
  const games = ref(JSON.parse(localStorage.getItem('games')) || []);
  const activeGameId = ref(null);
  const isLoading = ref(false);
  const error = ref('');
  const downloadedGames = ref(JSON.parse(localStorage.getItem('downloadedGames')) || []);

  const fetchGames = async () =>{
    let localLoading = true;
    setTimeout(() => { 
      if(localLoading)
        isLoading.value = true;
    },100);
    try {
      const response = await fetch('http://localhost/api/games');
      const data = await response.json();
      games.value = data.data;
      localLoading = false;
      localStorage.setItem('games', JSON.stringify(games.value));
    }catch(e){
      error.value = "Error loading games";
      return console.error(e);
    }finally{
      isLoading.value = false;
    }
    
  }

  const selectGame = (game) => {
    activeGameId.value = game.id;
  }

  const activeGame = computed(() => {
    return games.value.find((game) => game.id === activeGameId.value);
  });

  const isActivedGameDownloaded = computed(() => {
    return downloadedGames.value.includes(activeGameId.value);
  })


  document.addEventListener("DOMContentLoaded", () => {
    fetchGames();
  });


    return {
      games,
      error,
      selectGame,
      activeGame,
      fetchGames,
      isLoading,
      isActivedGameDownloaded,
      downloadedGames
    }
})

