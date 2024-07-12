'use client';

import React from 'react';
// import Image from 'next/image';
// import { editor } from 'monaco-editor';

import { FileItem } from '@/components/file/fileItem';

// import {
//   useEditorStore,
//   useMonacoStore,
//   useModelsStore,
//   useActiveModelStore,
//   useActiveEditorStore,
//   useSplitStore,
// } from '@/store/editorStore';
// import { addNewModel } from '@/components/editor/utils';

const MockFileList = [
  {
    filename: '1.py',
    language: 'python',
    value: `print('我是python文件,我可以拖动)`,
  },
  {
    filename: 'drag.js',
    language: 'javascript',
    value: `console.log("我是js,我可以拖动")`,
  },
  {
    filename: 'drag.ts',
    language: 'typescript',
    value: `console.log("我是ts,我可以拖动")`,
  },
];

const PortsPage: React.FC = () => {
  return (
    <div className="p-4 h-full w-full flex flex-col bg-[#202327]">
      <span className=" text-[11px]">资源管理器</span>
      <div className=" flex flex-col w-full">
        {MockFileList.map((file, index) => (
          <FileItem key={index} file={file} index={index}></FileItem>
        ))}
      </div>
    </div>
  );
};

export default PortsPage;
