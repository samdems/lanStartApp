import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDownloaderStore = defineStore("downloader",() => {
  const progress = ref(0);
  const progressText = ref('');
  const isActive = ref(false);

  const downloadGame = async (gameinfo,archive) => {
    isActive.value = true;
    const url = gameinfo.game_archives[archive].file;
    const gameName = gameinfo.title;
    if(!url) return console.error('No url provided');
    if(!gameName) return console.error('No game name provided');

    try {
      await window.downloadFile(url,gameName, (data) => {  
        progress.value = data.percentage;
        progressText.value = data.message;
        console.log(data);
      }).catch(e => console.error(e));

      await window.downloadAssets([
        {url:gameinfo.cover_image, name:"cover_image"},
        {url:gameinfo.box_image, name:"box_image"},
        {url:gameinfo.icon_image, name:"icon_image"},
        {url:gameinfo.logo_image, name:"logo_image"},
      ],gameName,(data) => {
          debugger;
        progress.value = data.percentage;
        progressText.value = data.message;
        console.log(data);
      }
      ).catch(e => console.error(e));

      await window.addFiles([
        {text:JSON.stringify(gameinfo,null,2), name:"_gameinfo.json"},
        {text:gameinfo.game_archives[archive].script, name:"_script.js"},
      ],gameName).catch(e => console.error(e));

      await window.runScript('install',gameName,(data) => {
        progress.value = data.percentage;
        progressText.value = data.message;
        console.log(data);
      }
      ).catch(e => console.error(e));

    }catch(e){
      console.error(e);
    }finally{
      isActive.value = false;
    }
  }

  return {
    progress,
    progressText,
    isActive,
    downloadGame,
  }

});