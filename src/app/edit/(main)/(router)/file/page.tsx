'use client';

import React from 'react';
import dynamic from 'next/dynamic';

import { useUploadFileDataStore } from '@/store/uploadFileDataStore';
import { TreeViewElement } from '@/components/extension/tree-view-api';

const FileTree = dynamic(() => import('@/components/file/fileTree'), { ssr: false });

// const data = [
//   {
//     id: '1',
//     filename: 'components',
//     children: [
//       {
//         id: '2',
//         filename: 'extension',
//         children: [
//           {
//             id: '3',
//             filename: 'tree-view.tsx',
//             value: '我42424是page8',
//           },
//           {
//             id: '4',
//             filename: 'tree-view-api.tsx',
//             value: '11111我是page8',
//           },
//         ],
//       },
//       {
//         id: '5',
//         filename: 'dashboard-tree.tsx',
//         value: '我4242是page8',
//       },
//     ],
//   },
//   {
//     id: '6',
//     filename: 'pages',
//     children: [
//       {
//         id: '7',
//         filename: 'page.tsx',
//         value: '我是page31318',
//       },
//       {
//         id: '8',
//         filename: 'page-guide.tsx',
//         value: '我是page8',
//       },
//     ],
//   },
//   {
//     id: '18',
//     filename: 'env.ts',
//     value: '我是page118',
//   },
// ];
const PortsPage: React.FC = () => {
  const { fileData } = useUploadFileDataStore();
  if (fileData === null) return null;

  let data: TreeViewElement[] = fileData as unknown as TreeViewElement[];
  if (!Array.isArray(fileData)) data = [fileData];

  return (
    <div className="h-full w-full flex flex-col bg-[#202327]">
      <span className=" text-[11px] px-4 pt-2">资源管理器</span>
      <div className=" px-0 flex flex-col w-full justify-start">
        <FileTree data={data as unknown as TreeViewElement[]}></FileTree>
      </div>
    </div>
  );
};

export default PortsPage;
