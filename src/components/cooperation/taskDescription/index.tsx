import React from 'react';
import Editor, { Monaco } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { LuArrowRightCircle } from 'react-icons/lu';

import LoadingComponent from '@/components/edit/edit-loading';
import { useTaskStore } from '@/store/taskStore';

type TaskDescriptionProps = object;

export const TaskDescription: React.FC<TaskDescriptionProps> = ({}) => {
  const { curTask } = useTaskStore();
  const handleEditorDidMount = async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    editor: monaco.editor.IStandaloneCodeEditor,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    monaco: Monaco,
  ) => {};
  const handleEditorChange = () => {};

  return (
    <div className=" w-full h-full relative flex flex-col overflow-hidden bg-[#181a1f]">
      <div className=" flex items-center gap-x-1 h-12 w-full border-b border-white/20 px-4 py- cursor-pointer7">
        <div className=" font-bold flex items-center text-sm rounded-sm p-3 pr-4 py-1 bg-[#2a2c35] cursor-pointer">
          <LuArrowRightCircle className=" mr-[6px] text-blue-500 font-semibold text-lg rotate-90" />
          {curTask?.title}
        </div>
      </div>
      <div className=" w-full flex-1">
        <Editor
          className={'task-description-editor'}
          language="markdown"
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 16,
            wordWrap: 'on',
            automaticLayout: true,
            readOnly: true,
            scrollBeyondLastLine: false,
            scrollbar: {
              horizontal: 'hidden',
              horizontalHasArrows: false,
              horizontalScrollbarSize: 14,
              horizontalSliderSize: 6,
              vertical: 'visible',
              verticalHasArrows: false,
              verticalScrollbarSize: 14,
              verticalSliderSize: 6,
            },
          }}
          loading={<LoadingComponent></LoadingComponent>}
          onChange={handleEditorChange}
          value={curTask?.desc}
          onMount={handleEditorDidMount}
        />
      </div>
    </div>
  );
};
