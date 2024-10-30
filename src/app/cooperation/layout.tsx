'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import { PATHS, STORAGE_KEY_AUTH } from '@/utils/constants';
import { useAuthStore } from '@/store/authStore';

export default function CooperationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setAuth, getAuth } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    let auth = getAuth();

    if (!auth.access_token) {
      const storagedAuth = localStorage.getItem(STORAGE_KEY_AUTH);

      if (storagedAuth) {
        auth = JSON.parse(storagedAuth);
        setAuth(auth);
      }
    }

    if (!auth.access_token) {
      router.push(`${PATHS.LOGIN}?redirect=${pathname}`);
    }
  }, [pathname]);

  return <div className=" flex w-[100vw] h-[100vh] overflow-hidden">{children}</div>;
}
