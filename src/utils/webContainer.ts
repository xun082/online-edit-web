import { FileSystemTree, WebContainer } from "@webcontainer/api";
import { DataNode } from "antd/es/tree";
import { v4 as uuid } from "uuid";

import { routerFormat } from "./file";
import { PRETTIER_FORMAT_PATH } from "./content";

import { DirectoryInterface, FileInterface } from "@/types";

export const WebContainerFileSystemTreeSavePoint =
  "Web_Container_File_System_Tree_Save_Point";

export function createDir(path: string, webcontainerInstance: WebContainer) {
  return webcontainerInstance?.fs.mkdir(path, {
    recursive: true,
  });
}

export function writeFile(
  path: string,
  content: string | Uint8Array,
  webcontainerInstance: WebContainer,
) {
  return webcontainerInstance?.fs.writeFile(path, content, {
    encoding: "utf-8",
  });
}

export function createFile(path: string, webcontainerInstance: WebContainer) {
  return writeFile(path, "", webcontainerInstance);
}

export async function writeDirByLocal(
  dir: any,
  webcontainerInstance: WebContainer,
) {
  if (dir.kind === "file") {
    await writeFile(dir.path, dir.content ?? "", webcontainerInstance);
    return;
  }
  await createDir(dir.path, webcontainerInstance);
  for (const file of dir.children) {
    await writeDirByLocal(file, webcontainerInstance);
  }
}

export function rm(path: string, webcontainerInstance: WebContainer) {
  const userProjectPrettierConfig = localStorage.getItem(
    PRETTIER_FORMAT_PATH,
  ) as string;

  if (
    userProjectPrettierConfig !== null &&
    userProjectPrettierConfig.split("/")[0] === routerFormat(path)
  ) {
    localStorage.removeItem(PRETTIER_FORMAT_PATH);
  }

  return webcontainerInstance?.fs.rm(path, { force: true, recursive: true });
}

export async function readFile(
  path: string,
  webcontainerInstance: WebContainer,
) {
  const u8 = await webcontainerInstance?.fs.readFile(path, "utf-8");
  return u8;
}

export async function readLocalTypeFile (
  webcontainerInstance: WebContainer,
  path: string,
): Promise<FileInterface> {
  return {
    name: path.split('/').splice(-1, 1)?.[0] || '',
    path,
    content: await webcontainerInstance?.fs.readFile(path, "utf-8"),
    kind: 'file'
  }
}

export async function renameFile(
  path: string,
  name: string,
  webcontainerInstance: WebContainer,
) {
  const content = await readFile(path, webcontainerInstance);
  await rm(path, webcontainerInstance);

  const newPath = [...path.split("/").slice(0, -1), name].join("/");

  await writeFile(newPath, content, webcontainerInstance);
}

export async function readFileSystem(
  webcontainerInstance: WebContainer,
  path = "/",
): Promise<DataNode[]> {
  const dirs = await webcontainerInstance?.fs.readdir(path, {
    withFileTypes: true,
  });

  return Promise.all(
    dirs.map(async item => ({
      key: uuid(),
      title: item.name,
      isLeaf: item.isFile(),
      children: item.isDirectory()
        ? await readFileSystem(webcontainerInstance, `${path}/${item.name}`)
        : undefined,
    })),
  );
}

async function readAsFileSystemTree(
  webcontainerInstance: WebContainer,
  path = "/",
): Promise<FileSystemTree> {
  const dirs = await webcontainerInstance?.fs.readdir(path, {
    withFileTypes: true,
  });

  const arrayTree = await Promise.all(
    dirs
      .filter(item => !(item.isDirectory() && item.name === "node_modules"))
      .map(async item => ({
        name: item.name,
        contents: item.isFile()
          ? await readFile(`${path}/${item.name}`, webcontainerInstance)
          : undefined,
        directory: item.isDirectory()
          ? await readAsFileSystemTree(
              webcontainerInstance,
              `${path}/${item.name}`,
            )
          : undefined,
      })),
  );

  return arrayTree.reduce(
    (tree, { name, contents, directory }) => ({
      ...tree,
      [name]: directory
        ? {
            directory,
          }
        : {
            file: { contents },
          },
    }),
    {},
  );
}

export async function readLocalTypeFileTree(webcontainerInstance: WebContainer, path: string = "/"): Promise<DirectoryInterface> {
  const dirs = await webcontainerInstance?.fs.readdir(path, {
    withFileTypes: true,
  });

  const children: (FileInterface | DirectoryInterface)[] = []

  for (const item of dirs) {
    if (item.isFile()) {
      children.push(await readLocalTypeFile(webcontainerInstance, `${path === '/' ? '/' : `${path}/`}${item.name}`))
    } else if (item.isDirectory()) {
      children.push(await readLocalTypeFileTree(webcontainerInstance, `${path === '/' ? '/' : `${path}/`}${item.name}`))
    }
  }

  return {
    name: path.split('/').splice(-1, 1)?.[0] || 'project',
    path: `${path}`,
    kind: 'directory',
    children
  }
}

export async function saveFileSystemTree(webcontainerInstance: WebContainer) {
  const tree =
    webcontainerInstance && (await readAsFileSystemTree(webcontainerInstance));

  localStorage.setItem(
    WebContainerFileSystemTreeSavePoint,
    JSON.stringify(tree),
  );
}
