import Link from 'next/link';
import React from 'react';

import { CollaboratorAvatarList } from '@/components/cooperation/collaboratorAvatarList';

interface ProjectInfo {
  [key: string]: any;
}
interface HeaderProps {
  roomInfo: ProjectInfo;
  roomId: string;
}

const avatarUrls = [
  'https://avatars.githubusercontent.com/u/16860528',
  'https://avatars.githubusercontent.com/u/20110627',
  'https://avatars.githubusercontent.com/u/106103625',
  'https://avatars.githubusercontent.com/u/59228569',
];

export const CooperationHeader: React.FC<HeaderProps> = ({ roomId }) => {
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
      <div className=" pr-20">
        <CollaboratorAvatarList avatarUrls={avatarUrls} />
      </div>
    </header>
  );
};
