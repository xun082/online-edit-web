import { useMemo } from "react";
import { DataNode } from "antd/es/tree";

import { findNodeByKey } from "@/utils/file";
import { useAppSelector } from "@/store";

export default function useMemoSelectedNode(treeData: DataNode[]) {
  const { selectedKey } = useAppSelector(state => state.code);

  const selectedNode = useMemo(
    () => findNodeByKey(selectedKey, treeData),
    [treeData, findNodeByKey, selectedKey],
  );

  return selectedNode;
}
