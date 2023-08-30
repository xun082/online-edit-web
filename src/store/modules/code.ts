import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { DataNode } from "antd/es/tree";

import { ActionTypeEnum } from "@/types";
import { routerFormat, findNodeByKey } from "@/utils/file";

interface codeTypes {
  path: string;
  fileModalIsOpen: boolean;
  fileControlType: ActionTypeEnum | undefined;
  treeData: DataNode[];
  formatPath: string;
  selectedKey: string;
  isLeaf: boolean;
  height: number; // 文件列表滚动高度
  isWebContainerFile: boolean; // s是否是webcontainer的文件,用于区分是从文件中获取内容还是从本地
  globalFileConfigPath: string;
}

interface changeFileModalStatusTypes {
  open: boolean;
  type?: ActionTypeEnum;
}

interface changeFileInfoTypes {
  path: string;
  isLeaf: boolean;
}

interface changeTreeDataTypes {
  treeData: DataNode[];
  key?: string;
  path?: string;
}

interface GlobalFileConfigPathType {
  path: string;
  isWebContainerFile: boolean;
}

const initialState = {
  path: "",
  formatPath: "",
  fileModalIsOpen: false,
  fileControlType: undefined,
  treeData: [],
  selectedKey: "",
  isLeaf: false,
  height: 500,
  isWebContainerFile: true,
  globalFileConfigPath: "",
} as codeTypes;

const codeSlice = createSlice({
  name: "code",
  initialState,
  reducers: {
    changeFileInfo(state, action: PayloadAction<changeFileInfoTypes>): void {
      const { payload } = action;

      state.path = payload.path;
      state.isLeaf = payload.isLeaf;
      state.formatPath = routerFormat(payload.path);
      state.isWebContainerFile = true;
    },
    changeFormatPathValue(state, action): void {
      const { payload } = action;

      state.formatPath = payload;
    },
    changeFileModalStatus(
      state,
      action: PayloadAction<changeFileModalStatusTypes>,
    ): void {
      const {
        payload: { open, type },
      } = action;

      state.fileModalIsOpen = open;
      state.fileControlType = type;
    },
    changeTreeData(state, action: PayloadAction<changeTreeDataTypes>) {
      const {
        payload: { treeData, key, path },
      } = action;
      console.log(treeData);

      const newData = [...treeData];
      console.log(newData === treeData);

      if (key) {
        const selectedNode = findNodeByKey(key, newData);

        selectedNode!.title = path;
      }

      state.treeData = newData;
    },
    changeSelectedKey(state, action: PayloadAction<string>) {
      const { payload } = action;
      state.selectedKey = payload;
    },
    changeHight(state, action: PayloadAction<number>) {
      const { payload } = action;
      state.height = payload;
    },
    changeGlobalFileConfigPath(
      state,
      action: PayloadAction<GlobalFileConfigPathType>,
    ) {
      const { payload } = action;

      state.globalFileConfigPath = payload.path;
      state.isWebContainerFile = payload.isWebContainerFile;
      state.path = "";
      state.formatPath = "";
    },
  },
  extraReducers: () => {},
});

export const {
  changeFileInfo,
  changeFileModalStatus,
  changeTreeData,
  changeFormatPathValue,
  changeSelectedKey,
  changeHight,
  changeGlobalFileConfigPath,
} = codeSlice.actions;

export default codeSlice.reducer;
