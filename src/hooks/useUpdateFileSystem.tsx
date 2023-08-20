import { useEffect } from "react";

import { readFileSystem, webcontainerInstancePromise } from "@/webContainer";
import { useAppDispatch } from "@/store";
import { changeTreeData } from "@/store/modules/code";

export function useRenderFileSystem() {
  const syncFileSystemToUI = useUpdateFileSystem();

  useEffect(() => {
    const sync = async () => {
      await webcontainerInstancePromise;

      syncFileSystemToUI();
    };

    sync();
  }, []);
}

export function useUpdateFileSystem() {
  const dispatch = useAppDispatch();

  const syncFileSystemToUI = async () => {
    const result = await readFileSystem();

    dispatch(changeTreeData({ treeData: result }));
  };

  return syncFileSystemToUI;
}
