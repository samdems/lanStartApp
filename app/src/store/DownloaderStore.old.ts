import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useDownloaderStore = defineStore("downloader",() => {
const isActive = ref(false);
const progress = ref(0);
const info = ref("");
const progressText = ref("");
const url = ref('');
const file = ref('');

function setFile(value) {
  url.value = value;
}

function download() {
  file.value = url.value.split('/').pop();

  return new Promise((resolve, reject) => {
    if (typeof window.downloadFile !== 'function') {
      reject(new Error('downloadFile function is not defined'));
      return;
    }
    window.downloadFile(url.value, {
      onProgress: (e) => {
        progress.value = e; 
      },
      onComplete: () => {
        info.value = "Download completed";
        resolve();
      },
      onError: (error) => {
        info.value = "Download failed";
        reject(error);
      }
    });
  });
}

function unzip() {
  return new Promise((resolve, reject) => {
    if (typeof window.unzipFile !== 'function') {
      reject(new Error('unzipFile function is not defined'));
      return;
    }

    window.unzipFile(file.value, {
      onProgress: (e) => {
        progress.value = e;
      },
      onComplete: () => {
        info.value = "Unzip completed";
        resolve();
      },
      onError: (error) => {
        info.value = "Unzip failed";
        reject(error);
      }
    });
  });
}

function install() {
  return new Promise((resolve, reject) => {
    if (typeof window.installFile !== 'function') {
      reject(new Error('installFile function is not defined'));
      return;
    }
    debugger;
    window.installFile(file.value.split('.').shift(), {
      onProgress: (e) => {
        progress.value = e;
      },
      onComplete: () => {
        info.value = "Install completed";
        resolve();
      },
      onError: (error) => {
        info.value = "Install failed";
        reject(error);
      }
    });
  });
}

async function start() {
  try{
  isActive.value = true;
  progressText.value = "downloading..."
  await download();
  info.value = "unzipping...";
  await unzip();
  progressText.value = "installing..."
  await install();
  }finally{
    isActive.value = false;
    progressText.value = "done"
  }
}
  return { progress, info,url, file, start,setFile,progressText,isActive};
});
