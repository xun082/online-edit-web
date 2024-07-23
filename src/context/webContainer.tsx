import React, { createContext, useContext, useEffect, useRef, ReactNode } from 'react';
import { WebContainer } from '@webcontainer/api';

import { WebContainerFileSystemTreeSavePoint, saveFileSystemTree } from '@/utils';

interface WebContainerContextProps {
  webContainerInstance: WebContainer | null;
}

const WebContainerContext = createContext<WebContainerContextProps | undefined>(undefined);

export const WebContainerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const webContainerInstance = useRef<WebContainer | null>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    const bootWebContainer = async () => {
      if (!isInitialized.current && !webContainerInstance.current) {
        webContainerInstance.current = await WebContainer.boot();

        const treeData = localStorage.getItem(WebContainerFileSystemTreeSavePoint);

        if (treeData) {
          const fileSystemTree = JSON.parse(treeData);
          await webContainerInstance.current.mount(fileSystemTree);
        }

        isInitialized.current = true;
      }
    };

    bootWebContainer();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();

      if (webContainerInstance.current) {
        saveFileSystemTree(webContainerInstance.current);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <WebContainerContext.Provider value={{ webContainerInstance: webContainerInstance.current }}>
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
