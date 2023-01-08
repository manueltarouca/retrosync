import type { ContextBridgeApi } from './preload'

declare global {
  interface Window {
    electronAPI?: ContextBridgeApi;
  }
}