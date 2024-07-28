import { v4 as uuidv4 } from 'uuid';

export interface FilerInterface {
  handler?: FileSystemFileHandle;
  filename: string;
  kind: 'file';
  path: string;
  value: string;
  id: string;
}

export interface DirectoryInterface {
  handler?: FileSystemDirectoryHandle;
  filename: string;
  kind: 'directory';
  path: string;
  children: Array<FilerInterface | DirectoryInterface>;
  id: string;
}

export const DirectoryKeySet = new Set<string>();
export const DirectoryMap = new Map<string, DirectoryInterface>();
export let curDirectory: DirectoryInterface | null = null;

export const getDirectory = async (id?: string): Promise<DirectoryInterface | null> => {
  if (id && DirectoryKeySet.has(id)) {
    return DirectoryMap.get(id) || null;
  }

  let directoryHandler: FileSystemDirectoryHandle | null = null;

  try {
    // 使用类型断言处理实验性 API
    directoryHandler = await (window as any).showDirectoryPicker({
      startIn: id ? DirectoryMap.get(id)?.handler : undefined,
      mode: 'readwrite',
    });
  } catch (error) {
    console.error('Error picking directory:', error);
  }

  if (directoryHandler) {
    const directory = await getDirectoryHandlerDeep(directoryHandler);
    const newId = uuidv4();
    DirectoryKeySet.add(newId);
    DirectoryMap.set(newId, directory);
    curDirectory = directory;

    return directory;
  }

  return null;
};

export const getFileContent = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') {
        resolve(fileReader.result);
      } else {
        reject(new Error('FileReader result is not a string'));
      }
    };

    fileReader.onerror = reject;
    fileReader.readAsText(file, 'utf-8');
  });
};

export const directoryDataFormatter = async (
  handler: FileSystemDirectoryHandle | FileSystemFileHandle,
  path: string = '',
  children?: (FilerInterface | DirectoryInterface)[],
): Promise<FilerInterface | DirectoryInterface> => {
  const id = uuidv4();

  if (handler.kind === 'directory' && handler.name !== '.git' && handler.name !== '.vscode') {
    return {
      filename: handler.name,
      kind: 'directory',
      path: `/${path}`,
      children: children || [],
      id,
    };
  } else {
    const fileHandler = handler as FileSystemFileHandle;
    const value = await getFileContent(await fileHandler.getFile());

    return {
      filename: handler.name,
      kind: 'file',
      path: `/${path}/${handler.name}`,
      value,
      id,
    };
  }
};

export const getDirectoryHandlerDeep = async (
  directoryHandler: FileSystemDirectoryHandle,
  path: string = '',
): Promise<DirectoryInterface> => {
  path = path ? `${path}/${directoryHandler.name}` : directoryHandler.name;

  const children: (FilerInterface | DirectoryInterface)[] = [];

  for await (const handle of (
    directoryHandler as any
  ).values() as AsyncIterable<FileSystemHandle>) {
    if (
      handle.kind === 'directory' &&
      handle.name !== 'node_modules' &&
      handle.name !== '.git' &&
      handle.name !== '.vscode'
    ) {
      children.push(await getDirectoryHandlerDeep(handle as FileSystemDirectoryHandle, path));
    } else if (handle.kind === 'file') {
      children.push(await directoryDataFormatter(handle as FileSystemFileHandle, path));
    }
  }

  return directoryDataFormatter(directoryHandler, path, children) as Promise<DirectoryInterface>;
};

export const clearCurDirectory = () => {
  curDirectory = null;
};
