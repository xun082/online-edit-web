module.exports = {
  plugins: ["react"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    mocha: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  rules: {
    "react/prop-types": 0,
    "no-unused-vars": 1,
    "no-multiple-empty-lines": ["error", { max: 1 }],
    "no-var": 2, // 禁止使用 var 声明变量
    "prefer-rest-params": 2, // 要求使用剩余参数而不是 arguments
    eqeqeq: 2, // 强制使用 === 和 !==
    "no-multi-spaces": 1, // 禁止使用多个空格
    "default-case": 1, // 要求 switch 语句中有 default 分支
    "no-dupe-args": 2, // 禁止 function 定义中出现重名参数
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
