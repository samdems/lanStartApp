import {  ipcMain } from "electron";
import path from "path";
import fs from "fs";
import yauzl from "yauzl";
import { Writable } from "stream";

import { Downloader } from "nodejs-file-downloader";
const __dirname = path.dirname(new URL(import.meta.url).pathname);

async function unzipFile(filePath, gamePath, event) {
  try {
    const zipFileSize = fs.statSync(filePath).size; // Total zip file size
    let totalUnzippedSize = 0; // Track total unzipped size

    // Open the zip file
    yauzl.open(filePath, { lazyEntries: true }, (err, zipfile) => {
      if (err) {
        console.error('Error opening zip file:', err);
        event.reply('downloadError', 'Error opening zip file');
        return;
      }

      zipfile.on('entry', (entry) => {
        const entryPath = path.join(gamePath, entry.fileName);

        // If it's a directory, create it
        if (/\/$/.test(entry.fileName)) {
          fs.mkdirSync(entryPath, { recursive: true });
          console.log(`Created directory: ${entryPath}`);
          zipfile.readEntry(); // Continue with the next entry
        } else {
          // It's a file, so we need to extract it
          zipfile.openReadStream(entry, (err, readStream) => {
            if (err) {
              console.error('Error reading zip entry:', err);
              event.reply('downloadError', 'Error reading zip entry');
              return;
            }

            // Ensure the directory exists before writing the file
            fs.mkdirSync(path.dirname(entryPath), { recursive: true });

            const writeStream = fs.createWriteStream(entryPath);
            readStream.pipe(writeStream);

            // Track unzipped size to calculate progress
            readStream.on('data', (chunk) => {
              totalUnzippedSize += chunk.length;
              const percentage = Math.min(100, (totalUnzippedSize / zipFileSize) * 100).toFixed(2);
              event.reply('downloadProgress', {
                message: 'Unzipping',
                percentage: percentage,
              });
            });

            writeStream.on('finish', () => {
              console.log(`Extracted file: ${entryPath}`);
              zipfile.readEntry(); // Continue with the next entry
            });
          });
        }
      });

      zipfile.on('end', () => {
        event.reply('downloadProgress', {
          message: 'Unzipping',
          percentage: '100',
        });
        fs.unlinkSync(filePath); // Delete the zip file after extraction
        console.log('Unzipping done');
        event.reply('downloadComplete', 'done');
      });

      zipfile.on('error', (err) => {
        console.error('Error during unzip:', err);
        event.reply('downloadError', 'Unzipping error');
      });

      // Start reading the first entry
      zipfile.readEntry();
    });
  } catch (error) {
    console.error('Error in unzip process:', error);
    event.reply('downloadError', 'Error in unzip process');
  }
}

ipcMain.on("download", async (event, url, gameName,downloadPath) => {
  try {
    console.log("--------------------");
    console.log("download", url);
    const fileName = url.split("/").pop();
    console.log("downloadPath", downloadPath);
    console.log("fileName", gameName);
    const filePath = path.join(downloadPath, fileName);

    // Ensure download directory exists
    if (!fs.existsSync(downloadPath)) {
      fs.mkdirSync(downloadPath, { recursive: true });
    }

    const downloader = new Downloader({
      url,
      directory: downloadPath,
      cloneFiles: false,
      onProgress: function (percentage) {
        event.reply("downloadProgress", { message: "Downloading", percentage });
      },
    });

    console.log("downloading");
    await downloader.download();

    event.reply("downloadProgress", { message: "Unzipping", percentage: "10" });

    console.log({ filePath, downloadPath });

    unzipFile(filePath, downloadPath, event);

  } catch (error) {
    console.error("Error in download or unzip:", error);
    event.reply("downloadError", "Error");
  }
});

