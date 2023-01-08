// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

export type ContextBridgeApi = {
  sendOptions: (options: any) => void
}

const exposedApi: ContextBridgeApi = {
  sendOptions: (options: any) => ipcRenderer.send('select-folder', options)
};

contextBridge.exposeInMainWorld('electronAPI', exposedApi);