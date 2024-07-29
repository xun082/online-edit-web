import React, { Fragment, useEffect } from 'react';

import { useWebContainerStore } from '@/store/webContainerStore';

interface WebContainerProviderProps {
  projectId: string;
}

const WebContainerProvider: React.FC<WebContainerProviderProps> = ({ projectId }) => {
  const { initWebContainer } = useWebContainerStore();
  useEffect(() => {
    initWebContainer(projectId);
  }, [projectId]);

  return <Fragment></Fragment>;
};

export default WebContainerProvider;
