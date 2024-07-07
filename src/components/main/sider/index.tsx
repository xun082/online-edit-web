'use client';

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import { GoFileDirectory } from 'react-icons/go';
import { MdComputer } from 'react-icons/md';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils';
import { PATHS } from '@/utils';

interface RouterData {
  title: string;
  icon: React.ReactNode;
  link: string;
}

const RouterDataList: RouterData[] = [
  {
    title: '项目',
    icon: <GoFileDirectory className=" w-6 text-[16px] mr-3" />,
    link: PATHS.MAIN_DASHBOARD,
  },
  {
    title: '文档',
    icon: <MdComputer className=" w-6 text-[16px] mr-3" />,
    link: PATHS.MAIN_TEMPLATES,
  },
];

const renderRouterDataList = (data: RouterData[], currentPath: string) => {
  return data.map((item, index) => {
    return (
      <Link
        key={index}
        href={item.link}
        className={cn(
          'flex items-center justify-start my-2 pl-[1vw] text-[14px] font-[800] w-full h-[4vh] py-2 rounded-[5px] hover:bg-[#2f3136] hover:text-white',
          currentPath === item.link && 'bg-[#2f3136] text-white',
        )}
      >
        <span>{item.icon}</span>
        <span>{item.title}</span>
      </Link>
    );
  });
};

interface SiderProps {}

export const Sider: React.FC<SiderProps> = () => {
  const currentRoute = usePathname();

  return (
    <aside className="flex flex-col items-center justify-between py-5 z-[999] bg-[#181a1f] h-full">
      <div className=" flex items-center justify-center w-full pb-4 border-b boder-[rgba(194,202,242,.08)]">
        <Button className=" w-[15vw] h-[3.8vh] bg-[#387BFF] hover:bg-blue-700 text-white">
          <span className=" text-lg">＋</span> 项目
        </Button>
      </div>

      <div className=" mb-auto pt-4 flex flex-col items-center justify-center w-[15vw]">
        {renderRouterDataList(RouterDataList, currentRoute)}
      </div>
    </aside>
  );
};
