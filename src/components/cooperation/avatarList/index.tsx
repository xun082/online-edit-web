'use client';

import React, { useState } from 'react';

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    designation: string;
    image: string;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-row gap-2">
      {items.map((item) => (
        <div
          className="relative group flex flex-col items-center" // 保持 flex-col 以确保 tooltip 在头像下方
          key={item.name}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {hoveredIndex === item.id && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 flex text-xs flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-2 py-1">
              <div className="absolute inset-x-5 z-30 w-[10%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px" />
              <div className="absolute left-5 w-[20%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px" />
              <div className="font-bold text-white relative z-30 text-sm">{item.name}</div>
              <div className="text-white text-xs">{item.designation}</div>
            </div>
          )}
          <img
            src={item.image}
            alt={item.name}
            className="object-cover !m-0 !p-0 object-top rounded-full h-8 w-8 border-2 group-hover:scale-105 group-hover:z-30 border-white relative transition duration-500"
          />
        </div>
      ))}
    </div>
  );
};
