import React, { FC } from 'react';
import { PanelResizeHandle } from 'react-resizable-panels';

import { cn } from '@/utils';

interface ResizeHandleType {
  direction?: 'vertical' | 'horizontal';
  className?: string;
}

const ResizeHandle: FC<ResizeHandleType> = (props) => {
  const { direction = 'horizontal', className } = props;
  const heightClass = direction === 'horizontal' ? 'h-full' : 'h-[5px]';
  const widthClass = direction === 'vertical' ? 'w-full' : 'w-[5px]';

  return (
    <PanelResizeHandle
      className={cn(
        `bg-gray-800 cursor-grab hover:bg-blue-500 ${heightClass} ${widthClass}`,
        className,
      )}
    />
  );
};

export default ResizeHandle;
