const { contextBridge } = require("electron");
const { ipcRenderer } = require("electron");

ipcRenderer.send("start-program", '/usr/bin/espeak "test"');

contextBridge.exposeInMainWorld("speak", (text) => {
  ipcRenderer.send("start-program", `/usr/bin/espeak "${text}"`);
});

contextBridge.exposeInMainWorld("downloadFile", (text,cbs) => {
  ipcRenderer.on("downloadProgress", (event, percentage) => {
    cbs?.onProgress(percentage);
  });
  ipcRenderer.on("downloadComplete", (event, percentage) => {
    cbs?.onComplete(percentage);
  });
  ipcRenderer.send("downloadFile", text);
});

contextBridge.exposeInMainWorld("unzipFile", (text,cbs) => {
  ipcRenderer.send("unzipFile", text);
  ipcRenderer.on("unzippedFile", (event, percentage) => {
    cbs?.onComplete(percentage);
  });
  ipcRenderer.on("unzippedFileError", (event, message) => {
    cbs?.onError(message);
  });
});

contextBridge.exposeInMainWorld("installFile", (text,cbs) => {
  ipcRenderer.send("installFile", text);
  ipcRenderer.on("installedFile", (event, percentage) => {
    cbs?.onComplete(percentage);
  });
  ipcRenderer.on("installedFileProgress", (event, percentage) => {
    cbs?.onProgress(percentage);
  });
  ipcRenderer.on("installedFileError", (event, message) => {
    cbs?.onError(message);
  });
});

contextBridge.exposeInMainWorld("playFile", (text,cbs) => {
  ipcRenderer.send("playFile", text);
  ipcRenderer.on("playError", (event, message) => {
    cbs?.onError(message);
  });
});
