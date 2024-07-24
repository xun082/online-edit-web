import React, { Fragment, useEffect, memo } from 'react';

import { useWebContainerStore } from '@/store/webContainerStore';

interface WebContainerProviderProps {}

const WebContainerProvider: React.FC<WebContainerProviderProps> = () => {
  const { initWebContainer } = useWebContainerStore();
  useEffect(() => {
    initWebContainer();
  }, [initWebContainer]); // 注意这里需要将 initWebContainer 添加到依赖数组中

  return <Fragment></Fragment>;
};

export default memo(WebContainerProvider);
