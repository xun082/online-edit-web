import React, { Fragment, useEffect } from 'react';

import { useWebContainerStore } from '@/store/webContainerStore';

interface WebContainerProviderProps {}

const WebContainerProvider: React.FC<WebContainerProviderProps> = () => {
  const { initWebContainer } = useWebContainerStore();
  useEffect(() => {
    initWebContainer();
  }, []);

  return <Fragment></Fragment>;
};

export default WebContainerProvider;
