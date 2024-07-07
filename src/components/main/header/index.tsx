import Link from 'next/link';
import React from 'react';

import { Avatar } from '@/components/common/Avatar';
import { PROJECT_Name } from '@/utils';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="flex flex-row items-center w-[100vw] justify-between bg-transparent py-4 px-12 z-[999]">
      <Link className=" text-white font-bold" href="/">
        {PROJECT_Name}
      </Link>

      <Avatar className=" flex h-[3.5vh] w-[3.5vh]" />
    </header>
  );
};
