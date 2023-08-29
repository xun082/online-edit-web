import React from "react";
import {
  SnippetsOutlined,
  SearchOutlined,
  ApiOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { labelType } from "@/types";

interface editorAsideType {
  icon: any;
  label: labelType;
}

export const editorAsideTop: Array<editorAsideType> = [
  {
    icon: <SnippetsOutlined rev={undefined} />,
    label: "file",
  },
  {
    icon: <SearchOutlined rev={undefined} />,
    label: "search",
  },
  {
    icon: <ApiOutlined rev={undefined} />,
    label: "port",
  },
  {
    icon: <SettingOutlined rev={undefined} />,
    label: "setting",
  },
];
