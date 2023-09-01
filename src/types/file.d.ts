export interface EmptyFileInterface {
  name: string;
  kind: 'directory' | 'file';
  path: string;
}

export interface FileInterface extends EmptyFileInterface {
  content: string;
}

export interface FilerInterface extends FileInterface {
  handler: FileSystemFileHandle;
}

export interface DirectoryInterface extends EmptyFileInterface {
  children: Array<FileInterface | DirectoryInterface>;
}

export interface DirectorySuperInterface extends EmptyFileInterface {
  handler: FileSystemDirectoryHandle;
  children: Array<FilerInterface | DirectorySuperInterface>;
}

export function isDirectory (directory: any): directory is DirectoryInterface | DirectorySuperInterface {
  return directory.kind === 'directory';
}

export function isFiler (file: any): file is FilerInterface {
  return file.kind === 'file';
}