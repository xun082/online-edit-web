import { useMemo } from "react";
import { DataNode } from "antd/es/tree";

import { findNodeByKey } from "@/utils/file";

export default function useMemoSelectedNode(
  selectedKey: string,
  treeData: any,
) {
  const selectedNode = useMemo(
    () => findNodeByKey(selectedKey, treeData),
    [treeData, findNodeByKey, selectedKey],
  );

  return selectedNode;
}
