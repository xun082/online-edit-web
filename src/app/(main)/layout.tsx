'use client';

import React, { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useAnimation } from 'framer-motion';

import { Header } from '@/components/main/header';
import Sider from '@/components/main/sider';
import { PATHS } from '@/utils';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const controls = useAnimation();
  const pathname = usePathname();

  useEffect(() => {
    controls.start({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { ease: 'easeInOut', duration: 1 },
    });
  }, [pathname, controls]);

  if (pathname === PATHS.LOGIN) {
    // 登录页不需要layout
    return children;
  }

  return (
    <div className=" flex flex-col w-[100vw] h-[100vh] overflow-hidden">
      <div className=" w-[100vw] h-[5vh] bg-[#24262B] flex items-center">
        <Header />
      </div>
      <div className=" flex-1 flex flex-row bg-red-400 w-[100vw]">
        <div className=" h-full w-[18vw] bg-gray-400">
          <Sider />
        </div>
        <div className=" h-full w-[5px] bg-[#1f2023]"></div>
        <div className=" h-full flex-1 bg-black">
          {' '}
          <motion.div
            key={pathname}
            className=" overflow-y-scroll h-full hide-scrollbar"
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={controls}
            transition={{ ease: 'easeInOut', duration: 1 }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
