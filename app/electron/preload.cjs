const { contextBridge } = require("electron");
const { ipcRenderer } = require("electron");


contextBridge.exposeInMainWorld("downloadFile", (url,gameName,cb) => {
  return new Promise((resolve, reject) => {
    ipcRenderer.on("downloadProgress", (event, data) => {
      if (cb) cb(data);
    });

    ipcRenderer.on("downloadComplete", (event, data) => {
      resolve(data);
    });

    ipcRenderer.on("downloadError", (event, message) => {
      reject(message);
    });

    ipcRenderer.send("downloadFile", url,gameName);
  })
});

contextBridge.exposeInMainWorld("downloadAssets", (files,gameName,cb) => {
  console.log("downloadAssets", files);
  return new Promise((resolve, reject) => {

    ipcRenderer.on("downloadAssetsProgress", (event, data) => {
      if (cb) cb(data);
    });

    ipcRenderer.on("downloadAssetsComplete", (event, data) => {
      resolve(data);
    });

    ipcRenderer.on("downloadAssetsError", (event, message) => {
      reject(message);
    });

    ipcRenderer.send("downloadAssets", files, gameName);
  })
});

contextBridge.exposeInMainWorld("addFiles", (files,gameName,cb) => {
  return new Promise((resolve, reject) => {
    ipcRenderer.on("addFilesComplete", (event, data) => {
      resolve(data);
    });

    ipcRenderer.on("addFilesError", (event, message) => {
      reject(message);
    });

    ipcRenderer.send("addFiles", files, gameName);
  })
});

contextBridge.exposeInMainWorld("runScript", (action,gameName,cb) => {
  console.log("runScript", action, gameName);
  return new Promise((resolve, reject) => {

    ipcRenderer.on("runScriptProgress", (event, data) => {
      if (cb) cb(data);
    });

    ipcRenderer.on("runScriptComplete", (event, data) => {
      resolve(data);
    });

    ipcRenderer.on("runScriptError", (event, message) => {
      reject(message);
    });

    ipcRenderer.send("runScript", action, gameName);
  })
});
