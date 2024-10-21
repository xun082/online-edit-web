import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { FaFileAlt } from 'react-icons/fa';

import { useTaskStore } from '@/store/taskStore';
import { cn } from '@/utils';
import { Task } from '@/store/taskStore';

type TaskListProps = {
  tasks: Task[];
};

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(tasks);
  const { curTask, setCurTask } = useTaskStore();
  const handleSwitchTask = (taskId: number) => {
    setCurTask(tasks.find((task) => task.id === taskId) || tasks[0]);
  };

  useEffect(() => {
    const filtered = tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredTasks(filtered);
  }, [searchQuery, tasks]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <aside className=" relative flex flex-col p-2 pt-4">
      <div className=" relative mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="关键字搜索....."
          className="w-full border border-[#7b7e86]/60 text-[12px] h-6 pl-6 py-[13px] rounded-sm focus:outline-none focus:border-[#7b7e86]"
        />
        <CiSearch className=" absolute top-[50%] left-[5px] translate-y-[-50%] text-[#7b7e86]" />
      </div>
      <div className=" flex items-center justify-center flex-col gap-y-1 overflow-y-auto scrollbar-none">
        {filteredTasks.map((task) => (
          <div
            onClick={() => handleSwitchTask(task.id)}
            key={task.id}
            className={cn(
              ' flex items-center text-xs font-medium w-full hover:bg-[#343740] transition-colors py-1 px-2 rounded-sm cursor-pointer',
              curTask?.id === task.id && 'bg-[#343740]',
            )}
          >
            <FaFileAlt className=" mr-2" /> {task.title}
          </div>
        ))}
      </div>
    </aside>
  );
};
