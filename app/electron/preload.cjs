
const { contextBridge, ipcRenderer } = require("electron");

function registerIpc(eventPrefix) {
  contextBridge.exposeInMainWorld(eventPrefix, (...args) => {
    const cb = typeof args[args.length - 1] === 'function' ? args.pop() : null; 
    return new Promise((resolve, reject) => {
      if (cb) {
        ipcRenderer.on(`${eventPrefix}Progress`, (_event, data) => {
          cb(data);
        });
      }

      ipcRenderer.on(`${eventPrefix}Complete`, (_event, data) => {
        resolve(data);
      });

      ipcRenderer.on(`${eventPrefix}Error`, (_event, message) => {
        reject(message);
      });

      ipcRenderer.send(eventPrefix, ...args);     });
  });
}

registerIpc("download");
registerIpc("downloadAssets");
registerIpc("addFiles");
registerIpc("runScript");
registerIpc("readDir");
registerIpc("readFile");
registerIpc("readImage");
registerIpc("uninstall");

