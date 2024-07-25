const languageMap: Record<string, string> = {
  js: 'javascript',
  mjs: 'javascript',
  jsx: 'jsx',
  css: 'css',
  ts: 'typescript',
  tsx: 'typescript',
  vue: 'typescript',
  html: 'html',
  json: 'json',
  md: 'markdown',
  yaml: 'yaml',
  prettierrc: 'json',
};

export const getFileLanguage = (fileName: any) => {
  const fileSuffix = fileName.slice(fileName.lastIndexOf('.') + 1) || fileName;

  if (Object.keys(languageMap).includes(fileSuffix)) {
    return languageMap[fileSuffix];
  }

  return 'json';
};
