export interface FilerInterface {
  handler: FileSystemFileHandle;
  name: string;
  kind: string;
  path: string;
  content: string;
}

export interface DirectoryInterface {
  handler: FileSystemDirectoryHandle;
  name: string;
  kind: string;
  path: string;
  children: Array<FilerInterface | DirectoryInterface>;
}

export const DirectoryKeySet = new Set(); // 预留对象，多文件夹加载可用
export const DirectoryMap = new Map(); // 预留对象，多文件夹加载可用
export let curDirectory: null | FilerInterface | DirectoryInterface = null; // 当前目录

export const getDirectory = async (
  id?: string | symbol,
): Promise<DirectoryInterface | FilerInterface | null> => {
  if (DirectoryKeySet.has(id)) {
    return DirectoryMap.get(id);
  }
  let DirectoryHandler: FileSystemFileHandle | FileSystemDirectoryHandle | null;
  try {
    DirectoryHandler = await window.showDirectoryPicker({
      id,
      mode: "readwrite",
    });
  } catch (error) {
    DirectoryHandler = null;
  }
  if (DirectoryHandler !== null) {
    DirectoryKeySet.add(id);
    const directory = await getDirectoryHandlerDeep(DirectoryHandler);
    DirectoryMap.set(id, directory);
    curDirectory = directory;
    return directory;
  }

  return null;
};

export const getFileContent = (file: File): Promise<string> => {
  return new Promise(resolve => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      resolve(<string>fileReader.result);
    };
    fileReader.readAsText(file, "utf-8");
  });
};

export const directoryDataFormatter = async <
  T extends FileSystemDirectoryHandle | FileSystemFileHandle,
>(
  directoryHandler: T,
  path: string = "",
  children: (FilerInterface | DirectoryInterface)[] = [],
): Promise<
  T extends FileSystemDirectoryHandle ? FilerInterface : DirectoryInterface
> => {
  const obj: any = {
    handler: directoryHandler,
    name: directoryHandler.name,
    kind: directoryHandler.kind,
    path,
  };

  if (
    (directoryHandler.kind === "directory" &&
      directoryHandler.name !== "node_modules") ||
    (directoryHandler.kind === "directory" &&
      directoryHandler.name !== "node_modules")
  ) {
    obj.children = children;
  } else if (directoryHandler.kind === "file") {
    obj.content =
      (await getFileContent(await directoryHandler.getFile())) || "";
  }
  return obj;
};

export const getDirectoryHandlerDeep = async (
  directoryHandler: FileSystemDirectoryHandle | FileSystemFileHandle,
  path: string = "",
): Promise<DirectoryInterface | FilerInterface> => {
  path = `${path}/${directoryHandler.name}`;
  if (directoryHandler.kind === "file") {
    return await directoryDataFormatter(directoryHandler, path);
  }

  const children = [];
  for await (const handler of directoryHandler.values()) {
    if (
      (handler.kind === "directory" && handler.name === "node_modules") ||
      (handler.kind === "directory" && handler.name === ".git")
    ) {
      continue;
    }

    children.push(await getDirectoryHandlerDeep(handler, path));
  }
  return await directoryDataFormatter(directoryHandler, path, children);
};
