import React, {
  useEffect,
  useMemo,
  useState,
  useContext,
  useCallback,
} from "react";
import Editor, { Monaco, loader } from "@monaco-editor/react";
import { WebContainer } from "@webcontainer/api";
import {
  MonacoJsxSyntaxHighlight,
  getWorker,
} from "monaco-jsx-syntax-highlight";

import "./index.scss";

import { readFile, writeFile, getFileSuffix } from "@/utils";
import WebContainerContext from "@/context/webContainer";

interface ICodeEditorProps {
  filePath: string;
}

export default function CodeEditor({ filePath }: ICodeEditorProps) {
  const [content, setContent] = useState("");
  const webcontainerInstance = useContext(WebContainerContext) as WebContainer;

  useEffect(() => {
    async function readFile2content() {
      const fileContent = await readFile(filePath, webcontainerInstance);

      setContent(fileContent);
    }

    if (filePath) {
      readFile2content();
    }
  }, [filePath]);

  const handleEditorDidMount = useCallback((editor: any, monaco: Monaco) => {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      ...monaco.languages.typescript.typescriptDefaults.getCompilerOptions(),
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

    loader.config({ monaco });

    loader.init().then(/* ... */);

    const monacoJsxSyntaxHighlight = new MonacoJsxSyntaxHighlight(
      getWorker(),
      monaco,
    );

    const { highlighter, dispose } =
      monacoJsxSyntaxHighlight.highlighterBuilder({
        editor: editor,
      });
    // init highlight
    highlighter();

    editor.onDidChangeModelContent(() => {
      // content change, highlight
      highlighter();
    });

    return dispose;
  }, []);

  const language = useMemo(() => {
    const stuff = getFileSuffix(filePath) || "default";

    const languageMap: Record<string, string> = {
      js: "javascript",
      mjs: "javascript",
      css: "css",
      ts: "typescript",
      tsx: "typescript",
      html: "html",
      json: "json",
      md: "markdown",
      yaml: "yaml",
      prettierrc: "json",
      default: "json",
    };

    return languageMap[stuff];
  }, [filePath]);

  const handleEditorChange = (value: string | undefined): void => {
    if (filePath) {
      writeFile(filePath, value || "", webcontainerInstance);
      setContent(value || "");
    }
  };

  return (
    <Editor
      className={"editor"}
      theme="vs-dark"
      language={language}
      value={content}
      options={{
        minimap: { enabled: true },
        fontSize: 16,
        wordWrap: "on", // 是否换行
        automaticLayout: true,
      }}
      onChange={handleEditorChange}
      onMount={handleEditorDidMount}
    />
  );
}
