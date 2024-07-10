'use client';

import { useCallback } from 'react';
import Editor, { Monaco, loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

import {
  useEditorStore,
  useMonacoStore,
  useModelsStore,
  useActiveModelStore,
  useActiveEditorStore,
} from '@/store/editorStore';
import { setModelsFromInfo } from '@/components/editor/utils';
import { Tabbar } from '@/components/edit/tabbar';
interface CodeEditorProps {
  editorId: number;
}

const modelsInfo = [
  {
    filename: '1.py',
    language: 'python',
    value: `1111print("Hello World!")`,
  },
  {
    filename: '2.js',
    language: 'javascript',
    value: `2222console.log("Hello World!")`,
  },
  {
    filename: '333.ts',
    language: 'typescript',
    value: `3333console.log("Hello World!")`,
  },
  {
    filename: 'ma5in.ts',
    language: 'typescript',
    value: `5555console.log("Hello World!")`,
  },
  {
    filename: 'ma6in.ts',
    language: 'typescript',
    value: `6666console.log("Hello World!")`,
  },
];

export default function CodeEditor({ editorId }: CodeEditorProps) {
  const { getEditor, setEditor } = useEditorStore();
  const { setMonaco } = useMonacoStore();
  const { setModels } = useModelsStore();
  const { activeMap, setActiveModel } = useActiveModelStore();
  const { activeEditorId, setActiveEditor } = useActiveEditorStore();
  const thisEditor = getEditor(editorId);
  const currentModel = activeMap[editorId];
  console.log(currentModel, thisEditor, currentModel || thisEditor);

  const handleEditorDidMount = useCallback(
    (editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) => {
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

      if (editorId === 0) {
        setModelsFromInfo(modelsInfo, monaco, editor, setModels, setActiveModel, editorId);
      } else {
        const newModel = activeEditorId < 1 ? activeMap[0] : activeMap[1];
        newModel.model && setActiveModel(newModel.modelId, newModel.model, editorId);
        newModel.model &&
          setModels(
            { filename: newModel.modelId, value: '', language: 'typescript' },
            newModel.model,
            editorId,
          );
        editor.setModel(newModel.model);
      }

      monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: false,
        noSyntaxValidation: false,
      });
      editor.onDidFocusEditorText(() => {
        setActiveEditor(editor, editorId);
      });

      loader.init().then(/* ... */);
    },
    [],
  );

  const handleEditorChange = (value: string = ''): void => {
    console.log(value);
  };

  return (
    (thisEditor === null || currentModel?.model) && (
      <div className=" w-full h-full flex flex-col">
        <div className=" h-[4.5vh] w-full bg-[#202327]/80">
          <Tabbar editorId={editorId} />
        </div>
        <Editor
          className={'editor'}
          theme="vs-dark"
          language={'typescript'}
          options={{
            minimap: { enabled: true },
            fontSize: 16,
            wordWrap: 'on', // 是否换行
            automaticLayout: true,
          }}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
        />
      </div>
    )
  );
}
