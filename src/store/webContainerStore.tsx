import { create } from 'zustand';
import { WebContainer } from '@webcontainer/api';

import { WebContainerFileSystemTreeSavePoint, curDirectory, writeDirByLocal } from '@/utils';

interface WebContainerState {
  webContainerInstance: WebContainer | null;
  isInitialized: boolean;
  url: string;
}

interface WebContainerActions {
  initWebContainer: () => Promise<void>;
  setUrl: (url: string) => void;
}

type WebContainerStore = WebContainerState & WebContainerActions;

export const useWebContainerStore = create<WebContainerStore>((set, get) => ({
  webContainerInstance: null,
  isInitialized: false,
  url: '',
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

      newWebContainerInstance?.on('server-ready', (port, url) => {
        console.log('server-ready', port, url);
        set({ url });
      });

      set({ webContainerInstance: newWebContainerInstance, isInitialized: true });
    } else {
      if (treeData) {
        const fileSystemTree = JSON.parse(treeData);
        await webContainerInstance!.mount(fileSystemTree);
      }

      if (curDirectory) {
        await writeDirByLocal(curDirectory, webContainerInstance!);
      }

      webContainerInstance?.on('server-ready', (port, url) => {
        console.log('server-ready', port, url);
        set({ url });
      });

      set({ webContainerInstance: webContainerInstance, isInitialized: true });
    }
  },
  setUrl(url: string) {
    set({ url });
  },
}));
