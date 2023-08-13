import EditorTitleObjects from "./edit-title";

// 模板
import VueLogo from "@/assets/images/vue.png";
import ReactLogo from "@/assets/images/react.png";
import NodeLogo from "@/assets/images/node.png";
import GoLogo from "@/assets/images/go.png";
import AddLogo from "@/assets/images/add.svg";

interface TemplateType {
  src: string;
  alt: string;
  index: number;
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
