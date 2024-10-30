import { GoFileDirectory } from 'react-icons/go';

import { PATHS } from './constants';

interface RouterData {
  title: string;
  icon: React.ReactNode;
  link: string;
}

export const RouterDataList: RouterData[] = [
  {
    title: '项目',
    icon: <GoFileDirectory className=" w-6 text-[16px] mr-3" />,
    link: PATHS.MAIN_DASHBOARD,
  },
];

export const TemplateCardData = [
  {
    title: 'Node',
    icon: '/node.svg',
  },
  {
    title: 'Vue3',
    icon: '/vue.svg',
  },
  {
    title: 'React',
    icon: '/react.svg',
  },
];

export const LinkCardData = [
  {
    linkText: 'create-neat',
    linkUrl: 'https://github.com/xun082/create-neat',
    linkDesc: '基于 PNPM 和 Turborepo 的前端脚手架，旨在快速为用户创建各种类型的项目',
  },
  {
    linkText: 'create-ai-toolkit',
    linkUrl: 'https://github.com/xun082/create-ai-toolkit',
    linkDesc:
      'AI驱动的前端开发工具，集成组件和钩子生成、自动提交信息和代码审查，提升开发效率和代码质量',
  },
  {
    linkText: 'online-edit-server',
    linkUrl: 'https://github.com/xun082/online-edit-server',
    linkDesc: '在线编辑器的后端',
  },
];
