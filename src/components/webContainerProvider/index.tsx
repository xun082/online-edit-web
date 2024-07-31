import React, { Fragment, useEffect } from 'react';

import { useWebContainerStore } from '@/store/webContainerStore';

interface WebContainerProviderProps {
  projectId: string;
}

const WebContainerProvider: React.FC<WebContainerProviderProps> = ({ projectId }) => {
  const { initWebContainer, setInitialized } = useWebContainerStore();
  useEffect(() => {
    initWebContainer(projectId);

    return () => {
      setInitialized(false);
    };
  }, [projectId]);

  return <Fragment></Fragment>;
};

export default WebContainerProvider;
