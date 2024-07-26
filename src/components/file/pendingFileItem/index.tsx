import React, { useState } from 'react';

import { useWebContainerStore } from '@/store/webContainerStore';
import { useUploadFileDataStore } from '@/store/uploadFileDataStore';
import { writeFile, createDir } from '@/utils';

interface PendingFileItemProps {
  id: string;
  path: string;
  kind: 'directory' | 'file';
}

export const PendingFileItem: React.FC<PendingFileItemProps> = ({ id, path, kind }) => {
  const { removeFileById, updateItem } = useUploadFileDataStore();
  const { webContainerInstance } = useWebContainerStore();
  const [fileName, setFileName] = useState('');
  const handleChangeStatus = () => {
    if (fileName === '') {
      removeFileById(id);
    } else {
      const updatePath =
        path.replace(/PENDING_DIRECTORY/g, '').replace(/PENDING_FILE/g, '') + fileName;

      if (kind === 'file' && webContainerInstance) {
        writeFile(updatePath, '', webContainerInstance);
      } else if (kind === 'directory' && webContainerInstance) {
        createDir(updatePath, webContainerInstance);
      }

      updateItem(id, {
        filename: fileName,
        path: updatePath,
        status: 'success',
      });
    }
  };

  return (
    <input
      autoFocus
      onKeyUp={(e) => {
        if (e.key === 'Enter') {
          handleChangeStatus();
        }
      }}
      onChange={(e) => {
        setFileName(e.target.value);
      }}
      onBlur={() => {
        handleChangeStatus();
      }}
      className=" px-px pl-2 pr-1 border-[1px] border-[#3f85f5] focus:outline-none focus:ring-1 focus:ring-[#3f85f5] ring-opacity-50 bg-transparent/30 text-[12px] font-[300]"
    />
  );
};
