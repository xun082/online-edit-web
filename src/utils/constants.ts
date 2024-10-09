export const PATHS = {
  HOME: '/',
  MAIN_DASHBOARD: '/dashboard',
  MAIN_TEMPLATES: '/templates',
  AI: '/edit/ai',
} as const;

export const PROJECT_Name = 'online-edit';
export type PathKeys = keyof typeof PATHS;
export type PathValues = (typeof PATHS)[PathKeys];

export const PRETTIER_FORMAT_PATH: string = 'PRETTIER_FORMAT_PATH';

export const UPLOAD_FILE_DATA: string = 'UPLOAD_FILE_DATA';

export const DEFAULT_PRETTIER_CONFIG: string = `{
  "printWidth": 80,
  "tabWidth": 2,
  "trailingComma": "all",
  "semi": true,
  "endOfLine": "auto",
  "arrowParens": "avoid",
  "bracketSpacing": true
}
`;

export const MONACO_THEME_ARRAY = [
  'slack-dark',
  'solarized-dark',
  'vitesse-dark',
  'rose-pine-moon',
  'one-dark-pro',
  'night-owl',
  'material-theme-darker',
  'ayu-dark',
  'dark-plus',
];
export const MONACO_THEME_MAP: Record<string, string> = {
  'Dark Plus': 'dark-plus',
  'Ayu Dark': 'ayu-dark',
  'Material Theme Darker': 'material-theme-darker',
  'One Dark Pro': 'one-dark-pro',
  'Night Owl': 'night-owl',
  'Rose Pine Moon': 'rose-pine-moon',
  'Vitesse Dark': 'vitesse-dark',
  'Slack Dark': 'slack-dark',
  'Solarized Dark': 'solarized-dark',
};

export const TASKS = [
  {
    id: 1,
    title: '两数之和',
    desc: '# 问题描述\n\n给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那两个整数，并返回他们的数组下标。\n\n你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。\n\n## 示例\n```python\nInput: nums = [2, 7, 11, 15], target = 9\nOutput: [0, 1]\n```',
  },
  {
    id: 2,
    title: '两数相减',
    desc: '# 问题描述\n\n给定两个非负整数 num1 和 num2 表示两个数，计算这两个数的差（num1 - num2），不得使用 * / % + - 等运算符。\n\n## 示例\n```python\nInput: num1 = 10, num2 = 3\nOutput: 7\n```',
  },
  {
    id: 3,
    title: '两数相乘',
    desc: '# 问题描述\n\n给定两个非负整数 num1 和 num2 表示两个数，计算这两个数的乘积，不得使用 * / % + - 等运算符。\n\n## 示例\n```python\nInput: num1 = 3, num2 = 7\nOutput: 21\n```',
  },
  {
    id: 4,
    title: '两数相除',
    desc: '# 问题描述\n\n给定两个整数，被除数 dividend 和除数 divisor。将两数相除，要求不使用乘法、除法和 mod 运算符。\n\n返回被除数 dividend 除以除数 divisor 得到的商。\n\n## 示例\n```python\nInput: dividend = 10, divisor = 3\nOutput: 3\n```',
  },
  {
    id: 5,
    title: '字符串反转',
    desc: '# 问题描述\n\n编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 char[] 的形式给出。\n\n不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。\n\n## 示例\n```python\nInput: ["h","e","l","l","o"]\nOutput: ["o","l","l","e","h"]\n```',
  },
  {
    id: 6,
    title: '回文检测',
    desc: '# 问题描述\n\n判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。\n\n## 示例\n```python\nInput: 121\nOutput: true\n```',
  },
  {
    id: 7,
    title: '数组去重',
    desc: '# 问题描述\n\n给定一个排序数组，你需要在 原地 删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。\n\n不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。\n\n## 示例\n```python\nInput: nums = [1,1,2]\nOutput: 2, nums = [1,2]\n```',
  },
  {
    id: 8,
    title: '数组排序',
    desc: '# 问题描述\n\n给定一个整数数组 nums，原地对它们进行排序。可以使用任何一种排序算法。\n\n## 示例\n```python\nInput: nums = [5, 2, 3, 1]\nOutput: [1, 2, 3, 5]\n```',
  },
  {
    id: 9,
    title: '链表反转',
    desc: '# 问题描述\n\n反转一个单链表。\n\n## 示例\n```python\nInput: 1->2->3->4->5->NULL\nOutput: 5->4->3->2->1->NULL\n```',
  },
  {
    id: 10,
    title: '二叉树遍历',
    desc: '# 问题描述\n\n给定一个二叉树，返回其节点值的前序/中序/后序遍历。\n\n## 示例\n```python\nInput: [1,null,2,3]\nOutput: [1,2,3] (Preorder)\nOutput: [1,3,2] (Inorder)\nOutput: [3,2,1] (Postorder)\n```',
  },
  {
    id: 11,
    title: '最长公共前缀',
    desc: '# 问题描述\n\n编写一个函数来查找字符串数组中的最长公共前缀。\n\n如果不存在公共前缀，返回空字符串 ""。\n\n## 示例\n```python\nInput: ["flower","flow","flight"]\nOutput: "fl"\n```',
  },
  {
    id: 12,
    title: '最小公倍数',
    desc: '# 问题描述\n\n给定两个正整数，计算它们的最小公倍数。\n\n## 示例\n```python\nInput: a = 4, b = 6\nOutput: 12\n```',
  },
  {
    id: 13,
    title: '最大公约数',
    desc: '# 问题描述\n\n给定两个正整数，计算它们的最大公约数。\n\n## 示例\n```python\nInput: a = 4, b = 6\nOutput: 2\n```',
  },
  {
    id: 14,
    title: '斐波那契数列',
    desc: '# 问题描述\n\n给定 n，计算斐波那契数列的第 n 项。斐波那契数列定义如下：F(0) = 0, F(1) = 1, F(n) = F(n - 1) + F(n - 2) (n >= 2)。\n\n## 示例\n```python\nInput: 4\nOutput: 3\n```',
  },
  {
    id: 15,
    title: '汉诺塔问题',
    desc: '# 问题描述\n\n汉诺塔是一个经典的数学问题，通常用递归来解决。给定三个柱子 A, B, C 和 n 个不同大小的盘子，盘子初始全部位于 A 柱上。每次只能移动一个盘子，且大盘子不能放在小盘子上面。目标是将所有盘子从 A 柱移动到 C 柱。\n\n## 示例\n```python\nInput: n = 3\nOutput: ["A -> B", "A -> C", "B -> C"]\n```',
  },
  {
    id: 16,
    title: '八皇后问题',
    desc: '# 问题描述\n\n八皇后问题是将八个皇后放置在国际象棋棋盘上，使得任何一个皇后都无法直接吃掉其他的皇后。为了达到此目的，任两个皇后都不能处于同一条横行、纵行或斜线上。\n\n## 示例\n```python\nInput: 8\nOutput: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]\n```',
  },
  {
    id: 17,
    title: '背包问题',
    desc: '# 问题描述\n\n给定不同面额的硬币 coins 和一个总金额 amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。\n\n## 示例\n```python\nInput: coins = [1, 2, 5], amount = 11\nOutput: 3\n```',
  },
  {
    id: 18,
    title: '最短路径',
    desc: '# 问题描述\n\n给定一个加权有向图和一个起点 s，找到从 s 到其他每个顶点的最短路径。图中可能存在负权重边，但保证不存在负权重环。\n\n## 示例\n```python\nInput: graph = [[0, 4, 0, 0, 0, 0, 0, 8, 0], [4, 0, 8, 0, 0, 0, 0, 11, 0], ...], start = 0\nOutput: [0, 4, 12, ...]\n```',
  },
  {
    id: 19,
    title: '图的遍历',
    desc: '# 问题描述\n\n给定一个无向图，实现深度优先搜索（DFS）和广度优先搜索（BFS）遍历。\n\n## 示例\n```python\nInput: graph = [[1, 2], [0, 2], [0, 1, 3], [2]], start = 0\nOutput: DFS: [0, 1, 2, 3], BFS: [0, 1, 2, 3]\n```',
  },
  {
    id: 20,
    title: '动态规划',
    desc: '# 问题描述\n\n动态规划是一种通过把原问题分解为相互重叠的子问题来求解复杂问题的方法。编写一个函数来解决一个特定的问题，比如找零钱问题、最长递增子序列等。\n\n## 示例\n```python\nInput: coins = [1, 2, 5], amount = 11\nOutput: 3\n```',
  },
];
