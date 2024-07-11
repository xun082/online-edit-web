'use client';

import React from 'react';
// import Image from 'next/image';
import { editor } from 'monaco-editor';

import {
  useEditorStore,
  useMonacoStore,
  useModelsStore,
  useActiveModelStore,
  useActiveEditorStore,
  useSplitStore,
} from '@/store/editorStore';
import { addNewModel } from '@/components/editor/utils';

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
  const { splitState } = useSplitStore();
  const { editors } = useEditorStore();
  const { activeEditor, activeEditorId } = useActiveEditorStore();
  const { monacos } = useMonacoStore();
  const { setActiveModel } = useActiveModelStore();
  const { models, setModels } = useModelsStore();

  return (
    <div className="p-4 h-full w-full flex flex-col bg-[#202327]">
      <span className=" text-[11px]">资源管理器</span>
      <div className=" flex flex-col w-full">
        {MockFileList.map((file, index) => (
          <div
            key={index}
            onClick={() => {
              const willChangeEditor =
                activeEditor ?? editors[splitState.findIndex((item) => item)];
              const willChangeEditorId = activeEditor
                ? activeEditorId
                : splitState.findIndex((item) => item);

              const mathModel = models.filter((model) => model.filename === file.filename);
              console.log(splitState, mathModel[0], willChangeEditor, willChangeEditorId);

              if (mathModel.length > 0) {
                mathModel[0].model &&
                  setActiveModel(mathModel[0].filename, mathModel[0].model, willChangeEditorId);
                mathModel[0].model &&
                  setModels(
                    { filename: mathModel[0].filename, value: '', language: 'typescript' },
                    mathModel[0].model,
                    willChangeEditorId,
                  );
                willChangeEditor?.setModel(mathModel[0].model);
              } else {
                const monaco = monacos[willChangeEditorId];
                addNewModel(
                  file,
                  monaco as any,
                  willChangeEditor as editor.IStandaloneCodeEditor,
                  setModels,
                  setActiveModel,
                  willChangeEditorId,
                );
              }
            }}
            className=" w-full py-[1px] text-[14px] hover:bg-[#3c4453]"
          >
            {file.filename}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortsPage;
