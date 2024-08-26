import { FC, useEffect, useState } from 'react';
import { VscChevronDown } from 'react-icons/vsc';
import { editor } from 'monaco-editor';

import { useFileSearch } from '@/store/fileSearchStore';
import { TreeMatchResult } from '@/utils/match';
import { addNewModel, cn, getFileLanguage, getFileSpecificIcon } from '@/utils';
import {
  useActiveEditorStore,
  useActiveModelStore,
  useEditorStore,
  useModelsStore,
  useMonacoStore,
  useSplitStore,
} from '@/store/editorStore';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface FlattenedTreeMatchResult extends TreeMatchResult {
  level: number;
}

const tipContentClasses = `bg-gray-700 text-while py-1 px-2 border-gray-500 border-[1px]`;

const MatchResultTree: FC<{ expandAll: boolean }> = ({ expandAll }) => {
  const { searchResultTree } = useFileSearch();
  const root = searchResultTree[0];
  const treeData = root?.children;

  // 拍平树
  function flattenTree(tree: TreeMatchResult[], level: number = 0): FlattenedTreeMatchResult[] {
    return tree.reduce((acc, node) => {
      const newNode = { ...node, level };

      if (node.kind === 'directory' && node.children) {
        acc.push(newNode);
        acc.push(...flattenTree(node.children, level + 1));
      } else if (node.kind === 'file') {
        acc.push(newNode);
      }

      return acc;
    }, [] as FlattenedTreeMatchResult[]);
  }

  const renderedTree = (treeData && flattenTree(treeData)) || [];

  return (
    <div>
      {renderedTree?.map((data) => {
        return (
          <div key={data.id}>
            <TreeItem data={data} className="text-[14px]" expandProp={expandAll} />
          </div>
        );
      })}
    </div>
  );
};

const TreeItem: FC<{
  data: FlattenedTreeMatchResult;
  className?: string;
  expandProp?: boolean;
}> = ({ data, className, expandProp = true }) => {
  const { filename, kind, matches, level, id: fileId, value, path } = data;
  const itemClasses = `cursor-pointer hover:bg-gray-600 px-${level * 5}`;
  console.log('data', data);

  const [expand, handleExpand] = useState<boolean>(expandProp);
  useEffect(() => {
    handleExpand(expandProp);
  }, [expandProp]);

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
            id: fileId,
            filename: mathModel[0].filename,
            value: '',
            language: getFileLanguage(mathModel[0].filename),
          },
          mathModel[0].model,
          willChangeEditorId,
          fileId,
        );
      willChangeEditor?.setModel(mathModel[0].model);
    } else {
      const monaco = monacos[willChangeEditorId];
      addNewModel(
        { id: fileId, filename, value: value || '', language: getFileLanguage(filename) },
        monaco as any,
        willChangeEditor as editor.IStandaloneCodeEditor,
        setModels,
        setActiveModel,
        willChangeEditorId,
      );
    }
  }

  return (
    <div className={className}>
      {kind === 'directory' ? (
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="w-full">
                <div
                  className={cn('flex items-center relative w-full', itemClasses)}
                  onClick={() => handleExpand(!expand)}
                >
                  <VscChevronDown
                    className={`mx-1 ${expand ? '' : 'rotate-[270deg]'} duration-200`}
                  />
                  <img src={`/images/fileIcon/FileDir.svg`} className="mr-1" />
                  {filename}
                </div>
              </TooltipTrigger>
              <TooltipContent className={cn(tipContentClasses, '')}>{path}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ) : kind === 'file' ? (
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="w-full">
                <div
                  className={cn('flex items-center relative w-full', itemClasses)}
                  onClick={() => handleExpand(!expand)}
                >
                  <VscChevronDown
                    className={`mx-1 ${expand ? '' : 'rotate-[270deg]'} duration-200`}
                  />
                  <img
                    src={`/images/fileIcon/${getFileSpecificIcon(filename)}.svg`}
                    className="mr-1"
                  />
                  {filename}
                </div>
              </TooltipTrigger>
              <TooltipContent>{path}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className={`overflow-hidden ${expand ? 'h-fit' : 'h-0'} duration-200`}>
            {matches?.map((match, i) => {
              const { match: key, before, after } = match;

              return (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="w-full flex items-center justify-start">
                      <div
                        className={cn('truncate w-full text-left', itemClasses)}
                        key={i}
                        onClick={findFileAtMatchedSelection}
                      >
                        <span className="ml-6">{before}</span>
                        <span className="bg-green-500/[.4]">{key}</span>
                        <span>{after}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className={cn(tipContentClasses, '')}>
                      {match.content}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MatchResultTree;
