import { GoFileDirectory } from 'react-icons/go';
import { MdComputer } from 'react-icons/md';

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
  {
    title: '文档',
    icon: <MdComputer className=" w-6 text-[16px] mr-3" />,
    link: PATHS.MAIN_TEMPLATES,
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
    linkText: 'link1',
    linkUrl: 'https://www.baidu.com',
    linkDesc: 'desc1',
  },
  {
    linkText: 'lin2',
    linkUrl: 'https://www.baidu.com',
    linkDesc: 'desc1',
  },
  {
    linkText: 'lin3',
    linkUrl: 'https://www.baidu.com',
    linkDesc: 'desc3',
  },
];
