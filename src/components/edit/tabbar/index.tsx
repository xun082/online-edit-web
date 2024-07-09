import React from 'react';
import { HiOutlineEllipsisHorizontal } from 'react-icons/hi2';
import { VscSplitHorizontal } from 'react-icons/vsc';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/utils';
import {
  useModelsStore,
  useCurrentModelStore,
  useEditorStore,
  useSplitStore,
} from '@/store/editorStore';
interface TabbarProps {
  splitId: number;
}

export const Tabbar: React.FC<TabbarProps> = ({ splitId }) => {
  const { models, removeModel } = useModelsStore();
  const { currentMap, setCurrentModel, clearCuurentModel } = useCurrentModelStore();
  const { getEditor } = useEditorStore();
  const { addSplit, removeSplit } = useSplitStore();
  const editor = getEditor(splitId);
  console.log(currentMap);

  const modelId = currentMap[splitId]?.modelId ?? 0;

  console.log(currentMap);

  function renderTabs(models: any[], currentFile: string) {
    return models.map((model) => {
      // 检查 model 是否有 filename 属性，且 usedBy 是数组，且 includes splitId
      if (model.filename && model?.usedBy instanceof Array && model.usedBy.includes(splitId)) {
        return (
          <div
            key={model.filename}
            className={cn(
              'group relative flex items-center cursor-pointer transition-all duration-200 h-full pl-6 pr-7 bg-[#15181e] hover:bg-[#15181e]/20 border-[white]/20 border-[1px]',
              model.filename === currentFile ? 'bg-[#15181e]/1 border-blue-500' : '',
            )}
            onClick={() => {
              setCurrentModel(model.filename, model.model, splitId);
              // console.log(model);
              // console.log(models);
              // console.log(splitId);
              // console.log(editors);
              // console.log(editor);
              editor && editor.setModel(model.model);
            }}
          >
            {model.filename}
            <span
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                const newModels = removeModel(model.filename, splitId);

                if (newModels && newModels.filename) {
                  setCurrentModel(newModels.filename, newModels.model, splitId);
                  editor && editor.setModel(newModels.model);
                } else {
                  clearCuurentModel(splitId);
                  editor && editor.setModel(null);
                }
              }}
              className="hidden group-hover:block absolute right-1 p-2"
            >
              x
            </span>
          </div>
        );
      }

      return null;
    });
  }

  return (
    <div className="flex items-center w-full h-full justify-start bg-transparent z-[999] font-[300] text-[12px]">
      <ScrollArea className=" w-[80%] h-full scrollbar-thin scrollbar-thumb-red">
        <div className=" w-full h-[4vh] flex">{renderTabs(models, modelId)}</div>
        <ScrollBar className=" bg-transparent " orientation="horizontal" />
      </ScrollArea>
      <div className=" bg-transparent flex flex-1 gap-x-4 justify-end ml-4 mr-4 items-center">
        <div className=" flex justify-center items-center cursor-pointer">
          <VscSplitHorizontal
            onClick={() => addSplit()}
            className=" text-[14px] text-[#cacfd7] hover:text-[white]"
          />
        </div>
        <div className="flex justify-center items-center cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div>
                <HiOutlineEllipsisHorizontal className=" text-[18px] text-[#cacfd7] hover:text-white" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className=" w-24 bg-[#343a46]">
              <DropdownMenuItem>
                <span
                  onClick={() => {
                    removeSplit();
                  }}
                >
                  Close
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
