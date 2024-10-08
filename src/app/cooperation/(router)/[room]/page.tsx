'use client';

import { TASKS } from '@/utils';
import { CooperationHeader } from '@/components/cooperation/header';
import { TaskList } from '@/components/cooperation/taskList';
import { TaskDescription } from '@/components/cooperation/taskDescription';
import { CooperationEditor } from '@/components/cooperation/cooperationEditor';

interface CooperationPageProps {
  params: any;
}

export default function CooperationPage({ params }: CooperationPageProps) {
  return (
    <div className=" flex flex-col w-[100vw] h-[100vh] overflow-hidden">
      <div className=" w-full h-[5vh] flex items-center justify-around bg-[#24262b]">
        <CooperationHeader roomId={params.room} roomInfo={{}} />
      </div>
      <div className=" flex-1 flex w-full h-full overflow-hidden bg-[#24262b]">
        <div className=" flex-[1.3] flex h-full bg-[#202327]">
          <TaskList tasks={TASKS} />
        </div>
        <div className=" flex-[6] h-full">
          <TaskDescription />
        </div>
        <div className=" flex-[5] h-full ml-1">
          <CooperationEditor roomId={params.room} />
        </div>
      </div>
    </div>
  );
}
