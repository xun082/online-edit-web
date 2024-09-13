'use client';

import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { VscChevronDown } from 'react-icons/vsc';
import { editor } from 'monaco-editor';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import { useFileSearch } from '@/store/fileSearchStore';
import { TreeMatchResult } from '@/utils/match';
import { addNewModel, cn, getFileLanguage, getFileSpecificIcon, RenderedTreeItem } from '@/utils';
import {
  useActiveEditorStore,
  useActiveModelStore,
  useEditorStore,
  useModelsStore,
  useMonacoStore,
  useSplitStore,
} from '@/store/editorStore';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface AutoSizerProps {
  height: number;
  width: number;
}

const tipContentClasses = `bg-gray-700 text-while py-1 px-2 border-gray-500 border-[1px]`;

const MatchResultTree: FC<{ expandAll: boolean }> = ({ expandAll }) => {
  const { searchResultTree } = useFileSearch();
  const root = searchResultTree[0];
  const treeData = root?.children;

  const createDefaultExpanded = useCallback(
    (treeData: TreeMatchResult[]): Set<string> => {
      const ids = new Set<string>();
      const addIdsFromTreeData = (data: TreeMatchResult[]) => {
        data.forEach((file) => {
          ids.add(file.id);

          if (file.kind === 'directory' && file.children && file.children.length) {
            addIdsFromTreeData(file.children);
          }
        });
      };

      if (treeData) {
        addIdsFromTreeData(treeData);
      }

      return ids;
    },
    [treeData],
  );

  const [expandedIds, setExpandedIds] = useState<Set<string | undefined>>();

  useEffect(() => {
    treeData && setExpandedIds(expandAll ? createDefaultExpanded(treeData) : new Set());
  }, [treeData, expandAll]);

  const expandOrCollapeItem = (id: string): void => {
    const newExpandIds = new Set(expandedIds);

    if (newExpandIds.has(id)) {
      newExpandIds.delete(id);
    } else {
      newExpandIds.add(id);
    }

    setExpandedIds(newExpandIds);
  };

  const createTreeFlattList = useCallback(
    (tree: TreeMatchResult[], level: number = 0): RenderedTreeItem[] => {
      return tree.reduce((acc, node) => {
        const newNode: RenderedTreeItem = {
          ...node,
          level,
          kind: node.kind,
        };

        if (node.kind === 'directory' && node.children) {
          acc.push(newNode);
          expandedIds?.has(node.id!) && acc.push(...createTreeFlattList(node.children, level + 1));
        } else if (node.kind === 'file') {
          acc.push(newNode);

          if (expandedIds?.has(node.id!) && node.matches) {
            node.matches.forEach((match, index) => {
              acc.push({
                ...newNode,
                kind: 'match',
                ...match,
                level: level + 1,
                id: `${node.id}-match${index}`,
              });
            });
          }
        }

        return acc;
      }, [] as RenderedTreeItem[]);
    },
    [treeData, expandedIds],
  );

  const renderedTree = useMemo(() => {
    return treeData ? createTreeFlattList(treeData) : [];
  }, [treeData, expandedIds]);

  const Item: FC<ListChildComponentProps> = ({ index, style }: ListChildComponentProps) => {
    const item: RenderedTreeItem = renderedTree[index];

    return (
      <div className="size-full" key={item.id!} style={style}>
        <TreeItem
          data={item}
          className="text-[14px]"
          expandHandle={() => expandOrCollapeItem(item.id!)}
          expand={expandedIds?.has(item.id!)}
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
            itemCount={renderedTree.length}
            className={cn('')}
          >
            {Item}
          </FixedSizeList>
        )}
      </AutoSizer>
    </div>
  );
};

const TreeItem: FC<{
  data: RenderedTreeItem;
  className?: string;
  expand?: boolean;
  expandHandle?: (id: string) => void;
}> = ({ data, className, expand, expandHandle }) => {
  const { filename, kind, level, id: fileId, value, path, before, after, match, content } = data;
  const itemClasses = `cursor-pointer hover:bg-gray-600 px-${level * 5}`;

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
        {
          id: fileId!,
          filename: filename!,
          value: value || '',
          language: getFileLanguage(filename),
        },
        monaco as any,
        willChangeEditor as editor.IStandaloneCodeEditor,
        setModels,
        setActiveModel,
        willChangeEditorId,
      );
    }
  }

  const calculateMatchCount = useCallback((): number => {
    let count: number = 0;
    const computedMatch = (node: RenderedTreeItem | TreeMatchResult) => {
      if (node.kind === 'file') {
        count += node.matches?.length || 0;
      } else if (node.kind === 'directory') {
        node.children?.forEach((child) => {
          computedMatch(child);
        });
      }
    };

    computedMatch(data);

    return count;
  }, [data]);

  return (
    <div className={className}>
      {
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="w-full">
              <div className={cn('flex items-center relative w-full', itemClasses)}>
                {kind === 'directory' ? (
                  <span
                    className="flex items-center w-full"
                    onClick={() => expandHandle?.(fileId!)}
                  >
                    <VscChevronDown
                      className={`mx-1 ${expand ? '' : 'rotate-[270deg]'} duration-200`}
                    />
                    <img src={`/images/fileIcon/FileDir.svg`} className="mr-1" />
                    {filename}
                  </span>
                ) : kind === 'file' ? (
                  <span
                    className="flex items-center w-full"
                    onClick={() => expandHandle?.(fileId!)}
                  >
                    <VscChevronDown
                      className={`mx-1 ${expand ? '' : 'rotate-[270deg]'} duration-200`}
                    />
                    <img
                      src={`/images/fileIcon/${getFileSpecificIcon(filename!)}.svg`}
                      className="mr-1"
                    />
                    {filename}
                  </span>
                ) : kind === 'match' ? (
                  <div
                    className="text-[14px] cursor-pointer truncate w-full pl-6 ml-[5px] text-left"
                    onClick={findFileAtMatchedSelection}
                  >
                    <span>{before}</span>
                    <span className="bg-green-500/[.4]">{match}</span>
                    <span>{after}</span>
                  </div>
                ) : null}
                {kind !== 'match' && (
                  <span className="absolute right-2 rounded-full bg-gray-600 text-[10px] text-white px-2">
                    {calculateMatchCount()}
                  </span>
                )}
              </div>
            </TooltipTrigger>
            <TooltipContent className={cn(tipContentClasses, '')}>
              {kind === 'match' ? content : path}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      }
    </div>
  );
};

export default MatchResultTree;
