const fileIcons: { [key: string]: string } = {
  '.tsx': 'jsx', // React 图标
  '.jsx': 'jsx',
  '.ts': 'ts', // TypeScript 图标
  '.json': 'json', // JSON 图标
  '.css': 'css', // CSS 图标
  '.md': 'markdown', // Markdown 图标
  '.js': 'JavaScript', // JavaScript 图标
  '.mjs': 'JavaScript', // JavaScript Module 图标
  '.html': 'html', // HTML 图标
  '.vue': 'vue', // Vue 图标
  '.yml': 'yaml', // YAML 文件图标
  '.yaml': 'yaml', // YAML 文件图标
  '.png': 'image', // 图片文件图标
  '.jpg': 'image', // 图片文件图标
  '.jpeg': 'image',
  '.svg': 'image',
  '.eslint': 'eslint-icon', // ESLint 配置文件图标
  '.git': 'git', // Git 文件图标
  '.prettier': 'prettier', // Prettier 配置文件图标
};

function getFileIcon(fileName: string): string {
  const extension = fileName.substring(fileName.lastIndexOf('.'));

  return fileIcons[extension] || 'json'; // 如果没有匹配到，返回默认图标
}

export function getFileSpecificIcon(fileName: string): string {
  if (fileName === 'package.json') return 'json';
  if (fileName === 'package-lock.json') return 'json';
  if (fileName === 'README.md') return 'markdown';
  if (fileName.includes('.eslintrc')) return 'eslint';
  if (fileName.includes('.git')) return 'git';
  if (fileName.includes('.prettier')) return 'prettier';

  return getFileIcon(fileName);
}
