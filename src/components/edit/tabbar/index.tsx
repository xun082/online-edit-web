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
  useActiveModelStore,
  useEditorStore,
  useSplitStore,
  useActiveEditorStore,
} from '@/store/editorStore';
interface TabbarProps {
  editorId: number;
}

export const Tabbar: React.FC<TabbarProps> = ({ editorId }) => {
  const { models, removeModel, removeAllModel } = useModelsStore();
  const { activeMap, setActiveModel, clearActiveModel } = useActiveModelStore();
  const { getEditor, removeEditor } = useEditorStore();
  const { addSplit, removeSplit } = useSplitStore();
  const { activeEditorId } = useActiveEditorStore();

  const editor = getEditor(editorId);

  const modelId = activeMap[editorId]?.modelId ?? 0;

  function renderTabs(models: any[], currentFile: string) {
    return models.map((model) => {
      if (model.filename && model?.usedBy instanceof Array && model.usedBy.includes(editorId)) {
        return (
          <div
            key={model.filename}
            className={cn(
              'group relative flex items-center cursor-pointer transition-all duration-200 h-full pl-6 pr-7 bg-[#15181e] hover:bg-[#15181e]/20 border-[white]/20 border-[1px]',
              model.filename === currentFile ? 'bg-[#15181e]/1 border-blue-500' : '',
            )}
            onClick={() => {
              setActiveModel(model.filename, model.model, editorId);
              editor && editor.setModel(model.model);
            }}
          >
            {model.filename}
            <span
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();

                const newModels = removeModel(model.filename, editorId);

                if (newModels && newModels.filename) {
                  setActiveModel(newModels.filename, newModels.model, editorId);
                  editor && editor.setModel(newModels.model);
                } else {
                  clearActiveModel(editorId);
                  editor && editor.setModel(null);
                  removeSplit(editorId);
                  removeEditor(editorId);
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
            onClick={() => {
              addSplit();
            }}
            className={cn(
              ' text-[14px] text-[#cacfd7] hover:text-[white] hidden',
              (activeEditorId === editorId || (activeEditorId === -1 && editorId === 0)) && 'block',
            )}
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
                  className=" w-full h-full"
                  onClick={() => {
                    editor && editor.setModel(null);
                    removeSplit(editorId);
                    removeEditor(editorId);
                    removeAllModel(editorId);
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
