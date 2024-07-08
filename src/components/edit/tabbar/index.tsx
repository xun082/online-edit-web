import React from 'react';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/utils';
import { useModelsStore, useCurrentModelStore, useEditorStore } from '@/store/editorStore';
interface TabbarProps {}

export const Tabbar: React.FC<TabbarProps> = () => {
  const { models, removeModel } = useModelsStore();
  const { modelId, setCurrentModel } = useCurrentModelStore();
  const { editor } = useEditorStore();

  function renderTabs(models: any[], currentFile: string) {
    return models.map((model) => {
      return (
        model.filename && (
          <div
            key={model.filename}
            className={cn(
              ' group relative flex items-center cursor-pointer transition-all duration-200 h-full pl-6 pr-7 bg-[#15181e] hover:bg-[#15181e]/20 border-[white]/20 border-[1px]',
              model.filename === currentFile ? 'bg-[#15181e]/1 border-blue-500' : '',
            )}
            onClick={() => {
              setCurrentModel(model.filename, model.model);
              editor.setModel(model.model);
            }}
          >
            {model.filename}
            <span
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                const newModels = removeModel(model.filename);

                if (newModels && newModels.filename) {
                  setCurrentModel(newModels.filename, newModels.model);
                  editor.setModel(newModels.model);
                } else {
                  editor.setModel(null);
                }
              }}
              className=" hidden group-hover:block absolute right-1 p-2"
            >
              x
            </span>
          </div>
        )
      );
    });
  }

  return (
    <div className="flex items-center w-full h-full justify-start bg-transparent z-[999] font-[300] text-[12px]">
      <ScrollArea className=" w-[80%] h-full scrollbar-thin scrollbar-thumb-red">
        <div className=" w-full h-[4vh] flex">{renderTabs(models, modelId)}</div>
        <ScrollBar className=" bg-transparent " orientation="horizontal" />
      </ScrollArea>
      <div className=" bg-transparent flex flex-1 gap-x-4 justify-end mr-4 items-center">
        <div className=" flex justify-center items-center">add</div>
        <div className=" flex justify-center items-center">split</div>
        <div className="flex justify-center items-center">...</div>
      </div>
    </div>
  );
};
