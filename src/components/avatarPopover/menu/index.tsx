'use client';

import { FC, ReactNode } from 'react';

const MenuItem: FC<{
  children?: ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}> = ({ children, className, onClick }) => {
  const defaultClassName = `w-full p-1 hover:bg-blue-500 transition-colors cursor-pointer`;

  return (
    <div className={`${defaultClassName} ${className ?? ''}`} onClick={onClick}>
      {children}
    </div>
  );
};

const Menu: FC<{ children?: ReactNode; className?: string }> = ({ children, className }) => {
  const defaultClassName = `relative w-full py-2 `;

  return (
    <div className={`${defaultClassName} ${className ?? ''}`}>
      <div className="w-full h-[1px] bg-gray-600 absolute top-0 opacity-50"></div>
      {children}
    </div>
  );
};

export { Menu, MenuItem };
