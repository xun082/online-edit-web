import React, { useEffect, useMemo, useState, useContext } from "react";
import Editor, { loader, useMonaco } from "@monaco-editor/react";
import { WebContainer } from "@webcontainer/api";

import { readFile, writeFile } from "@/utils";
import WebContainerContext from "@/context/webContainer";

interface ICodeEditorProps {
  filePath: string;
}

export default function CodeEditor({ filePath }: ICodeEditorProps) {
  const [content, setContent] = useState("");
  const webcontainerInstance = useContext(WebContainerContext) as WebContainer;

  const monaco = useMonaco();

  useEffect(() => {
    async function readFile2content() {
      const fileContent = await readFile(filePath, webcontainerInstance);

      setContent(fileContent);
    }

    if (filePath) {
      readFile2content();
    } else {
      setContent("");
    }
  }, [filePath]);

  useEffect(() => {
    if (monaco) {
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        ...monaco.languages.typescript.typescriptDefaults.getCompilerOptions(),
        module: monaco.languages.typescript.ModuleKind.ESNext,
        target: monaco.languages.typescript.ScriptTarget.ESNext,
        moduleResolution:
          monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        isolatedModules: true,
        allowJs: true,
        strict: true,
        skipLibCheck: true,
        jsx: monaco.languages.typescript.JsxEmit.React,
      });
      monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
      monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSuggestionDiagnostics: true,
      });

      loader.config({ monaco });

      loader.init().then(/* ... */);
    }
  }, [monaco]);

  const language = useMemo(() => {
    const stuff = filePath.slice(filePath.lastIndexOf(".") + 1) || "default";

    const languageMap: Record<string, string> = {
      js: "javascript",
      mjs: "javascript",
      css: "css",
      ts: "typescript",
      tsx: "typescript",
      html: "html",
      json: "json",
      md: "md",
      yaml: "yaml",
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
      theme="vs-dark"
      language={language}
      value={content}
      options={{
        minimap: { enabled: true },
        fontSize: 16,
        wordWrap: "on", // 是否换行
        cursorWidth: 50, // 光标宽度
      }}
      onChange={handleEditorChange}
    />
  );
}
