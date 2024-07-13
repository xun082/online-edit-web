import React, { useEffect, useRef, useState } from 'react';
import { HiOutlineEllipsisHorizontal } from 'react-icons/hi2';
import { VscSplitHorizontal } from 'react-icons/vsc';
import { editor } from 'monaco-editor';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';
import { DndContext } from '@dnd-kit/core';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import TabItem from '@/components/edit/tabItem';
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
  const [mockModelsForSort, setMockModelsForSort] = useState([]);

  const { activeMap, setActiveModel } = useActiveModelStore();
  const { getEditor, removeEditor } = useEditorStore();
  const { splitState, addSplit, removeSplit } = useSplitStore();
  const { activeEditorId, setActiveEditor } = useActiveEditorStore();

  const editor = getEditor(editorId);
  const activeModelId = activeMap[editorId]?.modelId ?? 0;

  const activeTabRef = useRef<HTMLDivElement>(null);
  const keepedEditorCount = splitState.filter((item) => item).length;

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setMockModelsForSort((pre) => {
        const oldIndex = pre.findIndex((item) => item.id === active.id);
        const newIndex = pre.findIndex((item) => item.id === over.id);

        return arrayMove(pre, oldIndex, newIndex);
      });
    }
  }

  useEffect(() => {
    if (activeTabRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [activeModelId]);
  useEffect(() => {
    setMockModelsForSort(
      models.map((item) => {
        return { ...item, id: item.filename };
      }),
    );
  }, [models]);

  function renderTabs(models: any[], activeModelId: string) {
    return models.map((model) => {
      if (model.filename && model?.usedBy instanceof Array && model.usedBy.includes(editorId)) {
        return (
          <TabItem
            id={model.id}
            key={model.filename}
            filename={model.filename}
            active={model.filename === activeModelId}
            editorId={editorId}
            setActiveModel={setActiveModel}
            editor={editor}
            model={model.model}
            removeModel={removeModel}
            removeAllModel={removeAllModel}
            removeEditor={removeEditor}
            removeSplit={removeSplit}
            keepedEditorCount={keepedEditorCount}
          />
        );
      }

      return null;
    });
  }

  return (
    <DndContext onDragEnd={handleDragEnd} onDragStart={() => console.log('drag start')}>
      <div className="flex items-center w-full h-full justify-start bg-transparent z-[999] font-[300] text-[12px]">
        <ScrollArea className="w-[80%] h-full scrollbar-thin scrollbar-thumb-red">
          <div className="w-full h-[3.5vh] flex">
            <SortableContext items={mockModelsForSort}>
              {renderTabs(mockModelsForSort, activeModelId)}
            </SortableContext>
          </div>
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
                (activeEditorId === editorId || (activeEditorId === -1 && editorId === 0)) &&
                  'block',
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
    </DndContext>
  );
};
