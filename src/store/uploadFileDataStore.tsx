import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

interface DirectoryInterface {
  id: string;
  filename: string;
  kind: 'directory' | 'file';
  children?: DirectoryInterface[];
  status?: string;
}

interface FileDataState {
  fileData: DirectoryInterface[] | null;
  selected: string;
  removeFileById: (id: string) => void;
}

function removeItemById(data: DirectoryInterface[], id: string): DirectoryInterface[] {
  let dataArray = Array.isArray(data) ? data : [data];

  return dataArray.reduce((acc: DirectoryInterface[], item) => {
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
  parentId = parentId || data[0].id;

  const newId = uuidv4();
  const newEntry: DirectoryInterface = {
    id: newId,
    filename: filename,
    kind: type,
    children: type === 'directory' ? [] : undefined,
    status: status,
  };

  data = Array.isArray(data) ? [...data] : [data];

  const isDuplicate = (
    items: DirectoryInterface[],
    name: string,
    type: 'directory' | 'file',
  ): boolean => {
    return items.some((item) => item.filename === name && item.kind === type);
  };

  let parentItem: DirectoryInterface | undefined;
  const findParentRecursive = (
    items: DirectoryInterface[],
    id?: string,
  ): DirectoryInterface | undefined => {
    for (let item of items) {
      if (item.id === id) {
        parentItem = item;
        break;
      } else if (item.children) {
        findParentRecursive(item.children, id);
      }
    }

    return parentItem;
  };
  const findFileParent = (
    items: DirectoryInterface[],
    id?: string,
  ): DirectoryInterface | undefined => {
    for (let item of items) {
      if (item.children?.some((item) => item.id === id)) {
        parentItem = item;
        break;
      } else if (item.children) {
        findFileParent(item.children, id);
      }
    }

    return parentItem;
  };

  if (parentId) {
    parentItem = findParentRecursive(data, parentId);
  }

  if (parentItem) {
    if (parentItem.children && isDuplicate(parentItem.children, filename, type)) {
      console.warn(`Item with name "${filename}" and type "${type}" already exists.`);

      return data;
    }

    if (parentItem.kind === 'file') {
      const parentOfParentId = parentItem.id;
      const parentOfParent = findFileParent(data, parentOfParentId);

      if (parentOfParent) {
        parentOfParent.children = [...(parentOfParent.children || []), newEntry];

        return data;
      } else {
        return data;
      }
    } else {
      parentItem.children = [...(parentItem.children || []), newEntry];

      return data;
    }
  } else {
    if (isDuplicate(data, filename, type)) {
      console.warn(`Item with name "${filename}" and type "${type}" already exists.`);

      return data;
    }

    return [...data, newEntry];
  }
}

function updateItem(
  data: DirectoryInterface[],
  id: string,
  updatedProperties: Partial<DirectoryInterface>,
): DirectoryInterface[] {
  return data.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        ...updatedProperties,
      };
    } else if (item.children) {
      return {
        ...item,
        children: updateItem(item.children, id, updatedProperties),
      };
    } else {
      return item;
    }
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
}

export const useUploadFileDataStore = create<FileDataState & FileDataActions>((set) => ({
  fileData: null,
  selected: '',
  setSelected: (selected: string) => {
    set({ selected });
  },
  setFileData: (fileData: DirectoryInterface[] | null) => {
    set({ fileData });
  },
  removeFileById: (id: string) => {
    set((state) => ({
      fileData: removeItemById(state.fileData as DirectoryInterface[], id),
    }));
  },
  addFileOrFolder: (
    type: 'directory' | 'file',
    filename: string,
    parentId?: string,
    status?: string,
  ) => {
    set((state) => ({
      fileData: addItem(state.fileData as DirectoryInterface[], type, filename, parentId, status),
    }));
  },
  updateItem: (id: string, updatedProperties: Partial<DirectoryInterface>) => {
    set((state) => ({
      fileData: updateItem(state.fileData as DirectoryInterface[], id, updatedProperties),
    }));
  },
}));
