'use client';

import { FC, useState, useEffect, useMemo, useRef } from 'react';
import {
  VscRefresh,
  VscClearAll,
  VscNewFile,
  VscListFlat,
  VscCollapseAll,
  VscExpandAll,
  VscChevronRight,
  VscChevronDown,
  VscListTree,
} from 'react-icons/vsc';

// import { ScrollArea } from '@/components/ui/scroll-area';
import { TreeViewElement } from '@/components/extension/tree-view-api';
import MatchResultComp from '@/components/fileSearch/matchResult';
import MatchResultTree from '@/components/fileSearch/matchResultTree';
import ToolBtn from '@/components/fileSearch/ToolBtn';
import IncludeAndExclude from '@/components/fileSearch/includeAndExclude';
import SearchComp from '@/components/fileSearch/search';
import ReplaceComp from '@/components/fileSearch/replace';
import { matchFilesByKey, MatchResult, TreeMatchResult } from '@/utils/match';
import {
  useFileSearch,
  useFileReplace,
  useFileFilter,
  useSearchHeader,
  // ViewMode,
} from '@/store/fileSearchStore';
import { useUploadFileDataStore } from '@/store/uploadFileDataStore';
import { useModelsStore } from '@/store/editorStore';
import { openedFileIds } from '@/utils/matchHelper';

const SearchPage: FC = () => {
  const [expandReplace, handleExpandReplace] = useState<boolean>(false);
  const [matchResultExpand, setMatchResultExpand] = useState<boolean>(true);

  const { viewMode, setViewMode } = useSearchHeader();
  const {
    searchBaseOptions,
    searchResult,
    searchResultTree,
    searchInpVal,
    setSearchResult,
    setSearchResultTree,
    ClearResultAndSearchInpval,
  } = useFileSearch();

  const { replaceOptions } = useFileReplace();
  const { filterSearchOptions, getFilters, includeFileInpVal, excludeFileInpVal } = useFileFilter();

  const { models } = useModelsStore();
  const openedIds = openedFileIds(models);

  useEffect(() => {
    // console.log('蔡徐坤');
    refreshResult();
  }, [
    searchInpVal,
    searchBaseOptions,
    filterSearchOptions,
    replaceOptions,
    includeFileInpVal,
    excludeFileInpVal,
    viewMode,
  ]);

  const searchOptions = Object.assign({}, searchBaseOptions, replaceOptions, filterSearchOptions);

  function refreshResult() {
    // console.log('reset');
    let result = matchFilesByKey(
      data,
      searchInpVal,
      searchOptions,
      getFilters(),
      openedIds,
      viewMode,
    );

    if (viewMode === 'list') {
      setSearchResult(result as MatchResult[]);
    } else if (viewMode === 'tree') {
      setSearchResultTree(result as TreeMatchResult[]);
    }
  }

  const { fileData } = useUploadFileDataStore();
  let data: TreeViewElement[] = fileData as unknown as TreeViewElement[];

  useEffect(() => {
    refreshResult();
  }, [fileData]);

  const resultCount = useMemo(() => {
    let fileCount = 0;
    let matchCount = 0;

    if (searchResult) {
      if (viewMode === 'list') {
        // 在列表模式下，计算所有匹配结果的数量
        fileCount = searchResult.length;
        matchCount = (searchResult as MatchResult[]).reduce(
          (total, matchResult) => total + matchResult.matches.length,
          0,
        );
      } else if (viewMode === 'tree') {
        const treeData = searchResultTree as TreeMatchResult[];
        const { fileCount: treeFileCount, matchCount: treeMatchCount } = traverseTree(treeData);
        fileCount = treeFileCount;
        matchCount = treeMatchCount;
      }
    }

    return {
      fileCount,
      matchCount,
    };
  }, [searchResult, searchResultTree]);

  // 树结构遍历函数
  function traverseTree(nodes: TreeMatchResult[]): { fileCount: number; matchCount: number } {
    let fileCount = 0;
    let matchCount = 0;

    function traverse(node: TreeMatchResult) {
      if (node.children) {
        node.children.forEach(traverse);
      }

      if (node.matches) {
        matchCount += node.matches.length;
        fileCount += 1;
      }
    }

    nodes.forEach(traverse);

    return { fileCount, matchCount };
  }

  const buttonDisabled = useMemo(() => {
    const isListMode = viewMode === 'list';
    const isTreeMode = viewMode === 'tree';
    const hasListResults = !!(searchResult && searchResult.length);
    const hasTreeResults = !!(searchResultTree && searchResultTree.length);

    return {
      refreshBtnDis: !((isListMode && hasListResults) || (isTreeMode && hasTreeResults)),
      clearResultBtnDis: !((isListMode && hasListResults) || (isTreeMode && hasTreeResults)),
      changeViewBtnDis: !((isListMode && hasListResults) || (isTreeMode && hasTreeResults)),
      expandBtnDis: !((isListMode && hasListResults) || (isTreeMode && hasTreeResults)),
    };
  }, [searchResult, searchResultTree, viewMode]);

  const isShowResult = useMemo(() => {
    return viewMode === 'list' ? !!searchResult.length : !!searchResultTree.length;
  }, [viewMode, searchResult, searchResultTree]);

  const resultBlockRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="size-full flex flex-col bg-[#202327]">
      <div className="flex mt-1 items-center relative">
        <div className="text-[11px] select-none ml-5 truncate">搜索</div>
        <div className="flex items-center pt-2 ml-auto mr-2 mb-4 gap-x-2">
          <ToolBtn tip="刷新" disable={buttonDisabled.refreshBtnDis} onClick={refreshResult}>
            <VscRefresh />
          </ToolBtn>
          <ToolBtn
            tip="清除搜索效果"
            disable={buttonDisabled.clearResultBtnDis}
            onClick={ClearResultAndSearchInpval}
          >
            <VscClearAll />
          </ToolBtn>
          <ToolBtn tip="打开新的搜索编辑器">
            <VscNewFile />
          </ToolBtn>
          <ToolBtn
            tip={`以${viewMode === 'list' ? '树' : '列表'}形式查看`}
            disable={buttonDisabled.changeViewBtnDis}
            onClick={() => {
              setViewMode(viewMode === 'list' ? 'tree' : 'list');
            }}
          >
            {viewMode === 'list' ? <VscListFlat /> : viewMode === 'tree' ? <VscListTree /> : ''}
          </ToolBtn>
          <ToolBtn
            tip={`全部${matchResultExpand ? '折叠' : '展开'}`}
            disable={buttonDisabled.expandBtnDis}
            onClick={() => setMatchResultExpand(!matchResultExpand)}
          >
            {!matchResultExpand ? <VscExpandAll /> : <VscCollapseAll />}
          </ToolBtn>
        </div>
      </div>
      <div className="flex px-1">
        <span
          className="cursor-pointer h-full px-[1px] mr-[1px] rounded-[2px] hover:bg-gray-600 duration-75 flex items-center"
          onClick={() => handleExpandReplace((prevState) => !prevState)}
        >
          {expandReplace ? <VscChevronRight /> : <VscChevronDown />}
        </span>

        <div className="ml-1 flex-1">
          <SearchComp />
          {expandReplace ? <ReplaceComp /> : ''}
        </div>
      </div>
      <div className="w-full flex flex-col">
        <IncludeAndExclude />
      </div>
      <div className="mx-7 text-[12px] select-none text-gray-500">
        {data ? (
          searchInpVal ? (
            isShowResult ? (
              <div>{`${resultCount.fileCount} 文件中 ${resultCount.matchCount} 个结果`}</div>
            ) : (
              <div>未找到结果</div>
            )
          ) : null
        ) : (
          <div className="selected-none">
            尚未打开或指定文件夹。当前仅搜索打开的文件 -
            <a href="#" className="text-blue-400">
              打开文件夹
            </a>
          </div>
        )}
      </div>
      <div id="result-block" className="flex-1" ref={resultBlockRef}>
        {viewMode === 'list' ? (
          <MatchResultComp expandAll={matchResultExpand} />
        ) : viewMode === 'tree' ? (
          <MatchResultTree expandAll={matchResultExpand} />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default SearchPage;
