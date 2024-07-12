import React, { useRef } from 'react';
import { editor } from 'monaco-editor';
import { useDraggable } from '@dnd-kit/core';

import {
  useActiveEditorStore,
  useActiveModelStore,
  useEditorStore,
  useModelsStore,
  useMonacoStore,
  useSplitStore,
} from '@/store/editorStore';
import { addNewModel } from '@/components/editor/utils';
interface FileItemProps {
  index: number;
  file: any;
}

export const FileItem: React.FC<FileItemProps> = ({ index, file }) => {
  // used for editor
  const { splitState } = useSplitStore();
  const { editors } = useEditorStore();
  const { activeEditor, activeEditorId } = useActiveEditorStore();
  const { monacos } = useMonacoStore();
  const { setActiveModel } = useActiveModelStore();
  const { models, setModels } = useModelsStore();
  //  used for dnd
  const { listeners, setNodeRef } = useDraggable({
    id: file.filename,
    data: {
      file,
      monacos,
    },
  });
  const isDrag = useRef(false);

  function handleFileItemMouseUp(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    e.stopPropagation();

    if (!isDrag.current) {
      const willChangeEditor = activeEditor ?? editors[splitState.findIndex((item) => item)];
      const willChangeEditorId = activeEditor
        ? activeEditorId
        : splitState.findIndex((item) => item);

      const mathModel = models.filter((model) => model.filename === file.filename);
      // console.log(splitState, mathModel[0], willChangeEditor, willChangeEditorId);

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
    }
  }

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      key={index}
      onMouseUp={(e) => handleFileItemMouseUp(e)}
      onDrag={() => {
        isDrag.current = true;
      }}
      className=" w-full py-[1px] text-[14px] hover:bg-[#3c4453]"
    >
      {file.filename}
    </div>
  );
};
