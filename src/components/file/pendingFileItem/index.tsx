import React, { useState } from 'react';

import { useUploadFileDataStore } from '@/store/uploadFileDataStore';

interface PendingFileItemProps {
  id: string;
}

export const PendingFileItem: React.FC<PendingFileItemProps> = ({ id }) => {
  const { removeFileById, updateItem } = useUploadFileDataStore();
  const [fileName, setFileName] = useState('');
  const handleChangeStatus = () => {
    if (fileName === '') {
      removeFileById(id);
    } else {
      updateItem(id, {
        filename: fileName,
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
