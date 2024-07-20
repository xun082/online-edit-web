'use client';

import { FC, ReactNode } from 'react';

import { cn } from '@/utils';

const MenuItem: FC<{
  children?: ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}> = ({ children, className, onClick }) => {
  return (
    <div
      className={cn('w-full p-1 hover:bg-blue-500 transition-colors cursor-pointer', className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const Menu: FC<{
  children?: ReactNode;
  className?: string;
  topLine?: boolean | undefined;
}> = ({ children, className, topLine = false }) => {
  const hasTopLine = topLine || (typeof topLine === 'undefined' && children);

  return (
    <div className={cn('relative w-full py-2', className)}>
      {hasTopLine && <div className="w-full h-[1px] bg-gray-600 absolute top-0 opacity-50"></div>}
      {children}
    </div>
  );
};

export { Menu, MenuItem };
