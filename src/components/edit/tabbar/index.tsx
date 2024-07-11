import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import { HiOutlineEllipsisHorizontal } from 'react-icons/hi2';
import { VscSplitHorizontal } from 'react-icons/vsc';
import { editor } from 'monaco-editor';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import css from '@/assets/image/fileIcon/JavaScript.svg';
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

interface TabBarProps {
  editorId: number;
}

export const TabBar: React.FC<TabBarProps> = ({ editorId }) => {
  const { models, removeModel, removeAllModel } = useModelsStore();
  const { activeMap, setActiveModel, clearActiveModel } = useActiveModelStore();
  const { getEditor, removeEditor } = useEditorStore();
  const { splitState, addSplit, removeSplit } = useSplitStore();
  const { activeEditorId, setActiveEditor } = useActiveEditorStore();

  const editor = getEditor(editorId);
  const activeModelId = activeMap[editorId]?.modelId ?? 0;

  const activeTabRef = useRef<HTMLDivElement>(null);
  const keepedEditorCount = splitState.filter((item) => item).length;
  useEffect(() => {
    if (activeTabRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [activeModelId]);

  function renderTabs(models: any[], activeModelId: string) {
    return models.map((model) => {
      if (model.filename && model?.usedBy instanceof Array && model.usedBy.includes(editorId)) {
        return (
          <div
            ref={model.filename === activeModelId ? activeTabRef : undefined}
            key={model.filename}
            className={cn(
              'group relative flex items-center gap-2 cursor-pointer transition-all duration-100 h-full pl-6 pr-7 bg-[#26292e]/1 hover:bg-[#15181e]/50 border-[white]/20 border-[1px]',
              model.filename === activeModelId
                ? 'bg-[#15181e] border-l border-r border-white/35 border-t-blue-500 border-t-[1.5px] border-b-0'
                : '',
            )}
            onClick={() => {
              setActiveModel(model.filename, model.model, editorId);
              editor && editor.setModel(model.model);
            }}
          >
            <Image className="absolute w-4 h-4 left-1" src={css} alt="" />
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

                  if (keepedEditorCount > 1) {
                    removeEditor(editorId);
                    removeSplit(editorId);
                  }
                }
              }}
              className="hidden group-hover:block absolute right-3"
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
      <ScrollArea className="w-[80%] h-full scrollbar-thin scrollbar-thumb-red">
        <div className="w-full h-[3.5vh] flex">{renderTabs(models, activeModelId)}</div>
        <ScrollBar className="bg-transparent" orientation="horizontal" />
      </ScrollArea>
      <div className="bg-transparent flex flex-1 gap-x-4 justify-end ml-4 mr-4 items-center">
        <div className="flex justify-center items-center cursor-pointer">
          <VscSplitHorizontal
            onClick={() => {
              addSplit();
            }}
            className={cn(
              'text-[14px] text-[#cacfd7] hover:text-[white] hidden',
              (activeEditorId === editorId || (activeEditorId === -1 && editorId === 0)) && 'block',
            )}
          />
        </div>
        <div className="flex justify-center items-center cursor-pointer">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div>
                <HiOutlineEllipsisHorizontal className="text-[18px] text-[#cacfd7] hover:text-white" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-24 bg-[#343a46]">
              <DropdownMenuItem>
                <span
                  className="w-full h-full"
                  onClick={() => {
                    editor && editor.setModel(null);

                    removeAllModel(editorId);

                    if (keepedEditorCount > 1) {
                      removeEditor(editorId);
                      removeSplit(editorId);
                      setActiveEditor(getEditor(0) as editor.IStandaloneCodeEditor, 0);
                    }
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
