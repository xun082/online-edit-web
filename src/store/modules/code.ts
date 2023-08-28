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
  height: number; // 文件列表滚动高度
}

interface changeFileModalStatusTypes {
  open: boolean;
  type?: ActionTypeEnum;
}

interface changeTreeDataTypes {
  treeData: DataNode[];
  key?: string;
  path?: string;
}

const initialState = {
  path: "",
  formatPath: "",
  fileModalIsOpen: false,
  fileControlType: undefined,
  treeData: [],
  selectedKey: "",
  height: 500,
} as codeTypes;

const codeSlice = createSlice({
  name: "code",
  initialState,
  reducers: {
    changePath(state, action): void {
      const { payload } = action;

      state.path = payload;
      state.formatPath = routerFormat(payload);
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
  },
  extraReducers: () => {},
});

export const {
  changePath,
  changeFileModalStatus,
  changeTreeData,
  changeFormatPathValue,
  changeSelectedKey,
  changeHight,
} = codeSlice.actions;

export default codeSlice.reducer;
