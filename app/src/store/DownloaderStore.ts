import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useGamesStore } from './GamesStore'
import { useAlartsStore } from './AlartsStore'
import { useUserStore } from './UserStore'
import { useKeyStore } from './KeyStore'

export const useDownloaderStore = defineStore("downloader",() => {
  const progress = ref(0);
  const progressText = ref('');
  const isActive = ref(false);
  const gamesStore = useGamesStore();
  const alertStore = useAlartsStore();
  const userStore = useUserStore();
  const keyStore = useKeyStore();


  const updateProgress = (percentage: string, message: string) => {
    progress.value = percentage;
    progressText.value = message;
  }
  const uninstall = async (gameinfo) => {
    if (keyStore.getKey(gameinfo.id ) && gameinfo.has_keys) {
      try {
        await keyStore.unassignKey(gameinfo.id);
      }catch(e){
        alertStore.add({type:'error',title:"Uninstall Error.",message:e.message,timeout:5000})
        console.error(e);
      }
    }

    isActive.value = true;
    const gameName = 'game-'+gameinfo.id;
    if(!gameName) return console.error('No game name provided');

    try {
      const path = gamesStore.downloadDir + '/' + gameName;
      await window.uninstall(path,(data: {percentage: string, message: string}) => {
        updateProgress(data.percentage,data.message);
        console.log(data);
      })
    }catch(e){
      alertStore.add({type:'error',title:"Uninstall Error..",message:e.message,timeout:5000})
      gamesStore.checkInstalledGames();
    }finally{
      isActive.value = false;
      gamesStore.fetchGames();
      alertStore.add({type:'success',title:"Uninstall Complete",message: gameinfo.title + " uninstalled successfully",timeout:5000})
    }
  }

  const downloadGame = async (gameinfo,archive:number) => {
    if (! keyStore.getKey(gameinfo.id ) && gameinfo.has_keys) {
      try {
        await keyStore.assignKey(gameinfo.id);
      }catch(e){
        console.error(e);
        return;
      }
    }

    isActive.value = true;
    const url = gameinfo.game_archives[archive].file;
    const gameName = 'game-'+gameinfo.id;
    if(!url) return console.error('No url provided');
    if(!gameName) return console.error('No game name provided');

    try {
      const path = gamesStore.downloadDir + '/' + gameName;
      await window.download(url,gameName,path, (data: {percentage: string, message: string}) => {  
        updateProgress(data.percentage,data.message);
        console.log(data);
      })

      await window.downloadAssets([
        {url:gameinfo.cover_image, name:"cover_image"},
        {url:gameinfo.box_image, name:"box_image"},
        {url:gameinfo.icon_image, name:"icon_image"},
        {url:gameinfo.logo_image, name:"logo_image"},
      ],gameName,gamesStore.downloadDir,(data: {percentage: string, message: string}) => {
        updateProgress(data.percentage,data.message);
        console.log(data);
      }
      )

      await window.addFiles([
        {text:JSON.stringify(gameinfo,null,2), name:"_gameinfo.json"},
        {text:gameinfo.game_archives[archive].script, name:"_script.mjs"},
      ],gameName,gamesStore.downloadDir).catch(e => console.error(e));

      const options = {
        username:userStore.name,
        key:keyStore.getKey(gameinfo.id,0)?.key,
      }
      await window.runScript('install',gameName,options,gamesStore.downloadDir,(data: {percentage: string, message: string}) => {
        updateProgress(data.percentage,data.message);
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
