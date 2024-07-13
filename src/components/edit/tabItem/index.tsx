import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { editor } from 'monaco-editor';
import { useSortable } from '@dnd-kit/sortable';

import { cn } from '@/utils';
import jsIcon from '@/assets/image/fileIcon/JavaScript.svg';

interface TabProps {
  id: string;
  filename: string;
  active: boolean;
  editorId: number;
  setActiveModel: (filename: string, model: any, editorId: number) => void;
  editor: any;
  model: editor.ITextModel;
  removeModel: (filename: string, editorId: number) => any;
  removeAllModel: (editorId: number) => void;
  removeEditor: (editorId: number) => void;
  removeSplit: (editorId: number) => void;
  keepedEditorCount: number;
}

const Tab: React.FC<TabProps> = ({
  id,
  filename,
  active,
  editorId,
  setActiveModel,
  editor,
  model,
  removeModel,
  removeAllModel,
  removeEditor,
  removeSplit,
  keepedEditorCount,
}) => {
  const tabRef = useRef<HTMLDivElement>(null);
  console.log(id);

  const { listeners, setNodeRef, transform } = useSortable({ id });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, 0, 0)`,
      }
    : undefined;

  useEffect(() => {
    if (active && tabRef.current) {
      tabRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [active]);

  const handleTabClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveModel(filename, model, editorId);
    editor && editor.setModel(model);
  };

  const handleTabClose = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const newModels = removeModel(filename, editorId);

    if (newModels && newModels.filename) {
      setActiveModel(newModels.filename, newModels.model, editorId);
      editor && editor.setModel(newModels.model);
    } else {
      removeAllModel(editorId);
      editor && editor.setModel(null);

      if (keepedEditorCount > 1) {
        removeEditor(editorId);
        removeSplit(editorId);
      }
    }
  };

  return (
    <div
      key={filename}
      style={style}
      ref={setNodeRef}
      {...listeners}
      className={cn(
        'group relative flex items-center gap-2 cursor-pointer transition-all duration-100 h-full pl-6 pr-7 bg-[#26292e]/1 hover:bg-[#15181e]/50 border-[white]/20 border-[1px]',
        active
          ? 'bg-[#15181e] border-l border-r border-white/35 border-t-blue-500 border-t-[1.5px] border-b-0'
          : '',
      )}
      onMouseUp={(e) => handleTabClick(e)}
    >
      <Image className="absolute w-4 h-4 left-1" src={jsIcon} alt="" />
      {filename}
      <span
        ref={tabRef}
        onMouseUp={handleTabClose}
        className="hidden group-hover:block absolute right-3"
      >
        x
      </span>
    </div>
  );
};

export default Tab;
