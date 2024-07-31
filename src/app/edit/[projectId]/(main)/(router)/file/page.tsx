'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { VscNewFile } from 'react-icons/vsc';
import { VscNewFolder } from 'react-icons/vsc';
import { FaCloudDownloadAlt } from 'react-icons/fa';

import { useUploadFileDataStore } from '@/store/uploadFileDataStore';
import { TreeViewElement } from '@/components/extension/tree-view-api';
import Zip from '@/utils/zip';

const FileTree = dynamic(() => import('@/components/file/fileTree'), { ssr: false });

const PortsPage: React.FC = () => {
  const { fileData, selected, addFileOrFolder } = useUploadFileDataStore();
  let data: TreeViewElement[] = fileData as unknown as TreeViewElement[];

  if (!Array.isArray(fileData)) data = fileData === null ? [] : [fileData];
  useEffect(() => {}, [fileData]);

  const handleDownload = async () => {
    const file: any = fileData;
    const zip = new Zip();
    console.log(file[0]);
    zip.addDirectory(file[0]);

    const url = await zip.downloadZip();

    const a = document.createElement('a');
    a.href = url;
    a.download = 'project.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#202327]">
      <div className=" relative w-full flex items-center">
        <span className=" text-[11px] px-4 pt-2">资源管理器</span>
        <div className=" absolute right-[15px] pt-2 flex justify-evenly items-center gap-x-3">
          <FaCloudDownloadAlt
            onClick={() => handleDownload()}
            className=" cursor-pointer z-[50] text-[14px] hover:text-[white]"
          />
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
        <FileTree data={data as unknown as TreeViewElement[]} />
      </div>
    </div>
  );
};

export default PortsPage;
