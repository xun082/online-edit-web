import React, { useEffect, useMemo, useState } from "react";
import Editor, { loader } from "@monaco-editor/react";
import * as monaco from "monaco-editor";

import { readFile, writeFile } from "@/webContainer";

monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
  jsx: monaco.languages.typescript.JsxEmit.React,
});

loader.config({ monaco });

loader.init().then(/* ... */);

interface ICodeEditorProps {
  filePath: string;
}

export default function CodeEditor({ filePath }: ICodeEditorProps) {
  const [content, setContent] = useState("");

  useEffect(() => {
    async function readFile2content() {
      const fileContent = await readFile(filePath);

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

  return (
    <Editor
      theme="vs-dark"
      language={language}
      value={content}
      options={{
        minimap: { enabled: true },
        fontSize: 16,
        readOnly: !filePath,
      }}
      onChange={value => {
        if (filePath) {
          writeFile(filePath, value || "");
          setContent(value || "");
        }
      }}
    />
  );
}
