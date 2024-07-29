import { create } from 'zustand';
import { WebContainer } from '@webcontainer/api';

import { curDirectory, writeDirByLocal } from '@/utils';

interface WebContainerState {
  webContainerInstance: WebContainer | null;
  isInitialized: boolean;
  url: string;
}

interface WebContainerActions {
  initWebContainer: (projectId?: string) => Promise<void>;
  setUrl: (url: string) => void;
}

type WebContainerStore = WebContainerState & WebContainerActions;

export const useWebContainerStore = create<WebContainerStore>((set, get) => ({
  webContainerInstance: null,
  isInitialized: false,
  url: '',
  async initWebContainer(projectId = '') {
    const { webContainerInstance, isInitialized } = get();
    const projectInfo = localStorage.getItem(projectId);

    if (!isInitialized && !webContainerInstance) {
      const newWebContainerInstance = await WebContainer.boot();

      if (projectInfo) {
        const { projectFileData } = JSON.parse(projectInfo);
        console.log(projectFileData);
        await writeDirByLocal(projectFileData, newWebContainerInstance);
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
      if (projectInfo) {
        const { projectFileData } = JSON.parse(projectInfo);
        await writeDirByLocal(projectFileData, webContainerInstance as WebContainer);
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
