import React, { createContext } from "react";
import type { DataNode } from "antd/es/tree";

export interface treeDataContextType {
  treeData: DataNode[];
  setTreeData: React.Dispatch<React.SetStateAction<DataNode[]>>;
}

const TreeDataContext = createContext<treeDataContextType | undefined>(
  undefined,
);

export default TreeDataContext;
