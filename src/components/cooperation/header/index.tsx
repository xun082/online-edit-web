import Link from 'next/link';
import React from 'react';

import { AnimatedTooltip } from '@/components/cooperation/avatarList';
import { useCooperationPerson } from '@/store/cooperationPersonStore';

interface ProjectInfo {
  [key: string]: any;
}
interface HeaderProps {
  roomInfo: ProjectInfo;
  roomId: string;
}

export const CooperationHeader: React.FC<HeaderProps> = ({ roomId }) => {
  const { getPersons } = useCooperationPerson();

  return (
    <header className=" relative flex flex-row items-center w-[100vw] justify-between bg-transparent py-6 z-[999]">
      <Link className=" text-white font-bold ml-3" href="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#1389FD"
          viewBox="0 0 32 32"
          width="1.5em"
          height="1.5em"
        >
          <path d="M5.853 18.647h8.735L9.45 31l16.697-17.647h-8.735L22.55 1z"></path>
        </svg>
      </Link>
      <div className=" flex text-white items-center justify-center w-full absolute leading-[5vh] font-[500] text-[16px] pointer-events-none">
        {roomId}
      </div>
      <div className=" pr-20 h-full">
        {getPersons().length > 0 && (
          <AnimatedTooltip
            items={getPersons().map((item) => ({
              id: item,
              name: String(item),
              designation: '',
              image: `https://api.dicebear.com/9.x/lorelei/svg?seed=${item}`,
            }))}
          />
        )}
      </div>
    </header>
  );
};
