import { create } from 'zustand';
import { WebContainer } from '@webcontainer/api';

import { WebContainerFileSystemTreeSavePoint, saveFileSystemTree } from '@/utils';

interface WebContainerState {
  webContainerInstance: WebContainer | null;
  isInitialized: boolean;
}

interface WebContainerActions {
  initWebContainer: () => Promise<void>;
  saveFileSystemOnUnload: () => void;
}

type WebContainerStore = WebContainerState & WebContainerActions;

export const useWebContainerStore = create<WebContainerStore>((set, get) => ({
  webContainerInstance: null,
  isInitialized: false,

  async initWebContainer() {
    const { webContainerInstance, isInitialized } = get();

    if (!isInitialized && !webContainerInstance) {
      const newWebContainerInstance = await WebContainer.boot();

      const treeData = localStorage.getItem(WebContainerFileSystemTreeSavePoint);

      if (treeData) {
        const fileSystemTree = JSON.parse(treeData);
        await newWebContainerInstance.mount(fileSystemTree);
      }

      set({ webContainerInstance: newWebContainerInstance, isInitialized: true });

      // Add the beforeunload listener here
      window.addEventListener('beforeunload', get().saveFileSystemOnUnload);
    }
  },

  saveFileSystemOnUnload() {
    const { webContainerInstance } = get();

    if (webContainerInstance) {
      saveFileSystemTree(webContainerInstance);
    }

    // Remove the listener when the function is called
    window.removeEventListener('beforeunload', this.saveFileSystemOnUnload);
  },
}));
