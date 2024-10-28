'use client';

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { cn } from '@/utils';
import { RouterDataList } from '@/utils';
import { useModal } from '@/hooks/useModal';
import { CreateProjectModal } from '@/components/modals/create-project-modal';
import { CreateCoopertaionModal } from '@/components/modals/create-coopertaion-modal';

const Sider: React.FC = () => {
  const currentPath = usePathname();
  const { onOpen } = useModal();

  return (
    <aside className="flex flex-col items-center justify-between py-5 z-[999] bg-[#181a1f] h-full">
      <div className="flex flex-col gap-y-4 items-center justify-center w-full pb-4 border-b border-[rgba(194,202,242,.08)]">
        <Button
          onClick={() => onOpen('createProject')}
          className="w-[15vw] h-[3.8vh] bg-[#387BFF] hover:bg-blue-700 text-white"
        >
          <span className="text-lg">＋</span> 项目
        </Button>
        <Button
          onClick={() => onOpen('createCooperation')}
          className="w-[15vw] h-[3.8vh] bg-[#387BFF] hover:bg-blue-700 text-white"
        >
          <span className="text-lg">＋</span>协同文档
        </Button>
      </div>

      <div className="mb-auto pt-4 flex flex-col items-center justify-center w-[15vw]">
        {RouterDataList.map((item, index) => (
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
        ))}
      </div>

      <CreateProjectModal />
      <CreateCoopertaionModal />
    </aside>
  );
};

export default Sider;
