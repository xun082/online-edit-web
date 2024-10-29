'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { TASKS } from '@/utils';
import { CooperationHeader } from '@/components/cooperation/header';
import { TaskList } from '@/components/cooperation/taskList';
import { TaskDescription } from '@/components/cooperation/taskDescription';
import { CooperationEditor } from '@/components/cooperation/cooperationEditor';

interface CooperationPageProps {
  params: any;
}

async function searchUserByEmail(errCb: () => void) {
  const storedToken = localStorage.getItem('ONLINE_EDIT_AUTH');
  const token = storedToken ? JSON.parse(storedToken).access_token : null;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      localStorage.removeItem('ONLINE_EDIT_AUTH');
      errCb();
    }

    const res = await response.json();
    console.log('searchUserByEmail res', res);

    return res.data;
  } catch (error) {
    console.error('Error:', error);

    return null;
  }
}

export default function CooperationPage({ params }: CooperationPageProps) {
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchUserInfo() {
      const user = await searchUserByEmail(() => router.push('/login?redirect=/dashboard'));
      setUserInfo(user);
    }

    fetchUserInfo();
  }, []);

  if (!userInfo) return null;

  return (
    <div className="flex flex-col w-[100vw] h-[100vh] overflow-hidden">
      <div className="w-full h-[5vh] flex items-center justify-around bg-[#24262b]">
        <CooperationHeader roomId={params.room} roomInfo={userInfo || {}} />
      </div>
      <div className="flex-1 flex w-full h-full overflow-hidden bg-[#24262b]">
        <div className="flex-[1.3] flex h-full bg-[#202327]">
          <TaskList tasks={TASKS} />
        </div>
        <div className="flex-[6] h-full">
          <TaskDescription />
        </div>
        <div className="flex-[5] h-full ml-1">
          <CooperationEditor userInfo={userInfo} roomId={params.room} />
        </div>
      </div>
    </div>
  );
}
