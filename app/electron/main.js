// electron/main.js
import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import fs from "fs";
import { Downloader } from "nodejs-file-downloader";
import "./downloadIpc.js"
import dotenv from "dotenv";
dotenv.config();
const __dirname = path.dirname(new URL(import.meta.url).pathname);

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 700,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.cjs"), // Optional if you need preload
    },
  });

  // Load Vite dev server in development or build file in production
  win.loadURL(process.env.VITE_DEV_SERVER_URL || `file://${path.join(__dirname, "dist/index.html")}`);
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});



ipcMain.on("downloadAssets", async (event, files, gameName) => {
  console.log("downloadAssets", files);
  for (const file of files) {
    const downloadPath = path.join(__dirname, "../downloads");
    const fileType = file.url.split(".").pop();
    const downloader = new Downloader({
      url: file.url,
      directory: downloadPath + "/" + gameName + "/_assets",
      cloneFiles: false,
      fileName: file.name + "." + fileType,
      onProgress: function (percentage) {
        event.reply("downloadAssetsProgress", {message:file.name, percentage});
      },
    });
    await downloader.download();
  }

  console.log("downloading");

  event.reply("downloadAssetsComplete", "done");
});

ipcMain.on("addFiles", async (event, files, gameName) => {
  for (const file of files) {
    const name = file.name;
    const text = file.text;
    await fs.promises.writeFile(
      path.join(__dirname, "../downloads", gameName, name),
      text
    );
  }
  event.reply("addFilesComplete", "done");
})

ipcMain.on("runScript", async (event,action, gameName,options) => {
  let script;
  console.log("runScript", action, gameName);
  const gamePath = path.join(__dirname, "../downloads", gameName);
  const scriptPath = path.join(gamePath, '_script.js');
  console.log("scriptPath", scriptPath);

  try {
    script = await import(scriptPath);
  } catch (error) {
    console.error("Error in import script", error);
    return event.reply("runScriptError", {msg:"Error in import script",error});
  }

  console.log("script", script);
  if (script[action]) {
    await script[action]((msg,percentage,)=>{
      event.reply("runScriptProgress", {msg,percentage});
      console.log("runScriptProgress", {msg,percentage});
    },options)
    console.log("runScriptComplete", "done");
    return event.reply("runScriptComplete", "done");
  }
  console.log("runScriptError", "Action not found");
  return event.reply("runScriptError", "Action not found");

});

ipcMain.on("readDir", async (event, path) => {
  try {
    const files = await fs.promises.readdir(__dirname + '/../' + path);
    event.reply("readDirComplete", files);
  } catch (error) {
    console.error("Error in readDir", error);
    return event.reply("readDirError", error);
  }
});

ipcMain.on("readFile", async (event, path) => {
  try {
    const data = await fs.promises.readFile(__dirname + '/../' + path, 'utf8');
    event.reply("readFileComplete", data);
  } catch (error) {
    console.error("Error in readFile", error);
    return event.reply("readFileError", error);
  }
});

ipcMain.on("readImage", async (event, path) => {
  try {
    const base64 = await fs.promises.readFile(__dirname + '/../' + path, 'base64');
    event.reply("readImageComplete", base64);
  } catch (error) {
    console.error("Error in readImage", error);
    return event.reply("readImageError", error);
  }
});

ipcMain.on("uninstall", async (event, gameName) => {
  let script;
  const gamePath = path.join(__dirname, "../downloads", gameName);
  const scriptPath = path.join(gamePath, '_script.js');

  if (!fs.existsSync(gamePath)) {
    return event.reply("uninstallError", "Game not found");
  }

  try {
    script = await import(scriptPath + '?v=' + new Date().getTime());
  } catch (error) {
    console.error("Error in import script", error);
    return event.reply("runScriptError", {msg:"Error in import script",error});
  }

  const action = "uninstall";
  if (script[action]) {
    await script[action]((msg,percentage)=>{
      event.reply("uninstallProgress", {msg,percentage});
      console.log("uninstallProgress", {msg,percentage});
    })
  }
  console.log(gamePath);
  fs.rmdirSync(gamePath, { recursive: true });
  
  console.log("uninstallComplete", "done");
  return event.reply("uninstallComplete", "done");
});
