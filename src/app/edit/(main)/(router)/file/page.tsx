'use client';

import React from 'react';
import dynamic from 'next/dynamic';

import { useUploadFileDataStore } from '@/store/uploadFileDataStore';
import { TreeViewElement } from '@/components/extension/tree-view-api';

const FileTree = dynamic(() => import('@/components/file/fileTree'), { ssr: false });

const PortsPage: React.FC = () => {
  const { fileData } = useUploadFileDataStore();
  if (fileData === null) return null;

  let data: TreeViewElement[] = fileData as unknown as TreeViewElement[];
  if (!Array.isArray(fileData)) data = [fileData];

  return (
    <div className="h-[100vh] w-full flex flex-col bg-[#202327]">
      <span className=" text-[11px] px-4 pt-2">资源管理器</span>
      <div className=" px-0 flex flex-col w-full justify-start">
        <FileTree data={data as unknown as TreeViewElement[]}></FileTree>
      </div>
    </div>
  );
};

export default PortsPage;
