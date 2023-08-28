import type { DataNode } from "antd/es/tree";

export const getNodePath = (
  key: string,
  data: DataNode[],
  path: string = "",
): string => {
  for (const node of data) {
    if (node?.key === key) return `${path}/${node.title}`;

    const rsp = getNodePath(key, node?.children ?? [], `${path}/${node.title}`);

    if (rsp.length) return rsp;
  }

  return "";
};

export const findNodeByKey = (
  key: string,
  data: DataNode[],
): DataNode | null => {
  for (const node of data) {
    if (node?.key === key) return node;

    const rsp = findNodeByKey(key, node?.children ?? []);

    if (rsp) return rsp;
  }

  return null;
};

export const routerFormat = (path: string): string => {
  const pathArray = path.split("/");
  const newPath = pathArray[pathArray.length - 1];
  return newPath;
};

export const getFileSuffix = (fileName: any) => {
  return fileName.slice(fileName.lastIndexOf(".") + 1) || fileName;
};
