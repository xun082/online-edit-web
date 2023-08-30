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

import {
  readFile,
  writeFile,
  getFileSuffix,
  PRETTIER_FORMAT_PATH,
  saveFileSystemTree,
  DEFAULT_PRETTIER_CONFIG,
} from "@/utils";
import { WebContainerContext } from "@/context";
import { useAppSelector } from "@/store";
import { UserCustomConfig } from "@/types";

interface ICodeEditorProps {
  filePath: string;
}

export default function CodeEditor({ filePath }: ICodeEditorProps) {
  const [content, setContent] = useState<string>("");
  const { isWebContainerFile, globalFileConfigPath } = useAppSelector(
    state => state.code,
  );

  const webcontainerInstance = useContext(WebContainerContext) as WebContainer;

  useEffect(() => {
    async function readFile2content() {
      const fileContent = await readFile(filePath, webcontainerInstance);

      setContent(fileContent);
    }

    // 如果文件 path 存在且是 webcontainer 的文件
    if (filePath && isWebContainerFile) {
      readFile2content();
    }

    if (globalFileConfigPath && !isWebContainerFile) {
      const storage = localStorage.getItem(globalFileConfigPath) as string;

      if (!storage) {
        localStorage.setItem(globalFileConfigPath, DEFAULT_PRETTIER_CONFIG);
        setContent(DEFAULT_PRETTIER_CONFIG);
      } else {
        setContent(storage);
      }
    }
  }, [filePath, globalFileConfigPath]);

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();

        if (!content) return;

        let result: string = "";
        const path = localStorage.getItem(PRETTIER_FORMAT_PATH) as string;
        if (path) {
          result = await readFile(path, webcontainerInstance);
        } else {
          result = localStorage.getItem(
            UserCustomConfig.GLOBAL_PRETTIER_CONFIG,
          ) as string;
        }

        const prettierFileContent = JSON.parse(result);

        const worker = new Worker(new URL("./worker.ts", import.meta.url), {
          type: "module",
        });

        worker.onmessage = event => {
          if (event.data.error) {
            console.error(event.data.error);
          } else {
            setContent(event.data);
            localStorage.setItem(globalFileConfigPath, event.data);

            if (isWebContainerFile === true) {
              writeFile(filePath, event.data, webcontainerInstance);
              saveFileSystemTree(webcontainerInstance);
            }
          }
          worker.terminate();
        };

        worker.postMessage({
          content: content,
          type: getFileSuffix(
            isWebContainerFile ? filePath : globalFileConfigPath,
          ),
          prettierConfig: prettierFileContent ? prettierFileContent : {},
        });
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [content]);

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

  const handleEditorChange = (value: string = ""): void => {
    if (filePath) {
      writeFile(filePath, value, webcontainerInstance);
    }

    setContent(value);
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
