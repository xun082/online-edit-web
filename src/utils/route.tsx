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
    icon: 'https://lf-cdn.marscode.com.cn/obj/eden-cn/ljhwz_lkpkbvsj/ljhwZthlaukjlkulzlp/project_template/prod/e78a9920fc913dcd1b339f0ee1493e429fb237c8/images/native_nodejs/icon.svg',
  },
  {
    title: 'Vue3',
    icon: 'https://lf-cdn.marscode.com.cn/obj/eden-cn/ljhwz_lkpkbvsj/ljhwZthlaukjlkulzlp/project_template/prod/e78a9920fc913dcd1b339f0ee1493e429fb237c8/images/native_nodejs/icon.svg',
  },
  {
    title: 'React',
    icon: 'https://lf-cdn.marscode.com.cn/obj/eden-cn/ljhwz_lkpkbvsj/ljhwZthlaukjlkulzlp/project_template/prod/e78a9920fc913dcd1b339f0ee1493e429fb237c8/images/native_golang/icon.svg',
  },
];

export const LinkCardData = [
  {
    linkText: 'Node1',
    linkUrl: 'https://www.baidu.com',
    linkDesc: 'ai帮助你学习前端后端运维安全',
  },
  {
    linkText: 'Node2',
    linkUrl: 'https://www.baidu.com',
    linkDesc: 'ai帮助你学习前端后端运维安全',
  },
  {
    linkText: 'Node3',
    linkUrl: 'https://www.baidu.com',
    linkDesc: 'ai帮助你学习前端后端运维安全',
  },
];
