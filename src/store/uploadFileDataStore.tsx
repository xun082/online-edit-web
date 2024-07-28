import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

interface DirectoryInterface {
  id: string;
  filename: string;
  path: string;
  kind: 'directory' | 'file';
  children?: DirectoryInterface[];
  status?: string;
  value?: string;
}

interface FileDataState {
  fileData: DirectoryInterface[] | null;
  selected: string;
  removeFileById: (id: string) => void;
}

function removeItemById(data: DirectoryInterface[], id: string): DirectoryInterface[] {
  return data.reduce((acc: DirectoryInterface[], item) => {
    if (item.id !== id) {
      if (item.children) {
        item.children = removeItemById(item.children, id);
      }

      acc.push(item);
    }

    return acc;
  }, []);
}

function addItem(
  data: DirectoryInterface[],
  type: 'directory' | 'file',
  filename: string,
  parentId?: string,
  status?: string,
): DirectoryInterface[] {
  const newId = uuidv4();
  const newEntry: DirectoryInterface = {
    id: newId,
    filename,
    path: '',
    kind: type,
    children: type === 'directory' ? [] : undefined,
    status,
  };

  const isDuplicate = (
    items: DirectoryInterface[],
    name: string,
    type: 'directory' | 'file',
  ): boolean => items.some((item) => item.filename === name && item.kind === type);

  const findParentRecursive = (
    items: DirectoryInterface[],
    id?: string,
  ): DirectoryInterface | undefined => {
    for (const item of items) {
      if (item.id === id) return item;

      if (item.children) {
        const found = findParentRecursive(item.children, id);
        if (found) return found;
      }
    }
  };

  const findFileParent = (
    items: DirectoryInterface[],
    id?: string,
  ): DirectoryInterface | undefined => {
    for (const item of items) {
      if (item.children?.some((child) => child.id === id)) return item;

      if (item.children) {
        const found = findFileParent(item.children, id);
        if (found) return found;
      }
    }
  };

  const parentItem = parentId ? findParentRecursive(data, parentId) : data[0];

  if (parentItem) {
    if (parentItem.children && isDuplicate(parentItem.children, filename, type)) {
      console.warn(`Item with name "${filename}" and type "${type}" already exists.`);

      return data;
    }

    if (parentItem.kind === 'file') {
      const parentOfParent = findFileParent(data, parentItem.id);

      if (parentOfParent) {
        parentOfParent.children = [
          ...(parentOfParent.children || []),
          { ...newEntry, path: `${parentOfParent.path}/${newEntry.filename}` },
        ];
      }
    } else {
      parentItem.children = [
        ...(parentItem.children || []),
        { ...newEntry, path: `${parentItem.path}/${newEntry.filename}` },
      ];
    }
  } else {
    if (isDuplicate(data, filename, type)) {
      console.warn(`Item with name "${filename}" and type "${type}" already exists.`);
    } else {
      data = [...data, { ...newEntry, path: `${newEntry.filename}` }];
    }
  }

  return data;
}

function updateItem(
  data: DirectoryInterface[],
  id: string,
  updatedProperties: Partial<DirectoryInterface>,
): DirectoryInterface[] {
  return data.map((item) => {
    if (item.id === id) {
      return { ...item, ...updatedProperties };
    }

    if (item.children) {
      return { ...item, children: updateItem(item.children, id, updatedProperties) };
    }

    return item;
  });
}

interface FileDataActions {
  setFileData: (fileData: DirectoryInterface[] | null) => void;
  setSelected: (selected: string) => void;
  addFileOrFolder: (
    type: 'directory' | 'file',
    filename: string,
    parentId?: string,
    status?: string,
  ) => void;
  updateItem: (id: string, updatedProperties: Partial<DirectoryInterface>) => void;
  initFileData: (projectId: string) => DirectoryInterface[] | null;
  clearFileData: (resist?: boolean, projectId?: string) => void;
}

export const useUploadFileDataStore = create<FileDataState & FileDataActions>((set, get) => ({
  fileData: null,
  selected: '',
  initFileData: (projectId: string) => {
    console.log(projectId);

    const storedData = localStorage.getItem(projectId);

    if (storedData) {
      const { projectFileData } = JSON.parse(storedData);
      console.log(projectFileData);
      set({ fileData: projectFileData });

      return projectFileData;
    } else {
      return get().fileData;
    }
  },

  clearFileData: (resist = false, projectId = '') => {
    if (resist) {
      const storedData = JSON.parse(localStorage.getItem(projectId) ?? '') ?? '';

      if (storedData !== '') {
        const newData = {
          ...storedData,
          projectFileData: get().fileData,
        };
        localStorage.setItem(projectId, JSON.stringify(newData));
      }
    }

    set({ fileData: null });
  },
  setSelected: (selected: string) => set({ selected }),
  setFileData: (fileData: DirectoryInterface[] | null) => set({ fileData }),
  removeFileById: (id: string) =>
    set((state) => ({
      fileData: state.fileData ? removeItemById(state.fileData, id) : null,
    })),
  addFileOrFolder: (type, filename, parentId, status) =>
    set((state) => ({
      fileData: state.fileData ? addItem(state.fileData, type, filename, parentId, status) : null,
    })),
  updateItem: (id, updatedProperties) => {
    set((state) => ({
      fileData: state.fileData ? updateItem(state.fileData, id, updatedProperties) : null,
    }));
  },
}));
