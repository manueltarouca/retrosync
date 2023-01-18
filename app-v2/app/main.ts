import { app, BrowserWindow, dialog, ipcMain, screen } from 'electron';
import axios from 'axios';
import * as path from 'path';
import * as fs from 'fs';
import * as FormData from 'form-data';

import { search } from './utils/file';

let win: BrowserWindow = null;
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

function createWindow(): BrowserWindow {

  //const size = screen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve),
      contextIsolation: false,  // false if you want to run e2e test with Spectron
    },
  });

  if (serve) {
    const debug = require('electron-debug');
    debug();

    require('electron-reloader')(module);
    win.loadURL('http://localhost:4200');
  } else {
    // Path when running electron executable
    let pathIndex = './index.html';

    if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
      // Path when running electron in local folder
      pathIndex = '../dist/index.html';
    }

    const url = new URL(path.join('file:', __dirname, pathIndex));
    win.loadURL(url.href);
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win;
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () => setTimeout(createWindow, 400));

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

  const API_BASE_URL = 'http://localhost:3001';

  ipcMain.on('select-folder', async (event, options) => {
    const result = await dialog.showOpenDialog(options);
    if (result.canceled) {
      console.log('User canceled');
    } else {
      const dir = result.filePaths[0];
      console.log(`Selected folder: ${dir}`);
      const files = search(dir, '.sav');

      const formData = new FormData();
      files.forEach(fileData => {
        const file = fs.readFileSync(fileData.path);
        formData.append('file', file, fileData.path);
        formData.append('filedata', JSON.stringify(fileData));
      });

      const confirm = await dialog.showMessageBox({
        buttons: ['yes', 'no'],
        message: 'Do you wish to backup this folder save files?'
      });
      if (confirm.response === 0) {
        event.sender.send('test', files);
        await axios.post(`${API_BASE_URL}/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        })
      }
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
