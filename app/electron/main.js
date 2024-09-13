// electron/main.js
import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import dotenv from "dotenv";
import { exec } from "child_process";
import fs from "fs";
import { Downloader } from "nodejs-file-downloader";
import unzip from "unzipper";
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

  const url = process.env.VITE_DEV_SERVER_URL || "http://localhost:5173";

  // Load Vite dev server in development or build file in production
  win.loadURL(url || `file://${path.join(__dirname, "dist/index.html")}`);
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

ipcMain.on("downloadFile", async (event, url, gameName) => {
  try {
    console.log("downloadFile", url);
    const fileName = url.split("/").pop();
    const downloadPath = path.join(__dirname, "../downloads");
    const filePath = path.join(downloadPath, fileName);
    const gamePath = path.join(downloadPath, gameName);

    // Ensure download directory exists
    if (!fs.existsSync(downloadPath)) {
      fs.mkdirSync(downloadPath, { recursive: true });
    }

    const downloader = new Downloader({
      url,
      directory: downloadPath,
      cloneFiles: false,
      onProgress: function (percentage, chunk, remainingSize) {
        event.reply("downloadProgress", { message: "Downloading", percentage });
      },
    });

    console.log("downloading");
    await downloader.download();

    event.reply("downloadProgress", { message: "Unzipping", percentage: "10" });
    console.log("unzipping");

    const unzipStream = fs
      .createReadStream(filePath)
      .pipe(unzip.Extract({ path: gamePath }));

    unzipStream.on("entry", (entry) => {
      console.log("Unzipping", entry.path);
    });

    unzipStream.on("close", () => {
      event.reply("downloadProgress", {
        message: "Unzipping",
        percentage: "100",
      });
      fs.unlinkSync(filePath);
      console.log("Unzipping done");
      event.reply("downloadComplete", "done");

    });

    unzipStream.on("error", (err) => {
      console.error("Unzipping error:", err);
      event.reply("downloadError", "Unzipping error");
    });
  } catch (error) {
    console.error("Error in download or unzip:", error);
    event.reply("downloadError", "Error");
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
      onProgress: function (percentage, chunk, remainingSize) {
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

ipcMain.on("runScript", async (event,action, gameName) => {
  console.log("runScript", action, gameName);
  const gamePath = path.join(__dirname, "../downloads", gameName);
  const scriptPath = path.join(gamePath, '_script.js');
  console.log("scriptPath", scriptPath);

  try {
    var script = await import(scriptPath);
  } catch (error) {
    console.error("Error in import script", error);
    return event.reply("runScriptError", {msg:"Error in import script",error});

  }
  console.log("script", script);
  if (script[action]) {
    await script[action]((msg,percentage)=>{
      event.reply("runScriptProgress", {msg,percentage});
      console.log("runScriptProgress", {msg,percentage});
    })
    return event.reply("runScriptComplete", "done");
    console.log("runScriptComplete", "done");
  }
  console.log("runScriptError", "Action not found");
  return event.reply("runScriptError", "Action not found");

});

