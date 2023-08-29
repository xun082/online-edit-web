// 模板
import VueLogo from "@/assets/images/vue.png";
import ReactLogo from "@/assets/images/react.png";
import NodeLogo from "@/assets/images/node.png";
import GoLogo from "@/assets/images/go.png";
import AddLogo from "@/assets/images/add.svg";
import { getDirectory } from "@/utils/getLocalDirectory";
// 文件图标
import javascript from "@/assets/images/file/JavaScript.svg";
import css from "@/assets/images/file/css.svg";
import git from "@/assets/images/file/git.svg";
import html from "@/assets/images/file/html.svg";
import jsx from "@/assets/images/file/jsx.svg";
import markdown from "@/assets/images/file/markdown.svg";
import json from "@/assets/images/file/json.svg";
import ts from "@/assets/images/file/ts.svg";
import fileDir from "@/assets/images/file/FileDir.svg";
import prettier from "@/assets/images/file/prettier.svg";
import yaml from "@/assets/images/file/yaml.svg";
import eslint from "@/assets/images/file/eslint.svg";
import image from "@/assets/images/file/image.svg";
import scss from "@/assets/images/file/scss.svg";
import less from "@/assets/images/file/less.svg";
import vue from "@/assets/images/file/vue.svg";

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
      const dir = await getDirectory();
      if (dir === null) {
        return false;
      }
      return true;
    },
  },
];

export const fileTypeIconMap: Map<string, string> = new Map([
  ["js", javascript],
  ["ts", ts],
  ["jsx", jsx],
  ["tsx", jsx],
  ["json", json],
  ["md", markdown],
  ["html", html],
  ["gitignore", git],
  ["css", css],
  ["scss", scss],
  ["less", less],
  ["vue", vue],
  ["dir", fileDir],
  ["prettierignore", prettier],
  ["prettierrc", prettier],
  ["yaml", yaml],
  ["eslintignore", eslint],
  ["png", image],
  ["jpeg", image],
  ["ico", image],
]);
