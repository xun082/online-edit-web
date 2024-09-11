import * as minimatch from 'minimatch';

import { TreeViewElement } from '@/components/extension/tree-view-api';
import { modelsType } from '@/store/editorStore';
import { FilterFiles, MatchDetail, MatchResult } from '@/utils/match';

export interface RenderedListItem extends Required<MatchResult & MatchDetail> {
  kind: TreeViewElement['kind'] | 'match';
}

/**
 * 获取字符串中匹配关键字前后的子字符串,用作高光。
 * @param targetString - 要搜索的目标字符串。
 * @param key - 要匹配的关键字。
 * @returns 一个对象，包含匹配关键字前的字符串（before）和关键字后的字符串（after）。
 */
export function getBeforeAfter(
  targetString: string,
  key: string,
): {
  before: string;
  after: string;
} {
  const regex = new RegExp(`(.*?)(${key})(.*)`);
  const match = targetString.match(regex);

  if (match) {
    return {
      before: match[1],
      after: match[3],
    };
  }

  return { before: '', after: '' };
}

/**
 * 从 .gitignore 文件中读取排除和包含规则。
 * @param data - 树视图元素数组，通常表示文件系统。
 * @returns 一个对象，包含排除规则（exclude）和包含规则（include）的集合。
 */
export function readExcludeFileInRootDir(data: TreeViewElement[]): {
  exclude: Set<string>;
  include: Set<string>;
} {
  let excludePatterns = new Set<string>();
  let includePatterns = new Set<string>(); // 用于存储包含规则

  if (data && data.length > 0) {
    const rootDirFile = data[0];
    const excludeFile = rootDirFile.children?.find(
      (child) => child.filename === '.gitignore' && child.kind === 'file',
    );

    if (excludeFile && excludeFile.value) {
      const lines = excludeFile.value.split('\n');
      lines.forEach((line) => {
        let trimmedLine = line.trim();

        if (trimmedLine && !trimmedLine.startsWith('#')) {
          if (trimmedLine.startsWith('!')) {
            // 包含规则
            includePatterns.add(trimmedLine.substring(1).trim());
          } else {
            // 排除规则
            // 检查是否是目录排除模式
            trimmedLine = convertToWildcardPattern(trimmedLine);

            excludePatterns.add(trimmedLine);
          }
        }
      });
    }
  }

  return { exclude: excludePatterns, include: includePatterns };
}

/**
 * 转换目录模式为匹配所有子目录和文件的模式。
 * 例如，将 'src' 转换为 'src/*'。
 * @param pattern 原始目录模式。
 * @returns 转换后的模式。
 */
export function convertToWildcardPattern(pattern: string): string {
  // 检查模式是否已经包含通配符或是否是目录的绝对路径
  if (pattern.endsWith('/*') || pattern.includes('**')) {
    return pattern;
  }

  // 如果模式不以 '/' 结尾，添加 '/*' 来匹配所有子目录和文件
  if (!pattern.endsWith('/')) {
    pattern += '/';
  }

  pattern += '*';

  return pattern;
}

/**
 * 获取所有已打开文件的 ID。
 * @param models - 包含模型的数组，每个模型代表一个打开的文件。
 * @returns 包含所有已打开文件 ID 的集合。
 */
export function openedFileIds(models: modelsType): Set<string> {
  const ids = new Set<string>();
  models.forEach((model) => ids.add(model.id));

  return ids;
}

/**
 * 整合包含和排除模式的函数。
 * @param data - 树视图元素数组，用于读取 .gitignore 文件。
 * @param filters - 包含和排除文件的配置对象。
 * @param useGitignoreFile - 是否使用 .gitignore 文件中的模式。
 * @returns 包含和排除模式的正则表达式数组。
 */
export function combinePatterns(
  data: TreeViewElement[],
  filters: FilterFiles,
  useGitignoreFile: boolean,
): {
  excludePatterns: RegExp[];
  includePatterns: RegExp[];
} {
  let includePatterns: RegExp[] = [];
  let excludePatterns: RegExp[] = [];

  if (filters?.includeFiles && filters?.includeFiles?.length > 0) {
    includePatterns = filters?.includeFiles
      .map((pattern) => {
        const regex = minimatch.makeRe(pattern, { nocomment: true, matchBase: true });

        return regex ? new RegExp(regex) : null;
      })
      .filter(Boolean) as RegExp[];
  }

  // 读取 .gitignore 文件中的排除模式
  let excludePatternsFromGitIgnore: Set<string> | null = null;
  // let includePatternsFromGitIgnore: Set<string> | null = null;

  if (useGitignoreFile) {
    const gitignoreFileFilter = readExcludeFileInRootDir(data);
    excludePatternsFromGitIgnore = gitignoreFileFilter.exclude;
    // includePatternsFromGitIgnore = gitignoreFileFilter.include;

    excludePatternsFromGitIgnore.forEach((pattern) => {
      const regex = minimatch.makeRe(pattern, { nocomment: true, matchBase: true });

      if (regex) {
        excludePatterns.push(new RegExp(regex));
      }
    });

    // includePatternsFromGitIgnore.forEach((pattern) => {
    //   const regex = minimatch.makeRe(pattern, { nocomment: true, matchBase: true });

    //   if (regex) {
    //     includePatterns?.push(new RegExp(regex));
    //   }
    // });
  }

  // 添加通过 excludeFiles 选项提供的排除模式
  if (filters?.excludeFiles && filters.excludeFiles.length > 0) {
    filters.excludeFiles.forEach((pattern) => {
      const regex = minimatch.makeRe(pattern, { nocomment: true, matchBase: true });

      if (regex) {
        excludePatterns.push(new RegExp(regex));
      }
    });
  }

  return {
    excludePatterns,
    includePatterns,
  };
}

/**
 * 检查字符串是否为小驼峰命名（camelCase）或大驼峰命名（PascalCase）。
 *
 * @param str - 要检查的字符串。
 * @returns 'camelCase' | 'PascalCase' | 'Neither' 字符串的命名类型。
 */
export function checkCasing(str: string): 'camelCase' | 'PascalCase' | 'Neither' {
  const camelCaseRegex: RegExp = /^[a-z]+([A-Z][a-z]+)*$/;
  const pascalCaseRegex: RegExp = /^[A-Z][a-z]*([A-Z][a-z]*)*$/;

  if (camelCaseRegex.test(str)) {
    return 'camelCase';
  } else if (pascalCaseRegex.test(str)) {
    return 'PascalCase';
  } else {
    return 'Neither';
  }
}

/**
 * 将字符串转换为大驼峰（PascalCase）或小驼峰（camelCase）。
 *
 * @param str - 要转换的字符串。
 * @param toCamel - 布尔值，如果为 true 则转换为小驼峰，如果为 false 则转换为大驼峰。
 * @returns 转换后的字符串。
 */
export function convertCase(str: string, toCamel: boolean = false): string {
  const words = str
    .replace(/[^a-zA-Z0-9]+(.)/g, '$1')
    .toLowerCase()
    .split(' ');

  let result = '';
  words.forEach((word) => {
    result += word.charAt(0).toUpperCase() + word.slice(1);
  });

  if (!toCamel) {
    return result;
  }

  return result.charAt(0).toLowerCase() + result.slice(1);
}

/**
 * 根据目标字符串的命名格式，将其转换为相应的格式。
 *
 * @param templateStr - 模板字符串，用于参考命名格式。
 * @param targetString - 要转换的目标字符串。
 * @returns 转换后的字符串。
 */
export function caseParse(templateStr: string, targetString: string): string {
  const casing = checkCasing(templateStr);

  if (casing === 'camelCase') {
    return convertCase(targetString, true); //大坨峰
  } else if (casing === 'PascalCase') {
    return convertCase(targetString, false); //小驼峰
  } else {
    return targetString;
  }
}
