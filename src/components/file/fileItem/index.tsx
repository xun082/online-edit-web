import React, { useRef } from 'react';
import { editor } from 'monaco-editor';
import { useDraggable } from '@dnd-kit/core';
import { TiDocumentDelete } from 'react-icons/ti';

import {
  useActiveEditorStore,
  useActiveModelStore,
  useEditorStore,
  useModelsStore,
  useMonacoStore,
  useSplitStore,
} from '@/store/editorStore';
import { useDragIconStore } from '@/store/dragIconStore';
import { useUploadFileDataStore } from '@/store/uploadFileDataStore';
import { addNewModel } from '@/utils';
interface FileItemProps {
  file: any;
  onMouseupFn?: () => void;
}

export const FileItem: React.FC<FileItemProps> = ({ file, onMouseupFn }: FileItemProps) => {
  // used for editor
  const { splitState, removeSplit } = useSplitStore();
  const { editors, removeEditor } = useEditorStore();
  const { activeEditor, activeEditorId } = useActiveEditorStore();
  const { monacos } = useMonacoStore();
  const { setActiveModel } = useActiveModelStore();
  const { models, setModels, removeModel, removeAllModel } = useModelsStore();
  const keepedEditorCount = splitState.filter((item) => item).length;
  //  used for dnd
  const clickClient = useRef({
    x: 0,
    y: 0,
  });
  const { dragIconRef } = useDragIconStore();

  const { listeners, setNodeRef, transform } = useDraggable({
    id: file.filename,
    data: {
      file,
      monacos,
    },
  });

  if (
    clickClient.current.x !== 0 &&
    clickClient.current.y !== 0 &&
    transform &&
    transform.x > 10 &&
    transform.y > 10 &&
    dragIconRef
  ) {
    dragIconRef.style.display = 'block';
    dragIconRef.style.left = `${transform.x + clickClient.current.x + 5}px`;
    dragIconRef.style.top = `${transform.y + clickClient.current.y + 5}px`;
    dragIconRef.innerHTML = `${file.filename}`;
  }
  //used for fileTree

  const { removeFileById } = useUploadFileDataStore();

  function handleFileItemMouseUp() {
    clickClient.current = {
      x: 0,
      y: 0,
    };

    const willChangeEditor = activeEditor ?? editors[splitState.findIndex((item) => item)];

    const willChangeEditorId = activeEditor ? activeEditorId : splitState.findIndex((item) => item);

    const mathModel = models.filter((model) => model.id === file.id);
    // console.log(splitState, mathModel[0], willChangeEditor, willChangeEditorId);

    if (mathModel.length > 0) {
      mathModel[0].model && setActiveModel(mathModel[0].id, mathModel[0], willChangeEditorId);
      mathModel[0].model &&
        setModels(
          { filename: mathModel[0].filename, value: '', language: 'typescript', id: file.id },
          mathModel[0].model,
          willChangeEditorId,
          file.id,
        );
      willChangeEditor?.setModel(mathModel[0].model);
    } else {
      const monaco = monacos[willChangeEditorId];
      addNewModel(
        { ...file, language: 'typescript' },
        monaco as any,
        willChangeEditor as editor.IStandaloneCodeEditor,
        setModels,
        setActiveModel,
        willChangeEditorId,
      );
    }
  }

  return (
    <div
      onMouseUp={() => {
        onMouseupFn && onMouseupFn();
        handleFileItemMouseUp();
      }}
      className=" group relative flex justify-between items-center px-2 py-[0.2px] font-[250] text-[11.5px] w-full "
    >
      <span
        className=" cursor-pointer overflow-ellipsis whitespace-nowrap overflow-hidden"
        ref={setNodeRef}
        {...listeners}
        onMouseDown={(e) => {
          clickClient.current = {
            x: e.clientX,
            y: e.clientY,
          };
        }}
      >
        {file.filename}
      </span>
      <TiDocumentDelete
        onMouseUp={(e) => {
          e.stopPropagation();
          removeFileById(file.id);

          editors.forEach((editor, editorId) => {
            const newModels = removeModel(file.id, editorId);

            if (newModels && newModels.filename) {
              setActiveModel(newModels.id, newModels.model, editorId);
              editor && editor.setModel(newModels.model);
            } else {
              removeAllModel(editorId);
              editor && editor.setModel(null);

              if (keepedEditorCount > 1) {
                removeEditor(editorId);
                removeSplit(editorId);
              }
            }
          });
        }}
        className=" w-[15px] pr-[-4px] h-[15px] text-white/70 hover:text-white hidden group-hover:block"
      />
    </div>
  );
};
