import React, { useState } from 'react';

import { useWebContainerStore } from '@/store/webContainerStore';
import { useUploadFileDataStore } from '@/store/uploadFileDataStore';
import { writeFile, createDir } from '@/utils';

interface PendingFileItemProps {
  filename: string;
  id: string;
  path: string;
  kind: 'directory' | 'file';
}

export const PendingFileItem: React.FC<PendingFileItemProps> = ({ id, path, kind, filename }) => {
  const { removeFileById, updateItem } = useUploadFileDataStore();
  const { webContainerInstance } = useWebContainerStore();
  const [fileName, setFileName] = useState(
    filename.replace(/PENDING_DIRECTORY/g, '').replace(/PENDING_FILE/g, ''),
  );
  const handleChangeStatus = async () => {
    if (fileName === '') {
      removeFileById(id);
    } else {
      //新建
      if (filename.replace(/PENDING_DIRECTORY/g, '').replace(/PENDING_FILE/g, '') === '') {
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
      } else {
        // rename
        const updatePath = path.replace(new RegExp(filename, 'g'), '') + fileName;

        if (kind === 'file' && webContainerInstance) {
          await webContainerInstance.fs.rename(path, updatePath);
        } else if (kind === 'directory' && webContainerInstance) {
          await webContainerInstance.fs.rename(path, updatePath);
        }

        updateItem(id, {
          filename: fileName,
          path: updatePath,
          status: 'success',
        });
      }
    }
  };

  return (
    <input
      autoFocus
      defaultValue={fileName}
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
      className=" w-full pl-2 pr-1 border-[0.5px] border-[#3f85f5] focus:outline-none focus:ring-1  ring-opacity-50 bg-transparent/30 text-[12px] font-[300]"
    />
  );
};
