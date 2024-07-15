import { v4 as uuidv4 } from 'uuid';

export interface FilerInterface {
  handler: FileSystemFileHandle;
  filename: string;
  kind: string;
  path: string;
  value: string;
  id: string;
}

export interface DirectoryInterface {
  handler: FileSystemDirectoryHandle;
  filename: string;
  kind: string;
  path: string;
  children: Array<FilerInterface | DirectoryInterface>;
  id: string;
}

export const DirectoryKeySet = new Set<string>();
export const DirectoryMap = new Map<string, DirectoryInterface>();
export let curDirectory: null | DirectoryInterface = null;

export const getDirectory = async (id?: string): Promise<DirectoryInterface | null> => {
  if (id && DirectoryKeySet.has(id)) {
    return DirectoryMap.get(id) as DirectoryInterface;
  }

  let directoryHandler: FileSystemDirectoryHandle | null = null;

  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    directoryHandler = await window.showDirectoryPicker({
      startIn: id ? DirectoryMap.get(id)?.handler : undefined,
      mode: 'readwrite',
    });
  } catch (error) {
    console.error('Error picking directory:', error);
  }

  if (directoryHandler) {
    const id = uuidv4();
    DirectoryKeySet.add(id);

    const directory = await getDirectoryHandlerDeep(directoryHandler);
    DirectoryMap.set(id, directory);
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
  directoryHandler: FileSystemDirectoryHandle | FileSystemFileHandle,
  path: string = '',
  children?: (FilerInterface | DirectoryInterface)[],
): Promise<FilerInterface | DirectoryInterface> => {
  const id = uuidv4();
  const obj = {
    handler: directoryHandler,
    filename: directoryHandler.name,
    kind: directoryHandler.kind,
    path,
    ...(directoryHandler.kind === 'directory'
      ? { children: children || [], id }
      : { value: await getFileContent(await directoryHandler.getFile()), id }),
  };

  return obj as FilerInterface | DirectoryInterface;
};

export const getDirectoryHandlerDeep = async (
  directoryHandler: FileSystemDirectoryHandle,
  path: string = '',
): Promise<DirectoryInterface> => {
  path = path ? `${path}/${directoryHandler.name}` : directoryHandler.name;

  const children: (FilerInterface | DirectoryInterface)[] = [];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error

  for await (const handle of directoryHandler.values()) {
    if (handle.kind === 'directory' && handle.name !== 'node_modules') {
      children.push(await getDirectoryHandlerDeep(handle, path));
    } else if (handle.kind === 'file') {
      children.push(await directoryDataFormatter(handle, path));
    }
  }

  return directoryDataFormatter(directoryHandler, path, children) as unknown as DirectoryInterface;
};
