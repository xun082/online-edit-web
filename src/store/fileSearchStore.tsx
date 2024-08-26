import { create } from 'zustand';

import { MatchResult, TreeMatchResult } from '@/utils/match';
// import { TreeViewElement } from '@/components/extension/tree-view-api';

export interface SearchBaseOptions {
  caseSensitive: boolean; // 是否区分大小写
  wholeWord: boolean; // 是否全字匹配
  regex: boolean; // 是否使用正则表达式
}

export interface ReplaceOptions {
  preserveCase: boolean; //是否保留大小写
}

export interface FilterOptions {
  isUsed: boolean; //是否使用(展开)
  isOnlyOpened: boolean; //仅在打开的编辑器上搜索
  isUseGitignoreFile: boolean; //使用忽略文件
}

export interface SearchOptions
  extends Required<SearchBaseOptions & ReplaceOptions & FilterOptions> {
  [key: string]: any;
}

interface FileSearchState {
  searchInpVal: string;
  searchBaseOptions: SearchBaseOptions;
  searchResult: MatchResult[];
  searchResultTree: TreeMatchResult[];
}

interface FileSearchActions {
  getSearchInpVal: () => string;
  setSearchInpVal: (searchInpVal: string) => void;

  getSearchResult: () => MatchResult[];
  setSearchResult: (searchResult: MatchResult[]) => void;
  getSearchResultTree: () => TreeMatchResult[];
  setSearchResultTree: (searchResultTree: TreeMatchResult[]) => void;

  getSearchBaseOptions: () => SearchBaseOptions;
  setSearchBaseOptionItem: (key: keyof SearchBaseOptions) => void;

  search: () => void;
  // getAllOptions: () => SearchOptions;
  ClearResultAndSearchInpval: () => void;
}

type FileSearchStore = FileSearchState & FileSearchActions;

export const useFileSearch = create<FileSearchStore>((set, get) => ({
  searchInpVal: '',
  searchBaseOptions: {
    caseSensitive: false,
    wholeWord: false,
    regex: false,
  },

  searchResult: [],
  searchResultTree: [],
  getSearchResult: () => get().searchResult,
  setSearchResult: (searchResult: MatchResult[]) => set({ searchResult }),
  getSearchResultTree: () => get().searchResultTree,
  setSearchResultTree: (searchResultTree: TreeMatchResult[]) => set({ searchResultTree }),

  getSearchInpVal: () => get().searchInpVal,
  setSearchInpVal: (searchInpVal: string) => set({ searchInpVal }),

  getSearchBaseOptions: () => get().searchBaseOptions,
  setSearchBaseOptionItem: (key: keyof SearchBaseOptions) =>
    set((state) => ({
      searchBaseOptions: {
        ...state.searchBaseOptions,
        [key]: !state.searchBaseOptions[key],
      },
    })),

  // getAllOptions: () =>
  //   Object.assign({}, get().searchBaseOptions, get().replaceOptions, get().detailedSearchOptions),
  search: () => {},
  ClearResultAndSearchInpval: () => set({ searchResult: [], searchInpVal: '' }),
}));

interface FileReplaceState {
  replaceInpVal: string;
  replaceOptions: ReplaceOptions;
}
interface FileReplaceAction {
  getReplaceInpVal: () => string;
  setReplaceInpVal: (replaceInpVal: string) => void;
  setReplaceOptionItem: (key: keyof ReplaceOptions) => void;
}
type FileReplaceStore = FileReplaceState & FileReplaceAction;
export const useFileReplace = create<FileReplaceStore>((set, get) => ({
  replaceInpVal: '',
  replaceOptions: {
    preserveCase: false,
  },
  getReplaceInpVal: () => get().replaceInpVal,
  setReplaceInpVal: (replaceInpVal: string) => set({ replaceInpVal }),

  setReplaceOptionItem: (key: keyof ReplaceOptions) =>
    set((state) => ({
      replaceOptions: { ...state.replaceOptions, [key]: !state.replaceOptions[key] },
    })),
}));

interface FileFilterState {
  filterSearchOptions: FilterOptions;

  includeFileInpVal: string;
  excludeFileInpVal: string;
}
interface FileFilterAction {
  setIncludeFileInpVal: (includeFileInpVal: string) => void;
  setExcludeFileInpVal: (excludeFileInpVal: string) => void;
  getIncludeFiles: () => string[];
  getExcludeFiles: () => string[];
  getFilters: () => { includeFiles: string[]; excludeFiles: string[] };

  getFilterSearchOptions: () => FilterOptions;
  setFilterSearchOptionItem: (key: keyof FilterOptions) => void;
}
type FileFilterStore = FileFilterState & FileFilterAction;
export const useFileFilter = create<FileFilterStore>((set, get) => ({
  includeFileInpVal: '',
  excludeFileInpVal: '',

  filterSearchOptions: {
    isUsed: false,
    isOnlyOpened: false,
    isUseGitignoreFile: true,
  },

  setIncludeFileInpVal: (includeFileInpVal: string) => set({ includeFileInpVal }),
  setExcludeFileInpVal: (excludeFileInpVal: string) => set({ excludeFileInpVal }),
  getIncludeFiles: () => get().includeFileInpVal.split(',').filter(Boolean),
  getExcludeFiles: () => get().excludeFileInpVal.split(',').filter(Boolean),
  getFilters: () => ({
    includeFiles: get().getIncludeFiles(),
    excludeFiles: get().getExcludeFiles(),
  }),

  getFilterSearchOptions: () => get().filterSearchOptions,
  setFilterSearchOptionItem: (key: keyof FilterOptions) =>
    set((state) => ({
      filterSearchOptions: {
        ...state.filterSearchOptions,
        [key]: !state.filterSearchOptions[key],
      },
    })),
}));

//文件搜索头部状态
export type ViewMode = 'tree' | 'list';
interface SearchHeaderStore {
  viewMode: ViewMode;
}
interface SearchHeaderAction {
  getViewMode: () => ViewMode;
  setViewMode: (viewMode: ViewMode) => void;
}

type SearchHeader = SearchHeaderStore & SearchHeaderAction;
export const useSearchHeader = create<SearchHeader>((set, get) => ({
  viewMode: 'list',
  getViewMode: () => get().viewMode,
  setViewMode: (viewMode: ViewMode) => set({ viewMode }),
}));
