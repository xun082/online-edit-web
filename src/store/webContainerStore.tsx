import { create } from 'zustand';
import { WebContainer } from '@webcontainer/api';

import { WebContainerFileSystemTreeSavePoint, curDirectory, writeDirByLocal } from '@/utils';

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
    const treeData = localStorage.getItem(WebContainerFileSystemTreeSavePoint);

    if (!isInitialized && !webContainerInstance) {
      const newWebContainerInstance = await WebContainer.boot();

      if (treeData) {
        const fileSystemTree = JSON.parse(treeData);
        await newWebContainerInstance.mount(fileSystemTree);
      }

      if (curDirectory) {
        await writeDirByLocal(curDirectory, newWebContainerInstance);
      }

      set({ webContainerInstance: newWebContainerInstance, isInitialized: true });
    } else {
      if (treeData) {
        const fileSystemTree = JSON.parse(treeData);
        await webContainerInstance!.mount(fileSystemTree);
      }

      if (curDirectory) {
        await writeDirByLocal(curDirectory, webContainerInstance!);
      }

      set({ webContainerInstance: webContainerInstance, isInitialized: true });
    }
  },
}));
