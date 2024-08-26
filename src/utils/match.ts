import { TreeViewElement } from '@/components/extension/tree-view-api';
import { SearchOptions, ViewMode } from '@/store/fileSearchStore';
import { combinePatterns, getBeforeAfter } from '@/utils/matchHelper';

//列表模式类型
export type MatchDetail = {
  line: number;
  content: string; // 整行内容
  match: string; // 匹配的关键字
  before: string; // 关键字前的字符串
  after: string; // 关键字后的字符串
  rawFileObj: TreeViewElement; //对应的文件对象
};

export type MatchResult = {
  filepath: string;
  filename: string;
  fileId: string;
  rawValue: string;
  matches: MatchDetail[]; // 包含所有匹配项的细节
};

//树模式类型
export interface TreeMatchResult extends TreeViewElement {
  children?: TreeMatchResult[];
  matches?: MatchDetail[];
  path?: string;
}

export interface FilterFiles {
  includeFiles: Array<string>;
  excludeFiles: Array<string>;
}

export function matchFilesByKey(
  data: TreeViewElement[],
  key: string,
  options: SearchOptions,
  filters: FilterFiles,
  openFilesId: Set<string>,
  viewMode: ViewMode,
): MatchResult[] | TreeMatchResult[] {
  if (!key) return [];

  let result: MatchResult[] | TreeMatchResult[];

  //处理基本配置
  const isCaseSensitive = options?.caseSensitive ?? false; //大小写
  const isWholeWord = options?.wholeWord ?? false; //全字
  const isRegex = options?.regex ?? false; //正则
  const useGitignoreFile = options?.isUseGitignoreFile ?? false; //使用 .gitignore 文件
  const onlyOpenedFile = options?.isOnlyOpened ?? false; //是否只在打开的文件上找

  // 将文件模式转换为正则表达式
  const { includePatterns, excludePatterns } = combinePatterns(data, filters, useGitignoreFile);

  //开始递归
  if (viewMode === 'tree') {
    // 构建树形结构
    result = searchElementsToTree(
      data,
      [],
      key,
      isCaseSensitive,
      isWholeWord,
      isRegex,
      includePatterns,
      excludePatterns,
      onlyOpenedFile ? openFilesId : null,
      null,
    );
  } else if (viewMode === 'list') {
    // 构建列表结构
    const matches: MatchResult[] = [];
    searchElements(
      data,
      [],
      key,
      isCaseSensitive,
      isWholeWord,
      isRegex,
      includePatterns,
      excludePatterns,
      onlyOpenedFile ? openFilesId : null,
      matches,
    );
    result = matches;
  } else {
    result = [];
  }

  // console.log('result', result);

  return result;
}

/**
 * 递归搜索文件并匹配关键字。
 * @param elements - 当前目录下的元素数组。
 * @param pathParts - 当前路径的部分。
 * @param key - 要搜索的关键字。
 * @param isCaseSensitive - 是否区分大小写。
 * @param isWholeWord - 是否只匹配整个单词。
 * @param isRegex - 是否使用正则表达式。
 * @param includePatterns - 包含模式的正则表达式数组。
 * @param excludePatterns - 排除模式的正则表达式数组。
 * @param openFilesId - 已打开文件的 ID 集合。
 * @param matches - 匹配结果的数组。
 */
function searchElements(
  elements: TreeViewElement[],
  pathParts: string[],
  key: string,
  isCaseSensitive: boolean,
  isWholeWord: boolean,
  isRegex: boolean,
  includePatterns: RegExp[],
  excludePatterns: RegExp[],
  openFilesId: Set<string> | null,
  matches: MatchResult[],
): void {
  for (const element of elements) {
    const currentPathParts = [...pathParts, element.filename];
    const currentFilePath = currentPathParts.join('/');
    const relativePathParts = currentPathParts.slice(1);
    const targetPath = relativePathParts.join('/');

    let isIncluded = true;
    let isExcluded = false;

    if (includePatterns.length > 0) {
      isIncluded = includePatterns.some((pattern) => pattern.test(targetPath));
    }

    if (excludePatterns.length > 0) {
      isExcluded = excludePatterns.some((pattern) => pattern.test(targetPath));
    }

    const isOpenTarget = openFilesId === null ? true : openFilesId.has(element.id);

    if (element.kind === 'file' && element.value && isIncluded && !isExcluded && isOpenTarget) {
      const lines = element.value.split('\n');

      const matchesInFile = searchLines(lines, key, isCaseSensitive, isWholeWord, isRegex, element);

      if (matchesInFile.length > 0) {
        matches.push({
          filepath: currentFilePath,
          filename: element.filename,
          fileId: element.id,
          rawValue: element.value,
          matches: matchesInFile,
        });
      }
    } else if (element.kind === 'directory' && element.children) {
      searchElements(
        element.children,
        currentPathParts,
        key,
        isCaseSensitive,
        isWholeWord,
        isRegex,
        includePatterns,
        excludePatterns,
        openFilesId,
        matches,
      );
    }
  }
}

//树模式
/**
 * 创建一个树节点，如果文件包含匹配项，则添加匹配详情。
 * @param element - 当前处理的树视图元素。
 * @param matchesInFile - 文件中的匹配详情数组。
 * @param isMatch - 文件是否包含匹配项。
 * @returns 构建的树节点。
 */
function searchElementsToTree(
  elements: TreeViewElement[],
  pathParts: string[],
  key: string,
  isCaseSensitive: boolean,
  isWholeWord: boolean,
  isRegex: boolean,
  includePatterns: RegExp[],
  excludePatterns: RegExp[],
  openFilesId: Set<string> | null,
  parentNode: TreeMatchResult | null = null,
): TreeMatchResult[] {
  const treeNodes: TreeMatchResult[] = [];

  const addTreeNode = (
    element: TreeViewElement,
    matchesInFile: MatchDetail[],
    isMatch: boolean,
  ): TreeMatchResult => {
    return {
      ...element,
      matches: isMatch ? matchesInFile : undefined,
      children: element.children ? [] : undefined, // 仅当存在子目录时初始化 children 数组
    };
  };

  elements.forEach((element) => {
    let currentElement: TreeMatchResult | null = null;
    let matchesInFile: MatchDetail[] = [];

    const currentPathParts = [...pathParts, element.filename];
    const relativePathParts = currentPathParts.slice(1);
    const targetPath = relativePathParts.join('/');

    let isIncluded = true;
    let isExcluded = false;

    if (includePatterns.length > 0) {
      isIncluded = includePatterns.some((pattern) => pattern.test(targetPath));
    }

    if (excludePatterns.length > 0) {
      isExcluded = excludePatterns.some((pattern) => pattern.test(targetPath));
    }

    const isOpenTarget = openFilesId === null ? true : openFilesId.has(element.id);

    if (element.kind === 'file' && element.value && isIncluded && !isExcluded && isOpenTarget) {
      matchesInFile = searchLines(
        element.value.split('\n'),
        key,
        isCaseSensitive,
        isWholeWord,
        isRegex,
        element,
      );
      currentElement = addTreeNode(element, matchesInFile, matchesInFile.length > 0);
    } else if (element.kind === 'directory' && element.children) {
      currentElement = addTreeNode(element, [], false);

      const childrenNodes = searchElementsToTree(
        element.children,
        currentPathParts,
        key,
        isCaseSensitive,
        isWholeWord,
        isRegex,
        includePatterns,
        excludePatterns,
        openFilesId,
        currentElement,
      );

      if (childrenNodes.length > 0) {
        currentElement.children = childrenNodes;
      }
    }

    if (
      currentElement &&
      (currentElement.matches || (currentElement.children && currentElement.children.length > 0))
    ) {
      if (parentNode) {
        parentNode.children?.push(currentElement);
      } else {
        treeNodes.push(currentElement);
      }
    }
  });

  return treeNodes;
}

/**
 * 在文本行数组中搜索关键字，并收集匹配结果。
 * @param lines - 要搜索的文本行数组。
 * @param index - 文本行数组的索引。
 * @param key - 要搜索的关键字。
 * @param isCaseSensitive - 是否区分大小写。
 * @param isWholeWord - 是否只匹配整个单词。
 * @param isRegex - 是否使用正则表达式。
 * @param element - 当前处理的文件元素。
 * @returns 匹配结果数组。
 */
function searchLines(
  lines: string[],
  key: string,
  isCaseSensitive: boolean,
  isWholeWord: boolean,
  isRegex: boolean,
  element: TreeViewElement,
): MatchDetail[] {
  const matchesInFile: MatchDetail[] = [];

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    let searchLine = line;
    let searchKey = key;

    if (isRegex) {
      try {
        const escapedKey = escapeRegExp(searchKey);
        const regex = new RegExp(escapedKey, isCaseSensitive ? 'g' : 'gi');
        let match = regex.exec(searchLine);

        while (match !== null) {
          const [found] = match;
          const { before, after } = getBeforeAfter(line, found);
          matchesInFile.push({
            line: index + 1,
            content: line,
            match: found,
            before,
            after,
            rawFileObj: element,
          });
          match = regex.exec(searchLine);
        }
      } catch (e) {
        if (e instanceof SyntaxError) {
          console.error(`Invalid regex: ${searchKey}`);
          continue;
        } else {
          throw e;
        }
      }
    } else {
      const words = isWholeWord ? searchLine.split(/\s+/) : [searchLine];
      words.forEach((word) => {
        if (isWholeWord) {
          const regex = new RegExp(`\\b${searchKey}\\b`, isCaseSensitive ? '' : 'i');
          const match = regex.exec(word);

          if (match) {
            const found = match[0];
            const { before, after } = getBeforeAfter(line, found);
            matchesInFile.push({
              line: index + 1,
              content: line,
              match: found,
              before,
              after,
              rawFileObj: element,
            });
          }
        } else {
          const escapedKey = escapeRegExp(searchKey);
          let regex;

          try {
            //防止字符串输入不规范导致正则创建失败报错
            regex = new RegExp(`(${escapedKey})`, `${!isCaseSensitive ? 'i' : ''}g`);
          } catch (e) {
            if (e instanceof SyntaxError) {
              console.error(`Invalid regex: ${searchKey}`);

              return [];
            } else {
              throw e;
            }
          }

          const matches = regex ? [...line.matchAll(regex)] : [];
          matches.forEach((match) => {
            if (match) {
              const matchIndex = match.index;

              if (matchIndex) {
                const before = line.substring(0, matchIndex);
                const matchStr = match[0];
                const after = line.substring(matchIndex + matchStr.length);
                matchesInFile.push({
                  line: index + 1,
                  content: line,
                  match: matchStr,
                  before,
                  after,
                  rawFileObj: element,
                });
              }
            }
          });
        }
      });
    }
  }

  return matchesInFile;
}

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& 表示整个被匹配的字符串
}
