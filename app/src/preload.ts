// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

export type ContextBridgeApi = {
  sendOptions: (options: any) => void;
  onData: (callback: ((customData: any[]) => void)) => void;
}

const exposedApi: ContextBridgeApi = {
  sendOptions: (options: any) => ipcRenderer.send('select-folder', options),
  onData: (callback: (data: any) => void) => {
    ipcRenderer.on('test', (data: any, args: any) => callback(args));
  }
};


contextBridge.exposeInMainWorld('electronAPI', exposedApi);