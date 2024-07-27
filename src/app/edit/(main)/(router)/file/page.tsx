'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { VscNewFile } from 'react-icons/vsc';
import { VscNewFolder } from 'react-icons/vsc';

import { useUploadFileDataStore } from '@/store/uploadFileDataStore';
import { TreeViewElement } from '@/components/extension/tree-view-api';

const FileTree = dynamic(() => import('@/components/file/fileTree'), { ssr: false });

const PortsPage: React.FC = () => {
  const { fileData, selected, addFileOrFolder } = useUploadFileDataStore();
  if (fileData === null) return null;

  let data: TreeViewElement[] = fileData as unknown as TreeViewElement[];
  if (!Array.isArray(fileData)) data = [fileData];
  useEffect(() => {}, [fileData]);

  return (
    <div className="w-full h-full flex flex-col bg-[#202327]">
      <div className=" relative w-full flex items-center">
        <span className=" text-[11px] px-4 pt-2">资源管理器</span>
        <div className=" absolute right-[15px] pt-2 flex justify-evenly items-center gap-x-2">
          <VscNewFolder
            className=" cursor-pointer z-[50] text-[14px] hover:text-[white]"
            onClick={() => {
              addFileOrFolder('directory', 'PENDING_DIRECTORY', selected, 'pending');
            }}
          />
          <VscNewFile
            onClick={() => {
              addFileOrFolder('file', 'PENDING_FILE', selected, 'pending');
            }}
            className=" cursor-pointer z-[50] text-[15px] hover:text-[white]"
          />
        </div>
      </div>
      <div className=" px-0 flex flex-col w-full justify-start">
        <FileTree data={data as unknown as TreeViewElement[]}></FileTree>
      </div>
    </div>
  );
};

export default PortsPage;
