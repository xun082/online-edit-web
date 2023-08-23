import React, { useEffect, useMemo, useState, useContext } from "react";
import Editor, { loader } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { WebContainer } from "@webcontainer/api";

import { readFile, writeFile } from "@/utils/webContainer";
import WebContainerContext from "@/context/webContainer";

monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
  ...monaco.languages.typescript.typescriptDefaults.getCompilerOptions(),
  module: monaco.languages.typescript.ModuleKind.ESNext,
  target: monaco.languages.typescript.ScriptTarget.ESNext,
  moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
  isolatedModules: true,
  allowJs: true,
  strict: true,
  skipLibCheck: true,
  jsx: monaco.languages.typescript.JsxEmit.React,
});

monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
  noSuggestionDiagnostics: true,
});

loader.config({ monaco });

loader.init().then(/* ... */);

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
    } else {
      setContent("");
    }
  }, [filePath]);

  const language = useMemo(() => {
    const stuff = filePath.split(".").pop() || "default";

    const languageMap: Record<string, string> = {
      js: "javascript",
      mjs: "javascript",
      css: "css",
      ts: "typescript",
      tsx: "typescript",
      html: "html",
      json: "json",
      default: "javascript",
    };

    return languageMap[stuff];
  }, [filePath]);
  console.log(language);

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
      }}
      onChange={handleEditorChange}
    />
  );
}
