// import { create } from 'zustand';

// import { DirectoryInterface } from '@/utils/getLocalDirectory';

// interface FileDataState {
//   fileData: DirectoryInterface | null;
// }

// interface FileDataActions {
//   setFileData: (fileData: DirectoryInterface) => void;
// }

// function getFromLocalStorage(key: string): DirectoryInterface | null {
//   if (typeof window !== 'undefined' && window.localStorage) {
//     const item = window.localStorage.getItem(key);

//     return item ? JSON.parse(item) : null;
//   }

//   return null;
// }

// function setToLocalStorage(key: string, value: any): void {
//   if (typeof window !== 'undefined' && window.localStorage) {
//     window.localStorage.setItem(key, JSON.stringify(value));
//   }
// }

// export const useUploadFileDataStore = create<FileDataState & FileDataActions>((set) => ({
//   fileData: getFromLocalStorage('fileData'),
//   setFileData: (fileData: DirectoryInterface) => {
//     set({ fileData });
//     setToLocalStorage('fileData', fileData);
//   },
// }));
import { create } from 'zustand';

import { DirectoryInterface } from '@/utils/getLocalDirectory';

interface FileDataState {
  fileData: DirectoryInterface | null;
}

interface FileDataActions {
  setFileData: (fileData: DirectoryInterface | null) => void;
}

export const useUploadFileDataStore = create<FileDataState & FileDataActions>((set) => ({
  fileData: null,
  setFileData: (fileData: DirectoryInterface | null) => {
    set({ fileData });
  },
}));
