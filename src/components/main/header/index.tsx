import Link from 'next/link';
import React from 'react';
import { FaGithub } from 'react-icons/fa';

import { Avatar } from '@/components/common/Avatar';
import AvatarPopover from '@/components/avatarPopover';
import { PROJECT_Name } from '@/utils';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="flex flex-row items-center w-[100vw] justify-between bg-transparent py-4 px-12 pr-4 z-[999]">
      <Link className=" text-white font-bold" href="/">
        {PROJECT_Name}
      </Link>
      <div className=" flex gap-x-3">
        <a href={'https://github.com/xun082/online-edit-web'} className="p-2 rounded-md">
          <FaGithub className="w-[3.5vh] h-[3.5vh]" />
        </a>
        <AvatarPopover>
          <Avatar src="/kunkun.gif" className="flex h-[3.5vh] w-[3.5vh]" />
        </AvatarPopover>
      </div>
    </header>
  );
};
