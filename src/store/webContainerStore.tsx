import { create } from 'zustand';
import { WebContainer } from '@webcontainer/api';

import {
  WebContainerFileSystemTreeSavePoint,
  clearCurDirectory,
  curDirectory,
  writeDirByLocal,
} from '@/utils';

interface WebContainerState {
  webContainerInstance: WebContainer | null;
  isInitialized: boolean;
}

interface WebContainerActions {
  initWebContainer: () => Promise<void>;
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

      if (curDirectory) {
        await writeDirByLocal(curDirectory, newWebContainerInstance);
        clearCurDirectory();
      }

      set({ webContainerInstance: newWebContainerInstance, isInitialized: true });
    }
  },
}));
