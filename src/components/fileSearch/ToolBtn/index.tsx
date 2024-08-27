'use client';

import { FC, MouseEventHandler, ReactNode, useMemo } from 'react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/utils';

type ClickFnType = MouseEventHandler<HTMLDivElement>;

const ToolBtn: FC<{
  children?: ReactNode;
  tip?: string | ReactNode;
  onClick?: ClickFnType;
  className?: string;
  disable?: boolean;
  active?: boolean;
}> = ({ children = '', tip = '', onClick, className, disable = false, active = false }) => {
  const iconStyle = useMemo(() => {
    const baseStyle =
      'duration-100 p-[2px] text-[20px] text-white mx-[1px] hover:rounded-[2px] box-border border border-transparent';
    const styleByDisable = disable ? 'text-slate-500/[.5]' : 'hover:bg-gray-600 ';
    const styleByActive = ' bg-sky-900 border-sky-800 border';

    return active ? cn(baseStyle, styleByActive) : cn(baseStyle, styleByDisable);
  }, [active, disable]);

  const btnClick: ClickFnType = (e) => {
    if (!disable) onClick && onClick(e);
  };

  return (
    <div className={cn('flex items-center', className)}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div onClick={btnClick} className={iconStyle}>
              {children}
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            className="bg-gray-700 text-while py-1 px-2 border-gray-500 border-[1px]"
          >
            <p>{tip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ToolBtn;
