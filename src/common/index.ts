import EditorTitleObjects from "./edit-title";

// 模板
import VueLogo from "@/assets/images/vue.png";
import ReactLogo from "@/assets/images/react.png";
import NodeLogo from "@/assets/images/node.png";
import GoLogo from "@/assets/images/go.png";
import AddLogo from "@/assets/images/add.svg";
import { getDirectory } from "@/hooks/useLocalDirectory";

interface TemplateType {
  src: string;
  alt: string;
  index: number;
  onClick?: () => boolean | Promise<boolean>; // Do not jump with false
}

export const Template: Array<TemplateType> = [
  {
    src: AddLogo,
    alt: "新建空白文档",
    index: 1,
  },
  {
    src: VueLogo,
    alt: "Vue",
    index: 2,
  },
  {
    src: ReactLogo,
    alt: "React",
    index: 3,
  },
  {
    src: NodeLogo,
    alt: "node",
    index: 4,
  },
  {
    src: GoLogo,
    alt: "go",
    index: 5,
  },
  {
    src: GoLogo,
    alt: "打开文件夹",
    index: 6,
    onClick: async () => {
      const dir = await getDirectory()
      if (dir === null) {
        return false;
      }
      return true
    }
  },
];

export { EditorTitleObjects };

export const data = [
  {
    isFolder: true,
    name: "public",
    children: [
      {
        isFolder: false,
        name: "index.html",
      },
    ],
  },
  {
    isFolder: true,
    name: "src",
    children: [
      {
        isFolder: true,
        name: "components",
        children: [
          {
            isFolder: true,
            name: "home",
            children: [
              {
                isFolder: false,
                name: "Home.js",
              },
            ],
          },
        ],
      },
      {
        isFolder: false,
        name: "App.js",
      },
    ],
  },
];
