'use client';

import { ChangeEvent, FC, ReactNode, useEffect, useRef } from 'react';

import { cn } from '@/utils';

const InputComp: FC<{
  placeholder?: string;
  className?: string;
  onchange?: (event: ChangeEvent<HTMLInputElement>) => void;
  btnGroup?: ReactNode;
  value?: string;
}> = ({ placeholder, className, onchange, btnGroup, value = '' }) => {
  const inpRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inpRef.current) inpRef.current.value = value;
  }, [value]);

  return (
    <div
      className={cn(
        className,
        'flex justify-between items-center border rounded  bg-gray-700 p-1 focus-within:border-blue-500 duration-100 relative overflow-hidden',
      )}
    >
      <input
        ref={inpRef}
        type="text"
        placeholder={placeholder}
        onChange={onchange}
        // value={value}
        className="bg-transparent border-none outline-none text-white text-[14px] input-field flex-1 w-full"
      />
      <div className="absolute right-1 bg-gray-700">{btnGroup}</div>
    </div>
  );
};

export default InputComp;
