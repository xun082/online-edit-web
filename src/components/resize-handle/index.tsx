import React, { FC } from 'react';
import { PanelResizeHandle } from 'react-resizable-panels';

interface ResizeHandleType {
  direction?: 'vertical' | 'horizontal';
}

const ResizeHandle: FC<ResizeHandleType> = (props) => {
  const { direction = 'horizontal' } = props;
  const heightClass = direction === 'horizontal' ? 'h-full' : 'h-[5px]';
  const widthClass = direction === 'vertical' ? 'w-full' : 'w-[5px]';

  return (
    <PanelResizeHandle
      className={`bg-gray-800 cursor-grab hover:bg-blue-500 ${heightClass} ${widthClass}`}
    />
  );
};

export default ResizeHandle;
