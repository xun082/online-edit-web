'use client';

import { useCallback } from 'react';
import Editor, { Monaco, loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { editor } from 'monaco-editor';
import { useDroppable } from '@dnd-kit/core';
import { createHighlighter } from 'shiki';
import { shikiToMonaco } from '@shikijs/monaco';

import {
  useEditorStore,
  useMonacoStore,
  useActiveModelStore,
  useActiveEditorStore,
  useModelsStore,
} from '@/store/editorStore';
import { TabBar } from '@/components/edit/tabbar';
import LoadingComponent from '@/components/edit/edit-loading';
import { useWebContainerStore } from '@/store/webContainerStore';
import { useUploadFileDataStore } from '@/store/uploadFileDataStore';
import { cn, writeFile, MONACO_THEME_ARRAY } from '@/utils';

interface CodeEditorProps {
  editorId: number;
}
export type EditorWithThemeService = monaco.editor.IStandaloneCodeEditor & { _themeService: any };

export default function CodeEditor({ editorId }: CodeEditorProps) {
  const { webContainerInstance } = useWebContainerStore();
  const { updateItem } = useUploadFileDataStore();
  const { getEditor, setEditor } = useEditorStore();
  const { setMonaco } = useMonacoStore();
  const { setModels, models } = useModelsStore();
  const { activeMap, setActiveModel } = useActiveModelStore();
  const { activeEditorId, setActiveEditor } = useActiveEditorStore();
  const thisEditor = getEditor(editorId);
  const currentModel = activeMap[editorId];
  console.log(thisEditor);
  // used for dnd
  // console.log(activeMap, activeEditorId);
  // 当前编辑model的path，用于与webContainer文件系统同步

  const currentPath = (activeMap[editorId]?.model as any)?.path;
  const currentId = activeMap[editorId]?.model?.id;

  // const [prettierConfig, setPrettierConfig] = useState<any>(null);

  const { isOver, setNodeRef } = useDroppable({
    id: editorId,
    data: {
      editorInstance: thisEditor,
    },
  });

  const style = {
    border: isOver ? '1px #3b82f6 solid' : undefined,
  };

  // useEffect(() => {
  //   const loadPrettierConfig = async () => {
  //     if (webContainerInstance) {
  //       try {
  //         const configFile = await webContainerInstance.fs.readFile('.prettierrc.js', 'utf-8');
  //         console.log('加载的 Prettier 配置:', configFile); // 添加这行日志

  //         const configFunction = new Function(`return ${configFile}`)();
  //         console.log('.prettierrc.js文件内容', configFunction);
  //         setPrettierConfig(configFunction);
  //       } catch (error) {
  //         console.log('.prettierrc.js 文件不存在，使用默认配置');
  //         setPrettierConfig({
  //           semi: true,
  //           singleQuote: true,
  //           tabWidth: 2,
  //           trailingComma: 'es5',
  //           printWidth: 100,
  //         });
  //       }
  //     }
  //   };

  //   loadPrettierConfig();
  // }, [webContainerInstance]);

  const formatWithPrettier = async () => {
    if (!thisEditor) return;

    try {
      const model = (thisEditor as editor.IStandaloneCodeEditor).getModel();
      if (!model) return;

      const unformattedCode = model.getValue();
      const prettier = await import('prettier/standalone');
      const formattedCode = await prettier.format(unformattedCode, {
        parser: 'babel',
        semi: true,
        singleQuote: true,
      });

      // 应用格式化后的代码
      model.pushEditOperations(
        [],
        [
          {
            range: model.getFullModelRange(),
            text: formattedCode,
          },
        ],
        () => null,
      );
    } catch (error) {
      console.error('格式化代码时出错:', error);
    }
  };

  const handleEditorDidMount = useCallback(
    async (editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) => {
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        module: monaco.languages.typescript.ModuleKind.ESNext,
        moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        isolatedModules: true,
        allowJs: true,
        strict: true,
        skipLibCheck: true,
        jsx: monaco.languages.typescript.JsxEmit.Preserve,
        target: monaco.languages.typescript.ScriptTarget.ES2020,
        esModuleInterop: true,
      });

      setEditor(editorId, editor);
      setMonaco(editorId, monaco);

      const highlighter = await createHighlighter({
        themes: MONACO_THEME_ARRAY,
        langs: ['javascript', 'typescript', 'vue', 'jsx'],
      });

      // Register the languageIds first. Only registered languages will be highlighted.
      monaco.languages.register({ id: 'vue' });
      monaco.languages.register({ id: 'typescript' });
      monaco.languages.register({ id: 'javascript' });
      monaco.languages.register({ id: 'jsx' });

      // Register the themes from Shiki, and provide syntax highlighting for Monaco.
      shikiToMonaco(highlighter, monaco);

      const localTheme = localStorage.getItem('localTheme');

      if (localTheme && MONACO_THEME_ARRAY.includes(localTheme)) {
        editor?.updateOptions({ theme: localTheme });
      }

      localStorage.setItem(
        'localTheme',
        (editor as EditorWithThemeService)._themeService._theme.themeName,
      );

      if (editorId !== 0) {
        const newModel = activeEditorId < 1 ? activeMap[0] : activeMap[1];
        newModel.model && setActiveModel(newModel.modelId, newModel.model, editorId);
        newModel.model &&
          setModels(
            { filename: newModel.modelId, value: '', language: 'typescript', id: newModel.modelId },
            newModel.model.model,
            editorId,
            newModel.modelId,
          );
        editor.setModel(newModel.model?.model as editor.ITextModel);
      }

      if (models.length === 0) {
        const defaultModel = monaco.editor.createModel('', 'typescript');
        editor.setModel(defaultModel);
      }

      monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: false,
        noSyntaxValidation: false,
      });
      editor.onDidFocusEditorText(() => {
        setActiveEditor(editor, editorId);
      });

      // 添加键盘事件监听器
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
        formatWithPrettier();
      });

      loader.init().then(/* ... */);
    },
    [],
  );

  const handleEditorChange = (value: string = ''): void => {
    currentId && updateItem(currentId, { value });
    webContainerInstance && writeFile(currentPath, value, webContainerInstance);
  };

  return (
    <div
      ref={setNodeRef}
      className={cn(
        ' w-full h-full flex-col border-[1px] hidden',
        (thisEditor === null || currentModel?.model) && ' flex',
      )}
      style={style}
    >
      <div className=" h-[3.5vh] w-full bg-[#202327]/80">
        <TabBar editorId={editorId} />
      </div>
      <Editor
        className={'editor'}
        theme="dark-plus"
        options={{
          minimap: { enabled: true },
          fontSize: 16,
          wordWrap: 'on', // 是否换行
          automaticLayout: true,
        }}
        loading={<LoadingComponent></LoadingComponent>}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
      />
    </div>
  );
}
