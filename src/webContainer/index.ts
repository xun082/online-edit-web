import { FileSystemTree, WebContainer } from "@webcontainer/api";
import { message } from "antd";
import { DataNode } from "antd/es/tree";
import { v4 as uuid } from "uuid";

import { uint8Array2string } from "@/utils";

const WebContainerFileSystemTreeSavePoint =
  "Web_Container_File_System_Tree_Save_Point";

let webcontainerInstance: WebContainer;

export const webcontainerInstancePromise = new Promise<WebContainer>(
  resolve => {
    message.open({ type: "loading", content: "Loading..." });

    window.addEventListener("load", async () => {
      webcontainerInstance = await WebContainer.boot();
      await mountFileSystemTree();

      message.destroy();
      resolve(webcontainerInstance);
    });
  },
);

export function createDir(path: string) {
  return webcontainerInstance.fs.mkdir(path, { recursive: true });
}

export function writeFile(path: string, content: string | Uint8Array) {
  return webcontainerInstance.fs.writeFile(path, content);
}

export function createFile(path: string) {
  return writeFile(path, "");
}

export function rm(path: string) {
  return webcontainerInstance.fs.rm(path, { force: true, recursive: true });
}

export async function readFile(path: string) {
  const u8 = await webcontainerInstance.fs.readFile(path);
  return uint8Array2string(u8);
}

export async function renameFile(path: string, name: string) {
  const content = await readFile(path);
  await rm(path);

  const newPath = [...path.split("/").slice(0, -1), name].join("/");

  await writeFile(newPath, content);
}

export async function readFileSystem(path = "/"): Promise<DataNode[]> {
  const dirs = await webcontainerInstance.fs.readdir(path, {
    withFileTypes: true,
  });

  return Promise.all(
    dirs.map(async item => ({
      key: uuid(),
      title: item.name,
      isLeaf: item.isFile(),
      children: item.isDirectory()
        ? await readFileSystem(`${path}/${item.name}`)
        : undefined,
    })),
  );
}

async function readAsFileSystemTree(path = "/"): Promise<FileSystemTree> {
  const dirs = await webcontainerInstance.fs.readdir(path, {
    withFileTypes: true,
  });

  const arrayTree = await Promise.all(
    dirs
      .filter(item => !(item.isDirectory() && item.name === "node_modules"))
      .map(async item => ({
        name: item.name,
        contents: item.isFile()
          ? await readFile(`${path}/${item.name}`)
          : undefined,
        directory: item.isDirectory()
          ? await readAsFileSystemTree(`${path}/${item.name}`)
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

async function saveFileSystemTree() {
  const tree = await readAsFileSystemTree();

  localStorage.setItem(
    WebContainerFileSystemTreeSavePoint,
    JSON.stringify(tree),
  );
}

async function mountFileSystemTree() {
  const treeData = localStorage.getItem(WebContainerFileSystemTreeSavePoint);

  if (!treeData) return;

  const fileSystemTree = JSON.parse(treeData);

  await webcontainerInstance.mount(fileSystemTree);
}

window.addEventListener("beforeunload", async e => {
  e.preventDefault();
  await saveFileSystemTree();
});
