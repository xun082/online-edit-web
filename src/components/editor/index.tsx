'use client';

import { useCallback } from 'react';
import Editor, { Monaco, loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

export default function CodeEditor() {
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

      console.log(editor);

      monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: false,
        noSyntaxValidation: false,
      });

      loader.config({ monaco });

      loader.init().then(/* ... */);
    },
    [],
  );

  const handleEditorChange = (value: string = ''): void => {
    console.log(1, value);
  };

  return (
    <Editor
      className={'editor'}
      theme="vs-dark"
      language={'typescript'}
      value={'const foo: string = 1;'}
      options={{
        minimap: { enabled: true },
        fontSize: 16,
        wordWrap: 'on', // 是否换行
        automaticLayout: true,
      }}
      onChange={handleEditorChange}
      onMount={handleEditorDidMount}
    />
  );
}
