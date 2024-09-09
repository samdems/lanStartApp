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
  const url = process.env.VITE_DEV_SERVER_URL || "http://localhost:5174";

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

ipcMain.on("start-program", (event, programPath) => {
  exec(programPath, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error}`);
      return;
    }
    console.log(`Output: ${stdout}`);
  });
});

ipcMain.on("downloadFile", async (event, url) => {
  const downloader = new Downloader({
    url,
    directory: "./downloads",
    cloneFiles: false,
    onProgress: function (percentage, chunk, remainingSize) {
      event.reply("downloadProgress", percentage);
    },
  });

  await downloader.download();

  event.reply("downloadComplete", "done");
});

ipcMain.on("unzipFile", (event, file) => {
  const directory = "./downloads";
  const subDirectory = file.split(".")[0];
  const fileLocation = `${directory}/${file}`;
  const unzipStream = unzip.Extract({ path: directory + "/" + subDirectory });

  fs.createReadStream(fileLocation)
    .pipe(unzipStream)
    .on("close", () => {
      console.log("done");
      event.reply("unzippedFile", "done");
    })
    .on("error", (error) => {
      console.error("Stream error:", error);
      event.reply("unzippedFileError", error.message);
    });
});

ipcMain.on("installFile", async (event, file) => {
  const directory = "./downloads";
  const fileLocation = `../${directory}/${file}/lanStart.js`;
  const scripts = await import(`${fileLocation}`);
  if (!scripts.install) {
    return
  }
  scripts.install({ 
    onComplete: () => {
      event.reply("installedFile", "done");
    },
    onProgress: (percentage) => {
      event.reply("installedFileProgress", percentage);
    },
    onError: (error) => {
      event.reply("installedFileError", error);
    }
  });
})
ipcMain.on("playFile", async (event, file) => {
  const directory = "./downloads";
  const fileLocation = `../${directory}/${file}/lanStart.js`;
  const scripts = await import(`${fileLocation}`);
  console.log(scripts.start);
  scripts.start({ 
    onError: (error) => {
      console.error("Error:", error);
      event.reply("playedFileError", error);
    }
  });
});
