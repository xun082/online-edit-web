'use client';

import { FC, ReactNode } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover';
import {
  AiOutlineFolder,
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineSetting,
  AiOutlinePoweroff,
} from 'react-icons/ai';

import { Avatar } from '@/components/common/Avatar';
import { Menu, MenuItem } from '@/components/avatarPopover/menu';

const AvatarPopoverContent: FC = () => {
  const menuItemTwStyle = `flex items-center`;
  const testHandle = () => {
    console.log('Your dashboard');
  };

  return (
    <div className="w-full h-full flex flex-col items-center ">
      <Avatar className="bg-slate-700 w-20 h-20 mt-5"></Avatar>
      <span className="mt-5 text-white select-none">Your Name</span>
      <span className="text-xs text-gray-200 select-none mb-5">Your Account</span>
      <Menu>
        <MenuItem className={menuItemTwStyle} onClick={testHandle}>
          <AiOutlineHome className="mx-2" />
          Your dashboard
        </MenuItem>
        <MenuItem className={menuItemTwStyle}>
          <AiOutlineUser className="mx-2" />
          Your profile
        </MenuItem>
        <MenuItem className={menuItemTwStyle}>
          <AiOutlineSetting className="mx-2" />
          Settings
        </MenuItem>
        <MenuItem className={menuItemTwStyle}>
          <AiOutlineFolder className="mx-2" />
          Local projects
        </MenuItem>
      </Menu>
      <Menu>
        <MenuItem className={menuItemTwStyle}>
          <AiOutlinePoweroff className="mx-2" />
          Sign out
        </MenuItem>
      </Menu>
    </div>
  );
};

const AvatarPopover: FC<{ children: ReactNode }> = ({ children }) => {
  const twAnimation = `
  data-[state=open]:data-[side=top]:animate-slideDownAndFade
  data-[state=open]:data-[side=right]:animate-slideLeftAndFade
  data-[state=open]:data-[side=bottom]:animate-slideUpAndFade
  data-[state=open]:data-[side=left]:animate-slideRightAndFade
  `;
  const twShadow = `
  shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)]
  focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),.5]
 `;

  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer data-[state=open]:border-slate-600 border-4 rounded-full transition-colors">
        {children}
      </PopoverTrigger>
      <PopoverContent
        className={`rounded  w-[260px] bg-slate-900
        will-change-[transform,opacity] ${twAnimation} ${twShadow}`}
        sideOffset={5}
      >
        <AvatarPopoverContent />
      </PopoverContent>
    </Popover>
  );
};

export default AvatarPopover;
