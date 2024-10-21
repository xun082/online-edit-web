import { create } from 'zustand';

import { TASKS } from '@/utils';

export type Task = {
  id: number;
  title: string;
  desc: string;
};

// 定义 store 的状态接口
interface TaskState {
  totalTask: Task[];
  curTask: Task | null;
}

// 定义操作 store 的动作接口
interface TaskActions {
  setCurTask: (task: Task) => void;
}

// 创建 store
export const useTaskStore = create<TaskState & TaskActions>((set) => ({
  totalTask: [...TASKS], // 初始化为一个空数组
  curTask: TASKS[0], // 初始化为 null
  setCurTask: (task: Task) => set((state) => ({ ...state, curTask: task })),
}));
