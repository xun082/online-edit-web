'use client';

import { FC, useEffect, useState, MouseEventHandler, useCallback, useMemo, useRef } from 'react';
import { editor } from 'monaco-editor';
import { VscChevronDown, VscChevronRight } from 'react-icons/vsc';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import {
  useActiveEditorStore,
  useActiveModelStore,
  useEditorStore,
  useModelsStore,
  useMonacoStore,
  useSplitStore,
} from '@/store/editorStore';
import { useFileSearch } from '@/store/fileSearchStore';
import { cn, getFileLanguage, getFileSpecificIcon, addNewModel, RenderedListItem } from '@/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type ClickEventHandler = MouseEventHandler<HTMLDivElement>;
interface AutoSizerProps {
  height: number;
  width: number;
}

const MatchResultItem: FC<{
  data: RenderedListItem;
  value: string;
  className?: string;
  expanded?: boolean;
  onClick?: ClickEventHandler;
}> = ({ data, className, onClick, expanded }) => {
  const tipContentClasses = `bg-gray-700 text-while py-1 px-2 border-gray-500 border-[1px]`;

  const { filename, filepath, matches, fileId, rawValue, kind, before, after, match, content } =
    data;

  const { models, setModels } = useModelsStore();
  const { activeEditor, activeEditorId } = useActiveEditorStore();
  const { splitState } = useSplitStore();
  const { editors } = useEditorStore();
  const { setActiveModel } = useActiveModelStore();
  const { monacos } = useMonacoStore();

  const willChangeEditorId = activeEditor ? activeEditorId : splitState.findIndex((item) => item);
  const willChangeEditor = activeEditor ?? editors[splitState.findIndex((item) => item)];

  function findFileAtMatchedSelection() {
    const mathModel = models.filter((model) => model.id === fileId);

    if (mathModel.length > 0) {
      mathModel[0].model && setActiveModel(mathModel[0].id, mathModel[0], willChangeEditorId);
      mathModel[0].model &&
        setModels(
          {
            id: fileId!,
            filename: mathModel[0].filename,
            value: '',
            language: getFileLanguage(mathModel[0].filename),
          },
          mathModel[0].model,
          willChangeEditorId,
          fileId!,
        );
      willChangeEditor?.setModel(mathModel[0].model);
    } else {
      const monaco = monacos[willChangeEditorId];
      addNewModel(
        { id: fileId!, filename: filename!, value: rawValue!, language: getFileLanguage(filename) },
        monaco as any,
        willChangeEditor as editor.IStandaloneCodeEditor,
        setModels,
        setActiveModel,
        willChangeEditorId,
      );
    }
  }

  const fileClick: ClickEventHandler = (e) => {
    onClick && onClick(e);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className={cn(className, 'block pr-2 pl-2 w-full text-left hover:bg-gray-600')}
        >
          {kind === 'match' ? (
            <div
              className="text-[14px] cursor-pointer truncate w-full pl-6 ml-[5px]"
              onMouseUp={findFileAtMatchedSelection}
            >
              <span>{before}</span>
              <span className="bg-green-500/[.4]">{match}</span>
              <span>{after}</span>
            </div>
          ) : (
            <div className="flex items-center relative w-full" onClick={fileClick}>
              <span className="mr-[5px]">
                {expanded ? <VscChevronRight /> : <VscChevronDown />}
              </span>
              <img
                src={`/images/fileIcon/${getFileSpecificIcon(filename!)}.svg`}
                className="mr-1"
              />
              {filename}
              <span className="absolute right-1 rounded-full bg-gray-600 text-[10px] text-white px-2">
                {matches!.length}
              </span>
            </div>
          )}
        </TooltipTrigger>
        <TooltipContent className={cn(tipContentClasses, '')}>
          <p className="max-w-96">{kind === 'file' ? filepath : content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const MatchResultComp: FC<{
  className?: string;
  expandAll?: boolean;
}> = ({ expandAll = true }) => {
  const { searchResult, searchInpVal } = useFileSearch();

  const createDefaultExpanded = useCallback((): Set<string> => {
    const ids = new Set<string>();
    searchResult.forEach((file) => {
      ids.add(file.fileId);
    });

    return ids;
  }, [searchResult]);

  const [expandIds, setExpandIds] = useState<Set<string>>(
    expandAll ? createDefaultExpanded() : new Set(),
  );

  useEffect(() => {
    setExpandIds(expandAll ? createDefaultExpanded() : new Set());
  }, [expandAll, searchResult]);

  const expandOrCollapeItem = (id: string) => {
    const newExpandIds = new Set(expandIds);

    if (newExpandIds.has(id)) {
      newExpandIds.delete(id);
    } else {
      newExpandIds.add(id);
    }

    setExpandIds(newExpandIds);
  };

  const renderedList = useMemo((): RenderedListItem[] => {
    if (!searchInpVal) return [];

    const list: RenderedListItem[] = [];
    searchResult.forEach((item) => {
      if (item.kind === 'file') {
        list.push({
          ...item,
          before: '',
          after: '',
          content: '',
          match: '',
          line: -1,
          rawFileObj: null,
        });

        if (expandIds.has(item.fileId) && item.matches && item.matches.length) {
          item.matches.forEach((match, index) => {
            list.push({
              ...match,
              ...item,
              fileId: `${item.fileId}-child${index}`,
              kind: 'match',
            });
          });
        }
      }
    });

    return list;
  }, [searchInpVal, searchResult, expandIds]);

  const Item: FC<ListChildComponentProps> = ({ index, style }: ListChildComponentProps) => {
    const item: RenderedListItem = renderedList[index];
    const itemRef = useRef<HTMLDivElement | null>(null);

    return (
      <div className="size-full" style={style} ref={itemRef}>
        <MatchResultItem
          data={item}
          key={item.fileId}
          value={item.fileId!}
          onClick={() => expandOrCollapeItem(item.fileId!)}
          expanded={expandIds.has(item.fileId!)}
        />
      </div>
    );
  };

  return (
    <div className="h-full w-full flex-1">
      <AutoSizer>
        {({ height, width }: AutoSizerProps) => (
          <FixedSizeList
            height={height}
            width={width}
            itemSize={25}
            itemCount={renderedList.length}
            className={cn('')}
          >
            {Item}
          </FixedSizeList>
        )}
      </AutoSizer>
    </div>
  );
};

export default MatchResultComp;
