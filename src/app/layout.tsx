'use client';

import { Inter } from 'next/font/google';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import NextProcessLoader from '@/components/nextTopLoader';
import { PATHS, PATHS_SKIPPED_AUTH, STORAGE_KEY_AUTH } from '@/utils/constants';
import { useAuthStore } from '@/store/authStore';

import './globals.css';
import './xterm.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setAuth, getAuth } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 首先，从zustand获取登录信息
    let auth = getAuth();

    // TODO 使用localstorage存放登录信息不合适
    // 如果zustand中没有登录信息，则从localStorage中读取
    if (!auth.access_token) {
      const storagedAuth = localStorage.getItem(STORAGE_KEY_AUTH);

      if (storagedAuth) {
        // 将localStorage中的登录信息同步到zustand
        auth = JSON.parse(storagedAuth);

        setAuth(auth);
      }
    }

    if (!PATHS_SKIPPED_AUTH.includes(pathname) && !auth.access_token) {
      // 当前路由需登录但未登录时，跳转到登录页
      // FIXME: 跳转时，会短暂显示目标页，再跳转到登录页
      router.push(`${PATHS.LOGIN}?redirect=${pathname}`);
    }
  }, [pathname]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextProcessLoader />
        {children}
      </body>
    </html>
  );
}
