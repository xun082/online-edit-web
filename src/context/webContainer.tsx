import React, { createContext, useContext, useEffect, useState } from 'react';
import { WebContainer } from '@webcontainer/api';

import { WebContainerFileSystemTreeSavePoint, saveFileSystemTree } from '@/utils';

interface WebContainerContextProps {
  webContainerInstance: WebContainer | null;
}

const WebContainerContext = createContext<WebContainerContextProps | undefined>(undefined);

export const WebContainerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [webContainerInstance, setWebContainerInstance] = useState<WebContainer | null>(null);

  useEffect(() => {
    const bootWebContainer = async () => {
      const instance = await WebContainer.boot();

      const treeData = localStorage.getItem(WebContainerFileSystemTreeSavePoint);

      if (treeData) {
        const fileSystemTree = JSON.parse(treeData);
        await instance.mount(fileSystemTree);
      }

      setWebContainerInstance(instance);
    };

    if (!webContainerInstance) {
      bootWebContainer();
    }
  }, [webContainerInstance]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();

      if (webContainerInstance) {
        saveFileSystemTree(webContainerInstance);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [webContainerInstance]);

  return (
    <WebContainerContext.Provider value={{ webContainerInstance }}>
      {children}
    </WebContainerContext.Provider>
  );
};

export const useWebContainer = () => {
  const context = useContext(WebContainerContext);

  if (!context) {
    throw new Error('useWebContainer must be used within a WebContainerProvider');
  }

  return context.webContainerInstance;
};
