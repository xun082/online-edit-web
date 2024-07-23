import { WebContainer } from '@webcontainer/api';

import { WebContainerFileSystemTreeSavePoint, writeDirByLocal, curDirectory } from '@/utils';

let webContainerInstance: WebContainer | null = null;

export const getWebContainerInstance = async (): Promise<WebContainer> => {
  if (!webContainerInstance) {
    webContainerInstance = await WebContainer.boot();

    const treeData = localStorage.getItem(WebContainerFileSystemTreeSavePoint);

    if (treeData) {
      const fileSystemTree = JSON.parse(treeData);
      await webContainerInstance.mount(fileSystemTree);
    }

    if (curDirectory) {
      await writeDirByLocal(curDirectory, webContainerInstance);
    }
  }

  return webContainerInstance;
};

export const saveWebContainerFileSystemTree = async () => {
  if (webContainerInstance) {
    const fileSystemTree = await webContainerInstance.fs.readdir('/', { withFileTypes: true });
    localStorage.setItem(WebContainerFileSystemTreeSavePoint, JSON.stringify(fileSystemTree));
  }
};
