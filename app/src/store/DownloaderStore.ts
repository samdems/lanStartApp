import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useGamesStore } from './GamesStore'
import { useAlartsStore } from './AlartsStore'
import { useUserStore } from './UserStore'

export const useDownloaderStore = defineStore("downloader",() => {
  const progress = ref(0);
  const progressText = ref('');
  const isActive = ref(false);
  const gamesStore = useGamesStore();
  const alertStore = useAlartsStore();
  const userStore = useUserStore();

  const uninstall = async (gameinfo) => {
    isActive.value = true;
    const gameName = 'game-'+gameinfo.id;
    if(!gameName) return console.error('No game name provided');

    try {
      await window.uninstall(gameName,(data: {percentage: string, message: string}) => {
        progress.value = data.percentage;
        progressText.value = data.message;
        console.log(data);
      })
    }catch(e){
      alertStore.add({type:'error',title:"Uninstall Error",message:e.message,timeout:5000})
    }finally{
      isActive.value = false;
      gamesStore.fetchGames();
      alertStore.add({type:'success',title:"Uninstall Complete",message: gameinfo.title + " uninstalled successfully",timeout:5000})
    }
  }

  const downloadGame = async (gameinfo,archive:number) => {
    isActive.value = true;
    const url = gameinfo.game_archives[archive].file;
    const gameName = 'game-'+gameinfo.id;
    if(!url) return console.error('No url provided');
    if(!gameName) return console.error('No game name provided');

    try {
      await window.download(url,gameName, (data: {percentage: string, message: string}) => {  
        progress.value = data.percentage;
        progressText.value = data.message;
        console.log(data);
      })

      await window.downloadAssets([
        {url:gameinfo.cover_image, name:"cover_image"},
        {url:gameinfo.box_image, name:"box_image"},
        {url:gameinfo.icon_image, name:"icon_image"},
        {url:gameinfo.logo_image, name:"logo_image"},
      ],gameName,(data: {percentage: string, message: string}) => {
        progress.value = data.percentage;
        progressText.value = data.message;
        console.log(data);
      }
      )

      await window.addFiles([
        {text:JSON.stringify(gameinfo,null,2), name:"_gameinfo.json"},
        {text:gameinfo.game_archives[archive].script, name:"_script.js"},
      ],gameName).catch(e => console.error(e));

      await window.runScript('install',gameName,{username:userStore.name},(data: {percentage: string, message: string}) => {
        progress.value = data.percentage;
        progressText.value = data.message;
        console.log(data);
      }
      )
    }catch(e){
      alertStore.add({type:'error',title:"Install Error",message:e.message,timeout:5000})
      throw e;
    }finally{
      isActive.value = false;
      gamesStore.fetchGames();
      alertStore.add({type:'success',title:"Install Complete",message: gameinfo.title + " install successfully",timeout:5000})
    }
  }

  return {
    progress,
    progressText,
    isActive,
    uninstall,
    downloadGame,
  }

});
