import React from "react";
import type { DataNode } from "antd/es/tree";
export * from './file.d'

/* eslint-disable no-unused-vars */
export type languageType = "html" | "css" | "javascript";
export type labelType = "search" | "setting" | "file" | "port";

export interface LinkData {
  uuid: string;
  src: string;
}

export enum ActionTypeEnum {
  Create_File = "Create_File",
  Create_Dir = "Create_Dir",

  Create_Root_File = "Create_Root_File",
  Create_Root_Dir = "Create_Root_Dir",

  Del = "Del",

  Rename = "Rename",
}

export const ActionTypeEnumMap = new Map([
  [ActionTypeEnum.Rename, "重命名"],
  [ActionTypeEnum.Del, "删除文件"],
  [ActionTypeEnum.Create_Dir, "创建文件夹"],
  [ActionTypeEnum.Create_File, "创建文件"],
  [ActionTypeEnum.Create_Root_Dir, "创建根文件夹"],
  [ActionTypeEnum.Create_Root_File, "创建根文件"],
]);

export interface actionIconContextType {
  activeIconType: labelType;
  setActiveIconType: React.Dispatch<React.SetStateAction<labelType>>;
}

export interface treeDataContextType {
  treeData: DataNode[];
  setTreeData: React.Dispatch<React.SetStateAction<DataNode[]>>;
}

export type prettierFileNameType =
  | ".prettierrc"
  | ".prettierrc.js"
  | "prettier.config.js"
  | ".prettierrc.json"
  | ".prettierrc.yml";

export enum UserCustomConfig {
  GLOBAL_PRETTIER_CONFIG = "global-prettier-config.json",
}
