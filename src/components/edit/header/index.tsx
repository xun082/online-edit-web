import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { VscLiveShare } from 'react-icons/vsc';
import { FaRegSave } from 'react-icons/fa';
import { GoRepoForked } from 'react-icons/go';

import { Avatar } from '@/components/common/Avatar';
import { Button } from '@/components/ui/button';
import AvatarPopover from '@/components/avatarPopover';
import WebContainerProvider from '@/components/webContainerProvider';

interface UserInfo {
  [key: string]: any;
}
interface HeaderProps {
  userInfo: UserInfo;
  projectId: string;
}

export const Header: React.FC<HeaderProps> = ({ userInfo, projectId }) => {
  const [projectName, setProjectName] = useState('');
  useEffect(() => {
    const projectData = localStorage.getItem(projectId)
      ? JSON.parse(localStorage.getItem(projectId) as string)
      : null;

    if (projectData) {
      setProjectName(projectData.name);
    }
  }, []);

  return (
    <header className=" relative flex flex-row items-center w-[100vw] justify-between bg-transparent py-4 z-[999]">
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
      <div className=" flex items-center gap-x-2 mr-auto ml-2">
        <Button className=" flex gap-x-2 font-[300] bg-transparent text-white" disabled>
          <FaRegSave />
          Save
        </Button>
        <Button className=" flex gap-2 w-24 h-[4vh] font-[300] bg-transparent text-white hover:bg-gray-600/30 hover:border-[white]/20 hover:border-[1px]">
          <VscLiveShare />
          share
        </Button>
        <Button className=" flex gap-x-2 w-20 h-[4vh] font-[300] bg-transparent text-white hover:bg-gray-600/30 hover:border-[white]/20 hover:border-[1px]">
          <GoRepoForked />
          fork
        </Button>
      </div>
      <div className=" flex items-center justify-center w-full absolute leading-[5vh] font-[500] text-[16px] pointer-events-none">
        {projectName}
      </div>
      <div className="mr-4">
        <AvatarPopover>
          <Avatar src={userInfo.imgurl} className=" flex h-[3.5vh] w-[3.5vh]" />
        </AvatarPopover>
      </div>
      <WebContainerProvider projectId={projectId}></WebContainerProvider>
    </header>
  );
};
