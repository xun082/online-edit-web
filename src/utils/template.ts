const REACT_TEMPLATE = [
  {
    filename: 'react',
    kind: 'directory',
    path: '/react',
    children: [
      {
        filename: '.eslintrc.cjs',
        kind: 'file',
        path: '/react/.eslintrc.cjs',
        value:
          "module.exports = {\n  root: true,\n  env: { browser: true, es2020: true },\n  extends: [\n    'eslint:recommended',\n    'plugin:@typescript-eslint/recommended',\n    'plugin:react-hooks/recommended',\n  ],\n  ignorePatterns: ['dist', '.eslintrc.cjs'],\n  parser: '@typescript-eslint/parser',\n  plugins: ['react-refresh'],\n  rules: {\n    'react-refresh/only-export-components': [\n      'warn',\n      { allowConstantExport: true },\n    ],\n  },\n}\n",
        id: '2696d74c-6151-45f7-af46-028ae6bd2edd',
      },
      {
        filename: '.gitignore',
        kind: 'file',
        path: '/react/.gitignore',
        value:
          '# Logs\nlogs\n*.log\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\npnpm-debug.log*\nlerna-debug.log*\n\nnode_modules\ndist\ndist-ssr\n*.local\n\n# Editor directories and files\n.vscode/*\n!.vscode/extensions.json\n.idea\n.DS_Store\n*.suo\n*.ntvs*\n*.njsproj\n*.sln\n*.sw?\n',
        id: '5cb0bb54-2384-4601-b88f-a79d90d4d5f0',
      },
      {
        filename: 'index.html',
        kind: 'file',
        path: '/react/index.html',
        value:
          '<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="icon" type="image/svg+xml" href="/vite.svg" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>Vite + React + TS</title>\n  </head>\n  <body>\n    <div id="root"></div>\n    <script type="module" src="/src/main.tsx"></script>\n  </body>\n</html>\n',
        id: 'eaf7aba1-871a-4879-8a26-1600cece9015',
      },
      {
        filename: 'package.json',
        kind: 'file',
        path: '/react/package.json',
        value:
          '{\n  "name": "react",\n  "private": true,\n  "version": "0.0.0",\n  "type": "module",\n  "scripts": {\n    "dev": "vite",\n    "build": "tsc -b && vite build",\n    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",\n    "preview": "vite preview"\n  },\n  "dependencies": {\n    "react": "^18.3.1",\n    "react-dom": "^18.3.1"\n  },\n  "devDependencies": {\n    "@types/react": "^18.3.3",\n    "@types/react-dom": "^18.3.0",\n    "@typescript-eslint/eslint-plugin": "^7.15.0",\n    "@typescript-eslint/parser": "^7.15.0",\n    "@vitejs/plugin-react": "^4.3.1",\n    "eslint": "^8.57.0",\n    "eslint-plugin-react-hooks": "^4.6.2",\n    "eslint-plugin-react-refresh": "^0.4.7",\n    "typescript": "^5.2.2",\n    "vite": "^5.3.4"\n  }\n}\n',
        id: 'b0abe400-2c12-4315-88eb-79b944c6cf02',
      },
      {
        filename: 'public',
        kind: 'directory',
        path: '/react/public',
        children: [
          {
            filename: 'vite.svg',
            kind: 'file',
            path: '/react/public/vite.svg',
            value:
              '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="31.88" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 257"><defs><linearGradient id="IconifyId1813088fe1fbc01fb466" x1="-.828%" x2="57.636%" y1="7.652%" y2="78.411%"><stop offset="0%" stop-color="#41D1FF"></stop><stop offset="100%" stop-color="#BD34FE"></stop></linearGradient><linearGradient id="IconifyId1813088fe1fbc01fb467" x1="43.376%" x2="50.316%" y1="2.242%" y2="89.03%"><stop offset="0%" stop-color="#FFEA83"></stop><stop offset="8.333%" stop-color="#FFDD35"></stop><stop offset="100%" stop-color="#FFA800"></stop></linearGradient></defs><path fill="url(#IconifyId1813088fe1fbc01fb466)" d="M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z"></path><path fill="url(#IconifyId1813088fe1fbc01fb467)" d="M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z"></path></svg>',
            id: '1ff3c6c2-abe0-41a1-ba39-919991106670',
          },
        ],
        id: '9ac093d5-4d6c-4caf-b93a-41b725b627ad',
      },
      {
        filename: 'README.md',
        kind: 'file',
        path: '/react/README.md',
        value:
          "# React + TypeScript + Vite\n\nThis template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.\n\nCurrently, two official plugins are available:\n\n- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh\n- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh\n\n## Expanding the ESLint configuration\n\nIf you are developing a production application, we recommend updating the configuration to enable type aware lint rules:\n\n- Configure the top-level `parserOptions` property like this:\n\n```js\nexport default {\n  // other rules...\n  parserOptions: {\n    ecmaVersion: 'latest',\n    sourceType: 'module',\n    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],\n    tsconfigRootDir: __dirname,\n  },\n}\n```\n\n- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`\n- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`\n- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list\n",
        id: '93ef0b00-e7ae-4001-bc9b-7bf44dc171e3',
      },
      {
        filename: 'src',
        kind: 'directory',
        path: '/react/src',
        children: [
          {
            filename: 'App.css',
            kind: 'file',
            path: '/react/src/App.css',
            value:
              '#root {\n  max-width: 1280px;\n  margin: 0 auto;\n  padding: 2rem;\n  text-align: center;\n}\n\n.logo {\n  height: 6em;\n  padding: 1.5em;\n  will-change: filter;\n  transition: filter 300ms;\n}\n.logo:hover {\n  filter: drop-shadow(0 0 2em #646cffaa);\n}\n.logo.react:hover {\n  filter: drop-shadow(0 0 2em #61dafbaa);\n}\n\n@keyframes logo-spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n\n@media (prefers-reduced-motion: no-preference) {\n  a:nth-of-type(2) .logo {\n    animation: logo-spin infinite 20s linear;\n  }\n}\n\n.card {\n  padding: 2em;\n}\n\n.read-the-docs {\n  color: #888;\n}\n',
            id: 'abb7206d-d1c8-4b18-bf6e-30ee26bffb1d',
          },
          {
            filename: 'App.tsx',
            kind: 'file',
            path: '/react/src/App.tsx',
            value:
              'import { useState } from \'react\'\nimport reactLogo from \'./assets/react.svg\'\nimport viteLogo from \'/vite.svg\'\nimport \'./App.css\'\n\nfunction App() {\n  const [count, setCount] = useState(0)\n\n  return (\n    <>\n      <div>\n        <a href="https://vitejs.dev" target="_blank">\n          <img src={viteLogo} className="logo" alt="Vite logo" />\n        </a>\n        <a href="https://react.dev" target="_blank">\n          <img src={reactLogo} className="logo react" alt="React logo" />\n        </a>\n      </div>\n      <h1>Vite + React</h1>\n      <div className="card">\n        <button onClick={() => setCount((count) => count + 1)}>\n          count is {count}\n        </button>\n        <p>\n          Edit <code>src/App.tsx</code> and save to test HMR\n        </p>\n      </div>\n      <p className="read-the-docs">\n        Click on the Vite and React logos to learn more\n      </p>\n    </>\n  )\n}\n\nexport default App\n',
            id: '2bfa6c8c-3142-42c2-9f0f-5e9dedb9622d',
          },
          {
            filename: 'assets',
            kind: 'directory',
            path: '/react/src/assets',
            children: [
              {
                filename: 'react.svg',
                kind: 'file',
                path: '/react/src/assets/react.svg',
                value:
                  '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="35.93" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 228"><path fill="#00D8FF" d="M210.483 73.824a171.49 171.49 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171.23 171.23 0 0 0-6.375 5.848a155.866 155.866 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a170.974 170.974 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a145.52 145.52 0 0 0 6.921 2.165a167.467 167.467 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a145.567 145.567 0 0 0 5.342-4.923a168.064 168.064 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145.016 145.016 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844Zm-6.365 70.984c-1.4.463-2.836.91-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14Zm-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a156.726 156.726 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345a134.17 134.17 0 0 1 1.386 6.193ZM87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a156.923 156.923 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994c7.084 9.967 14.501 19.128 21.976 27.15a134.668 134.668 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94ZM50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322 13.897-21.212 37.076-29.293c2.813-.98 5.757-1.905 8.812-2.773c3.204 10.42 7.406 21.315 12.477 32.332c-5.137 11.18-9.399 22.249-12.634 32.792a134.718 134.718 0 0 1-6.318-1.979Zm12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789c8.564-4.958 27.502 2.111 47.463 19.835a144.318 144.318 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988c-12.04 1.116-23.565 2.908-34.161 5.309a160.342 160.342 0 0 1-1.76-7.887Zm110.427 27.268a347.8 347.8 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08c-2.206 7.072-4.956 14.465-8.193 22.045a381.151 381.151 0 0 0-7.365-13.322Zm-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322.04 322.04 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18ZM82.802 87.83a323.167 323.167 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152c7.304-1.634 15.093-2.97 23.209-3.984a321.524 321.524 0 0 0-7.848 12.897Zm8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793c2.26-7.3 5.045-14.885 8.298-22.6a321.187 321.187 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147Zm37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433c4.902.192 9.899.29 14.978.29c5.218 0 10.376-.117 15.453-.343c-4.985 6.774-10.018 12.97-15.028 18.486Zm52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52c-7.422 1.694-15.436 3.058-23.88 4.071a382.417 382.417 0 0 0 7.859-13.026a347.403 347.403 0 0 0 7.425-13.565Zm-16.898 8.101a358.557 358.557 0 0 1-12.281 19.815a329.4 329.4 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310.202 310.202 0 0 1-12.513-19.846h.001a307.41 307.41 0 0 1-10.923-20.627a310.278 310.278 0 0 1 10.89-20.637l-.001.001a307.318 307.318 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329.357 329.357 0 0 1 12.335 19.695a358.489 358.489 0 0 1 11.036 20.54a329.472 329.472 0 0 1-11 20.722Zm22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026c-.344 1.668-.73 3.367-1.15 5.09c-10.622-2.452-22.155-4.275-34.23-5.408c-7.034-10.017-14.323-19.124-21.64-27.008a160.789 160.789 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3ZM128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86s-22.86-10.235-22.86-22.86s10.235-22.86 22.86-22.86Z"></path></svg>',
                id: 'b617ad69-102c-4aa1-a299-d3988d290794',
              },
            ],
            id: '7513beaa-63ca-4dcd-b0b4-9e29250b771f',
          },
          {
            filename: 'index.css',
            kind: 'file',
            path: '/react/src/index.css',
            value:
              ':root {\n  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;\n  line-height: 1.5;\n  font-weight: 400;\n\n  color-scheme: light dark;\n  color: rgba(255, 255, 255, 0.87);\n  background-color: #242424;\n\n  font-synthesis: none;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\na {\n  font-weight: 500;\n  color: #646cff;\n  text-decoration: inherit;\n}\na:hover {\n  color: #535bf2;\n}\n\nbody {\n  margin: 0;\n  display: flex;\n  place-items: center;\n  min-width: 320px;\n  min-height: 100vh;\n}\n\nh1 {\n  font-size: 3.2em;\n  line-height: 1.1;\n}\n\nbutton {\n  border-radius: 8px;\n  border: 1px solid transparent;\n  padding: 0.6em 1.2em;\n  font-size: 1em;\n  font-weight: 500;\n  font-family: inherit;\n  background-color: #1a1a1a;\n  cursor: pointer;\n  transition: border-color 0.25s;\n}\nbutton:hover {\n  border-color: #646cff;\n}\nbutton:focus,\nbutton:focus-visible {\n  outline: 4px auto -webkit-focus-ring-color;\n}\n\n@media (prefers-color-scheme: light) {\n  :root {\n    color: #213547;\n    background-color: #ffffff;\n  }\n  a:hover {\n    color: #747bff;\n  }\n  button {\n    background-color: #f9f9f9;\n  }\n}\n',
            id: '8e8690a7-3ddd-4d91-addb-96090c975790',
          },
          {
            filename: 'main.tsx',
            kind: 'file',
            path: '/react/src/main.tsx',
            value:
              "import React from 'react'\nimport ReactDOM from 'react-dom/client'\nimport App from './App.tsx'\nimport './index.css'\n\nReactDOM.createRoot(document.getElementById('root')!).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>,\n)\n",
            id: '372a3a97-4592-4a83-89a8-85be6a91e3a8',
          },
          {
            filename: 'vite-env.d.ts',
            kind: 'file',
            path: '/react/src/vite-env.d.ts',
            value: '/// <reference types="vite/client" />\n',
            id: '61f16fe3-14fe-422a-9646-3e39a4711816',
          },
        ],
        id: '5fa16e0b-d94d-4ba7-a14f-d38ce904dcd9',
      },
      {
        filename: 'tsconfig.app.json',
        kind: 'file',
        path: '/react/tsconfig.app.json',
        value:
          '{\n  "compilerOptions": {\n    "composite": true,\n    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",\n    "target": "ES2020",\n    "useDefineForClassFields": true,\n    "lib": ["ES2020", "DOM", "DOM.Iterable"],\n    "module": "ESNext",\n    "skipLibCheck": true,\n\n    /* Bundler mode */\n    "moduleResolution": "bundler",\n    "allowImportingTsExtensions": true,\n    "resolveJsonModule": true,\n    "isolatedModules": true,\n    "moduleDetection": "force",\n    "noEmit": true,\n    "jsx": "react-jsx",\n\n    /* Linting */\n    "strict": true,\n    "noUnusedLocals": true,\n    "noUnusedParameters": true,\n    "noFallthroughCasesInSwitch": true\n  },\n  "include": ["src"]\n}\n',
        id: '484a3ebd-2336-4160-b6e7-564e0f90bd8d',
      },
      {
        filename: 'tsconfig.json',
        kind: 'file',
        path: '/react/tsconfig.json',
        value:
          '{\n  "files": [],\n  "references": [\n    {\n      "path": "./tsconfig.app.json"\n    },\n    {\n      "path": "./tsconfig.node.json"\n    }\n  ]\n}\n',
        id: 'cf701843-320f-4f2e-8776-3ca2ebe09ed3',
      },
      {
        filename: 'tsconfig.node.json',
        kind: 'file',
        path: '/react/tsconfig.node.json',
        value:
          '{\n  "compilerOptions": {\n    "composite": true,\n    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",\n    "skipLibCheck": true,\n    "module": "ESNext",\n    "moduleResolution": "bundler",\n    "allowSyntheticDefaultImports": true,\n    "strict": true,\n    "noEmit": true\n  },\n  "include": ["vite.config.ts"]\n}\n',
        id: 'c4ed1f55-c274-41c6-91f4-2b49f5ccf2da',
      },
      {
        filename: 'vite.config.ts',
        kind: 'file',
        path: '/react/vite.config.ts',
        value:
          "import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\n\n// https://vitejs.dev/config/\nexport default defineConfig({\n  plugins: [react()],\n})\n",
        id: '499169d0-9f5a-49e9-8050-9a3e4c0f2182',
      },
    ],
    id: 'aa9320bd-7f23-4e55-b435-0af063858149',
  },
];

const VUE_TEMPLATE = [
  {
    filename: 'vue',
    kind: 'directory',
    path: '/vue',
    children: [
      {
        filename: '.gitignore',
        kind: 'file',
        path: '/vue/.gitignore',
        value:
          '# Logs\nlogs\n*.log\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\npnpm-debug.log*\nlerna-debug.log*\n\nnode_modules\ndist\ndist-ssr\n*.local\n\n# Editor directories and files\n.vscode/*\n!.vscode/extensions.json\n.idea\n.DS_Store\n*.suo\n*.ntvs*\n*.njsproj\n*.sln\n*.sw?\n',
        id: 'c901405f-3d46-4833-81f1-e8a0d1ac17da',
      },
      {
        filename: 'index.html',
        kind: 'file',
        path: '/vue/index.html',
        value:
          '<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="icon" type="image/svg+xml" href="/vite.svg" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>Vite + Vue + TS</title>\n  </head>\n  <body>\n    <div id="app"></div>\n    <script type="module" src="/src/main.ts"></script>\n  </body>\n</html>\n',
        id: '317ac76a-2aff-4f5d-81b0-026e898c77bf',
      },
      {
        filename: 'package.json',
        kind: 'file',
        path: '/vue/package.json',
        value:
          '{\n  "name": "vue",\n  "private": true,\n  "version": "0.0.0",\n  "type": "module",\n  "scripts": {\n    "dev": "vite",\n    "build": "vue-tsc -b && vite build",\n    "preview": "vite preview"\n  },\n  "dependencies": {\n    "vue": "^3.4.31"\n  },\n  "devDependencies": {\n    "@vitejs/plugin-vue": "^5.0.5",\n    "typescript": "^5.2.2",\n    "vite": "^5.3.4",\n    "vue-tsc": "^2.0.24"\n  }\n}\n',
        id: '050e8cfb-acf9-4ab2-ae46-560c2e2697ed',
      },
      {
        filename: 'public',
        kind: 'directory',
        path: '/vue/public',
        children: [
          {
            filename: 'vite.svg',
            kind: 'file',
            path: '/vue/public/vite.svg',
            value:
              '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="31.88" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 257"><defs><linearGradient id="IconifyId1813088fe1fbc01fb466" x1="-.828%" x2="57.636%" y1="7.652%" y2="78.411%"><stop offset="0%" stop-color="#41D1FF"></stop><stop offset="100%" stop-color="#BD34FE"></stop></linearGradient><linearGradient id="IconifyId1813088fe1fbc01fb467" x1="43.376%" x2="50.316%" y1="2.242%" y2="89.03%"><stop offset="0%" stop-color="#FFEA83"></stop><stop offset="8.333%" stop-color="#FFDD35"></stop><stop offset="100%" stop-color="#FFA800"></stop></linearGradient></defs><path fill="url(#IconifyId1813088fe1fbc01fb466)" d="M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z"></path><path fill="url(#IconifyId1813088fe1fbc01fb467)" d="M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z"></path></svg>',
            id: 'df7af522-80ab-4569-8460-e1cc7e7ef023',
          },
        ],
        id: '7b6bba4a-7d9c-4552-b4d1-5a152c3874bc',
      },
      {
        filename: 'README.md',
        kind: 'file',
        path: '/vue/README.md',
        value:
          '# Vue 3 + TypeScript + Vite\n\nThis template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.\n\nLearn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).\n',
        id: 'ae8a8271-7cfd-4576-9fb3-55c8ed9dc45e',
      },
      {
        filename: 'src',
        kind: 'directory',
        path: '/vue/src',
        children: [
          {
            filename: 'App.vue',
            kind: 'file',
            path: '/vue/src/App.vue',
            value:
              '<script setup lang="ts">\nimport HelloWorld from \'./components/HelloWorld.vue\'\n</script>\n\n<template>\n  <div>\n    <a href="https://vitejs.dev" target="_blank">\n      <img src="/vite.svg" class="logo" alt="Vite logo" />\n    </a>\n    <a href="https://vuejs.org/" target="_blank">\n      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />\n    </a>\n  </div>\n  <HelloWorld msg="Vite + Vue" />\n</template>\n\n<style scoped>\n.logo {\n  height: 6em;\n  padding: 1.5em;\n  will-change: filter;\n  transition: filter 300ms;\n}\n.logo:hover {\n  filter: drop-shadow(0 0 2em #646cffaa);\n}\n.logo.vue:hover {\n  filter: drop-shadow(0 0 2em #42b883aa);\n}\n</style>\n',
            id: '702cedce-415e-4cf2-b1ad-dfbca9a76b6b',
          },
          {
            filename: 'assets',
            kind: 'directory',
            path: '/vue/src/assets',
            children: [
              {
                filename: 'vue.svg',
                kind: 'file',
                path: '/vue/src/assets/vue.svg',
                value:
                  '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="37.07" height="36" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 198"><path fill="#41B883" d="M204.8 0H256L128 220.8L0 0h97.92L128 51.2L157.44 0h47.36Z"></path><path fill="#41B883" d="m0 0l128 220.8L256 0h-51.2L128 132.48L50.56 0H0Z"></path><path fill="#35495E" d="M50.56 0L128 133.12L204.8 0h-47.36L128 51.2L97.92 0H50.56Z"></path></svg>',
                id: 'c81f6281-657c-4d1b-ba17-21eac2f960e8',
              },
            ],
            id: '30077231-7b11-4ac1-af1b-de8389039883',
          },
          {
            filename: 'components',
            kind: 'directory',
            path: '/vue/src/components',
            children: [
              {
                filename: 'HelloWorld.vue',
                kind: 'file',
                path: '/vue/src/components/HelloWorld.vue',
                value:
                  '<script setup lang="ts">\nimport { ref } from \'vue\'\n\ndefineProps<{ msg: string }>()\n\nconst count = ref(0)\n</script>\n\n<template>\n  <h1>{{ msg }}</h1>\n\n  <div class="card">\n    <button type="button" @click="count++">count is {{ count }}</button>\n    <p>\n      Edit\n      <code>components/HelloWorld.vue</code> to test HMR\n    </p>\n  </div>\n\n  <p>\n    Check out\n    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"\n      >create-vue</a\n    >, the official Vue + Vite starter\n  </p>\n  <p>\n    Learn more about IDE Support for Vue in the\n    <a\n      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"\n      target="_blank"\n      >Vue Docs Scaling up Guide</a\n    >.\n  </p>\n  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>\n</template>\n\n<style scoped>\n.read-the-docs {\n  color: #888;\n}\n</style>\n',
                id: '186d5612-e031-4fdc-a26d-377222474a92',
              },
            ],
            id: '06632ac5-1c24-4a4e-9fa4-33321eb0eefe',
          },
          {
            filename: 'main.ts',
            kind: 'file',
            path: '/vue/src/main.ts',
            value:
              "import { createApp } from 'vue'\nimport './style.css'\nimport App from './App.vue'\n\ncreateApp(App).mount('#app')\n",
            id: '5a8b48f6-1760-4529-82ec-d1b7efc8ec78',
          },
          {
            filename: 'style.css',
            kind: 'file',
            path: '/vue/src/style.css',
            value:
              ':root {\n  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;\n  line-height: 1.5;\n  font-weight: 400;\n\n  color-scheme: light dark;\n  color: rgba(255, 255, 255, 0.87);\n  background-color: #242424;\n\n  font-synthesis: none;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\na {\n  font-weight: 500;\n  color: #646cff;\n  text-decoration: inherit;\n}\na:hover {\n  color: #535bf2;\n}\n\nbody {\n  margin: 0;\n  display: flex;\n  place-items: center;\n  min-width: 320px;\n  min-height: 100vh;\n}\n\nh1 {\n  font-size: 3.2em;\n  line-height: 1.1;\n}\n\nbutton {\n  border-radius: 8px;\n  border: 1px solid transparent;\n  padding: 0.6em 1.2em;\n  font-size: 1em;\n  font-weight: 500;\n  font-family: inherit;\n  background-color: #1a1a1a;\n  cursor: pointer;\n  transition: border-color 0.25s;\n}\nbutton:hover {\n  border-color: #646cff;\n}\nbutton:focus,\nbutton:focus-visible {\n  outline: 4px auto -webkit-focus-ring-color;\n}\n\n.card {\n  padding: 2em;\n}\n\n#app {\n  max-width: 1280px;\n  margin: 0 auto;\n  padding: 2rem;\n  text-align: center;\n}\n\n@media (prefers-color-scheme: light) {\n  :root {\n    color: #213547;\n    background-color: #ffffff;\n  }\n  a:hover {\n    color: #747bff;\n  }\n  button {\n    background-color: #f9f9f9;\n  }\n}\n',
            id: '3e593a94-6563-45fa-8490-dd8c7daa21d4',
          },
          {
            filename: 'vite-env.d.ts',
            kind: 'file',
            path: '/vue/src/vite-env.d.ts',
            value: '/// <reference types="vite/client" />\n',
            id: '9b624edd-851c-42ea-b286-1a0bec7a1c1e',
          },
        ],
        id: '7b0f5a64-7375-4a40-b571-ba8c0f2c7252',
      },
      {
        filename: 'tsconfig.app.json',
        kind: 'file',
        path: '/vue/tsconfig.app.json',
        value:
          '{\n  "compilerOptions": {\n    "composite": true,\n    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",\n    "target": "ES2020",\n    "useDefineForClassFields": true,\n    "module": "ESNext",\n    "lib": ["ES2020", "DOM", "DOM.Iterable"],\n    "skipLibCheck": true,\n\n    /* Bundler mode */\n    "moduleResolution": "bundler",\n    "allowImportingTsExtensions": true,\n    "resolveJsonModule": true,\n    "isolatedModules": true,\n    "moduleDetection": "force",\n    "noEmit": true,\n    "jsx": "preserve",\n\n    /* Linting */\n    "strict": true,\n    "noUnusedLocals": true,\n    "noUnusedParameters": true,\n    "noFallthroughCasesInSwitch": true\n  },\n  "include": ["src/**/*.ts", "src/**/*.tsx", "src/**/*.vue"]\n}\n',
        id: 'bb29004b-44dc-44ab-85c3-5cd66c6d61e8',
      },
      {
        filename: 'tsconfig.json',
        kind: 'file',
        path: '/vue/tsconfig.json',
        value:
          '{\n  "files": [],\n  "references": [\n    {\n      "path": "./tsconfig.app.json"\n    },\n    {\n      "path": "./tsconfig.node.json"\n    }\n  ]\n}\n',
        id: 'd52bcbbe-99e6-46f5-ae46-58646354b623',
      },
      {
        filename: 'tsconfig.node.json',
        kind: 'file',
        path: '/vue/tsconfig.node.json',
        value:
          '{\n  "compilerOptions": {\n    "composite": true,\n    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",\n    "skipLibCheck": true,\n    "module": "ESNext",\n    "moduleResolution": "bundler",\n    "allowSyntheticDefaultImports": true,\n    "strict": true,\n    "noEmit": true\n  },\n  "include": ["vite.config.ts"]\n}\n',
        id: '07e48c29-f63a-4fd3-9c6d-e47c678db987',
      },
      {
        filename: 'vite.config.ts',
        kind: 'file',
        path: '/vue/vite.config.ts',
        value:
          "import { defineConfig } from 'vite'\nimport vue from '@vitejs/plugin-vue'\n\n// https://vitejs.dev/config/\nexport default defineConfig({\n  plugins: [vue()],\n})\n",
        id: 'db6ec036-708d-45bb-ba3a-737e04ec3758',
      },
    ],
    id: '8daeebf6-b468-4ca5-9087-683ae172d176',
  },
];

const VANILLA_TEMPLATE = [
  {
    filename: 'vanilla',
    kind: 'directory',
    path: '/vanilla',
    children: [
      {
        filename: '.gitignore',
        kind: 'file',
        path: '/vanilla/.gitignore',
        value:
          '# Logs\nlogs\n*.log\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\npnpm-debug.log*\nlerna-debug.log*\n\nnode_modules\ndist\ndist-ssr\n*.local\n\n# Editor directories and files\n.vscode/*\n!.vscode/extensions.json\n.idea\n.DS_Store\n*.suo\n*.ntvs*\n*.njsproj\n*.sln\n*.sw?\n',
        id: '56d08993-771a-40f8-908d-fd450e006119',
      },
      {
        filename: 'index.html',
        kind: 'file',
        path: '/vanilla/index.html',
        value:
          '<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <link rel="icon" type="image/svg+xml" href="/vite.svg" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>Vite + TS</title>\n  </head>\n  <body>\n    <div id="app"></div>\n    <script type="module" src="/src/main.ts"></script>\n  </body>\n</html>\n',
        id: '0ea6b28a-c675-4522-801a-d126c05d609e',
      },
      {
        filename: 'package.json',
        kind: 'file',
        path: '/vanilla/package.json',
        value:
          '{\n  "name": "vanilla",\n  "private": true,\n  "version": "0.0.0",\n  "type": "module",\n  "scripts": {\n    "dev": "vite",\n    "build": "tsc && vite build",\n    "preview": "vite preview"\n  },\n  "devDependencies": {\n    "typescript": "^5.2.2",\n    "vite": "^5.3.4"\n  }\n}\n',
        id: '06785ab3-41c3-4e56-a50e-c6f46596953b',
      },
      {
        filename: 'public',
        kind: 'directory',
        path: '/vanilla/public',
        children: [
          {
            filename: 'vite.svg',
            kind: 'file',
            path: '/vanilla/public/vite.svg',
            value:
              '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="31.88" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 257"><defs><linearGradient id="IconifyId1813088fe1fbc01fb466" x1="-.828%" x2="57.636%" y1="7.652%" y2="78.411%"><stop offset="0%" stop-color="#41D1FF"></stop><stop offset="100%" stop-color="#BD34FE"></stop></linearGradient><linearGradient id="IconifyId1813088fe1fbc01fb467" x1="43.376%" x2="50.316%" y1="2.242%" y2="89.03%"><stop offset="0%" stop-color="#FFEA83"></stop><stop offset="8.333%" stop-color="#FFDD35"></stop><stop offset="100%" stop-color="#FFA800"></stop></linearGradient></defs><path fill="url(#IconifyId1813088fe1fbc01fb466)" d="M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z"></path><path fill="url(#IconifyId1813088fe1fbc01fb467)" d="M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z"></path></svg>',
            id: '4e730463-9181-4bbc-a99d-c3115dd0724a',
          },
        ],
        id: '3025a160-81bc-47b4-8d33-0d4c704c6f87',
      },
      {
        filename: 'src',
        kind: 'directory',
        path: '/vanilla/src',
        children: [
          {
            filename: 'counter.ts',
            kind: 'file',
            path: '/vanilla/src/counter.ts',
            value:
              "export function setupCounter(element: HTMLButtonElement) {\n  let counter = 0\n  const setCounter = (count: number) => {\n    counter = count\n    element.innerHTML = `count is ${counter}`\n  }\n  element.addEventListener('click', () => setCounter(counter + 1))\n  setCounter(0)\n}\n",
            id: 'b1c9b9bc-5d83-4f5e-9e62-f97e4352668d',
          },
          {
            filename: 'main.ts',
            kind: 'file',
            path: '/vanilla/src/main.ts',
            value:
              'import \'./style.css\'\nimport typescriptLogo from \'./typescript.svg\'\nimport viteLogo from \'/vite.svg\'\nimport { setupCounter } from \'./counter.ts\'\n\ndocument.querySelector<HTMLDivElement>(\'#app\')!.innerHTML = `\n  <div>\n    <a href="https://vitejs.dev" target="_blank">\n      <img src="${viteLogo}" class="logo" alt="Vite logo" />\n    </a>\n    <a href="https://www.typescriptlang.org/" target="_blank">\n      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />\n    </a>\n    <h1>Vite + TypeScript</h1>\n    <div class="card">\n      <button id="counter" type="button"></button>\n    </div>\n    <p class="read-the-docs">\n      Click on the Vite and TypeScript logos to learn more\n    </p>\n  </div>\n`\n\nsetupCounter(document.querySelector<HTMLButtonElement>(\'#counter\')!)\n',
            id: '3e8bc179-7323-4b79-b6a2-c8f3f2dfa7ed',
          },
          {
            filename: 'style.css',
            kind: 'file',
            path: '/vanilla/src/style.css',
            value:
              ':root {\n  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;\n  line-height: 1.5;\n  font-weight: 400;\n\n  color-scheme: light dark;\n  color: rgba(255, 255, 255, 0.87);\n  background-color: #242424;\n\n  font-synthesis: none;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\na {\n  font-weight: 500;\n  color: #646cff;\n  text-decoration: inherit;\n}\na:hover {\n  color: #535bf2;\n}\n\nbody {\n  margin: 0;\n  display: flex;\n  place-items: center;\n  min-width: 320px;\n  min-height: 100vh;\n}\n\nh1 {\n  font-size: 3.2em;\n  line-height: 1.1;\n}\n\n#app {\n  max-width: 1280px;\n  margin: 0 auto;\n  padding: 2rem;\n  text-align: center;\n}\n\n.logo {\n  height: 6em;\n  padding: 1.5em;\n  will-change: filter;\n  transition: filter 300ms;\n}\n.logo:hover {\n  filter: drop-shadow(0 0 2em #646cffaa);\n}\n.logo.vanilla:hover {\n  filter: drop-shadow(0 0 2em #3178c6aa);\n}\n\n.card {\n  padding: 2em;\n}\n\n.read-the-docs {\n  color: #888;\n}\n\nbutton {\n  border-radius: 8px;\n  border: 1px solid transparent;\n  padding: 0.6em 1.2em;\n  font-size: 1em;\n  font-weight: 500;\n  font-family: inherit;\n  background-color: #1a1a1a;\n  cursor: pointer;\n  transition: border-color 0.25s;\n}\nbutton:hover {\n  border-color: #646cff;\n}\nbutton:focus,\nbutton:focus-visible {\n  outline: 4px auto -webkit-focus-ring-color;\n}\n\n@media (prefers-color-scheme: light) {\n  :root {\n    color: #213547;\n    background-color: #ffffff;\n  }\n  a:hover {\n    color: #747bff;\n  }\n  button {\n    background-color: #f9f9f9;\n  }\n}\n',
            id: 'b8c40d0d-a417-4fcb-8cff-0f0c06da0a0a',
          },
          {
            filename: 'typescript.svg',
            kind: 'file',
            path: '/vanilla/src/typescript.svg',
            value:
              '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--logos" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><path fill="#007ACC" d="M0 128v128h256V0H0z"></path><path fill="#FFF" d="m56.612 128.85l-.081 10.483h33.32v94.68h23.568v-94.68h33.321v-10.28c0-5.69-.122-10.444-.284-10.566c-.122-.162-20.4-.244-44.983-.203l-44.74.122l-.121 10.443Zm149.955-10.742c6.501 1.625 11.459 4.51 16.01 9.224c2.357 2.52 5.851 7.111 6.136 8.208c.08.325-11.053 7.802-17.798 11.988c-.244.162-1.22-.894-2.317-2.52c-3.291-4.795-6.745-6.867-12.028-7.233c-7.76-.528-12.759 3.535-12.718 10.321c0 1.992.284 3.17 1.097 4.795c1.707 3.536 4.876 5.649 14.832 9.956c18.326 7.883 26.168 13.084 31.045 20.48c5.445 8.249 6.664 21.415 2.966 31.208c-4.063 10.646-14.14 17.879-28.323 20.276c-4.388.772-14.79.65-19.504-.203c-10.28-1.828-20.033-6.908-26.047-13.572c-2.357-2.6-6.949-9.387-6.664-9.874c.122-.163 1.178-.813 2.356-1.504c1.138-.65 5.446-3.129 9.509-5.485l7.355-4.267l1.544 2.276c2.154 3.29 6.867 7.801 9.712 9.305c8.167 4.307 19.383 3.698 24.909-1.26c2.357-2.153 3.332-4.388 3.332-7.68c0-2.966-.366-4.266-1.91-6.501c-1.99-2.845-6.054-5.242-17.595-10.24c-13.206-5.69-18.895-9.224-24.096-14.832c-3.007-3.25-5.852-8.452-7.03-12.8c-.975-3.617-1.22-12.678-.447-16.335c2.723-12.76 12.353-21.659 26.25-24.3c4.51-.853 14.994-.528 19.424.569Z"></path></svg>',
            id: '9acb456d-dbcc-488c-a427-79b433b08dab',
          },
          {
            filename: 'vite-env.d.ts',
            kind: 'file',
            path: '/vanilla/src/vite-env.d.ts',
            value: '/// <reference types="vite/client" />\n',
            id: 'd34fd87f-2799-44c1-856d-e4ee4a0228f7',
          },
        ],
        id: 'b28f0791-68e9-4328-95ad-c5ed42a44ea3',
      },
      {
        filename: 'tsconfig.json',
        kind: 'file',
        path: '/vanilla/tsconfig.json',
        value:
          '{\n  "compilerOptions": {\n    "target": "ES2020",\n    "useDefineForClassFields": true,\n    "module": "ESNext",\n    "lib": ["ES2020", "DOM", "DOM.Iterable"],\n    "skipLibCheck": true,\n\n    /* Bundler mode */\n    "moduleResolution": "bundler",\n    "allowImportingTsExtensions": true,\n    "resolveJsonModule": true,\n    "isolatedModules": true,\n    "moduleDetection": "force",\n    "noEmit": true,\n\n    /* Linting */\n    "strict": true,\n    "noUnusedLocals": true,\n    "noUnusedParameters": true,\n    "noFallthroughCasesInSwitch": true\n  },\n  "include": ["src"]\n}\n',
        id: '90cef1ff-d6d0-41af-b5d5-5900cf2e6987',
      },
    ],
    id: '7d8f14d4-24fb-497b-98a4-97d9cbc6cfbc',
  },
];

export const templateList: Record<string, { template: any; icon: string; desc: string }> = {
  react: { template: REACT_TEMPLATE, icon: '/react.svg', desc: '基于vite的react基础模板' },
  vue: { template: VUE_TEMPLATE, icon: '/vue.svg', desc: '基于vite的vue基础模板' },
  vanilla: { template: VANILLA_TEMPLATE, icon: '/node.svg', desc: '基于vite的vanilla基础模板' },
};
