import { DirectoryInterface } from '@/store/uploadFileDataStore';
interface PrettierConfigResult {
  value: string | null;
  name: string;
}

type ConfigParser = (str: string) => Record<string, any>;

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

const basePrettierConfig = {
  tabWidth: 4,
  useTabs: false,
  semi: true,
  singleQuote: false,
  printWidth: 100,
  trailingComma: 'es5' as const,
  arrowParens: 'always' as const,
};

//常见的prettier文件类型
const prettierType: string[] = [
  'prettier',
  '.prettierrc',
  '.prettierrc.json',
  '.prettierrc.yml',
  '.prettierrc.yaml',
  '.prettierrc.json5',
  '.prettierrc.js',
  'prettier.config.js',
  '.prettierrc.mjs',
  'prettier.config.mjs',
  '.prettierrc.cjs',
  'prettier.config.cjs',
  '.prettierrc.toml',
];

//处理JSON
const convertJSONToObject = (str: string) => {
  // 使用正则表达式提取 {} 中的内容
  const match = str.match(/\{([\s\S]*)\}/);

  if (match) {
    str = `{${match[1]}}`;
  } else {
    console.error('未找到有效的对象内容');

    return null;
  }

  // 移除 // 后面的注释
  str = str.replace(/\/\/.*$/gm, '');
  // 将所有的单引号替换为双引号
  str = str.replace(/'/g, '"');

  // 将没有引号的属性名加上双引号
  str = str.replace(/(\w+):/g, '"$1":');

  // 移除末尾的分号（如果有的话）
  str = str.replace(/;$/, '');

  // 使用 Function 构造函数解析字符串
  try {
    const obj = new Function(`return ${str};`)();

    return obj;
  } catch (error) {
    console.error('解析失败:', error);

    return null;
  }
};
//处理JS
const converJSToObject = (str: string) => {
  // 使用正则表达式提取 = {} 中的内容
  const match = str.match(/=\s*(\{[\s\S]*\})/);

  if (match) {
    str = match[1];
  } else {
    console.error('未找到有效的对象内容');

    return null;
  }

  // 移除 // 后面的注释
  str = str.replace(/\/\/.*$/gm, '');

  // 将所有的单引号替换为双引号
  str = str.replace(/'/g, '"');

  // 将没有引号的属性名加上双引号
  str = str.replace(/(\w+):/g, '"$1":');

  // 移除末尾的分号（如果有的话）
  str = str.replace(/;$/, '');

  // 使用 Function 构造函数解析字符串
  try {
    const obj = new Function(`return ${str};`)();

    return obj;
  } catch (error) {
    console.error('解析失败:', error);

    return null;
  }
};
//处理YAML
const convertYAMLToObject = (str: string) => {
  // 移除注释和空行
  const lines = str.split('\n').filter((line) => {
    line = line.trim();

    return line && !line.startsWith('#');
  });

  const result: { [key: string]: any } = {};

  for (let line of lines) {
    // 分割键值对
    const [key, value] = line.split(':').map((part) => part.trim());

    if (key && value) {
      // 处理布尔值
      if (value.toLowerCase() === 'true') {
        result[key] = true;
      } else if (value.toLowerCase() === 'false') {
        result[key] = false;
      }
      // 处理数字
      else if (!isNaN(Number(value))) {
        result[key] = Number(value);
      }
      // 处理字符串（移除引号）
      else {
        result[key] = value.replace(/^["']|["']$/g, '');
      }
    }
  }

  return result;
};
//处理TOML
const convertTOMLToObject = (str: string) => {
  // 移除注释和空行
  const lines = str.split('\n').filter((line) => {
    line = line.trim();

    return line && !line.startsWith('#');
  });

  const result: { [key: string]: any } = {};

  for (let line of lines) {
    // 分割键值对
    const [key, value] = line.split('=').map((part) => part.trim());

    if (key && value) {
      // 处理布尔值
      if (value.toLowerCase() === 'true') {
        result[key] = true;
      } else if (value.toLowerCase() === 'false') {
        result[key] = false;
      }
      // 处理数字
      else if (!isNaN(Number(value))) {
        result[key] = Number(value);
      }
      // 处理字符串（移除引号）
      else {
        result[key] = value.replace(/^["']|["']$/g, '');
      }
    }
  }

  return result;
};

const prettierMap: Record<string, ConfigParser[]> = {
  prettier: [convertJSONToObject, convertYAMLToObject],
  _prettierrc: [convertJSONToObject, convertYAMLToObject],
  _prettierrc_json: [convertJSONToObject],
  _prettierrc_yml: [convertYAMLToObject],
  _prettierrc_yaml: [convertYAMLToObject],
  _prettierrc_json5: [convertJSONToObject],
  _prettierrc_mjs: [converJSToObject],
  prettier_config_mjs: [converJSToObject],
  _prettierrc_cjs: [converJSToObject],
  prettier_config_cjs: [converJSToObject],
  _prettierrc_toml: [convertTOMLToObject],
};

export const getPrettierConfig = (file: DirectoryInterface[] | null): Record<string, any> => {
  if (!file) return basePrettierConfig;

  const fileData = findPrettierConfig(file[0].children || []);
  if (!fileData.value) return basePrettierConfig;

  let config: Record<string, any> = {};

  prettierMap[fileData.name].some((parser) => {
    config = parser(fileData.value as string);

    return config && Object.keys(config).length > 0;
  });

  return config;
};

// 获取.prettierrc.js文件的内容
function findPrettierConfig(list: any[]): PrettierConfigResult {
  const findItem = list.find((item) => prettierType.includes(item.filename));

  return { value: findItem ? findItem.value : null, name: findItem.filename.split('.').join('_') };
}
