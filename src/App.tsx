import React, { useState, useEffect } from "react";
import MonacoEditor from "react-monaco-editor";
import { editor } from "monaco-editor";
import "./styles/index.css";
import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";
import Header from "./components/header";

const App = () => {
  const [code, setCode] = useState<string>(`const code = "moment"`);
  const [previewUrl, setPreviewUrl] = useState("");
  const options = {
    selectOnLineNumbers: true,
    folding: true,
  };

  // 代码实现自动格式化
  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        try {
          const formattedCode = await prettier.format(code, {
            parser: "babel",
            plugins: [parserBabel],
            printWidth: 300,
          });
          setCode(formattedCode);
        } catch (error) {
          alert(`代码格式化失败:${error}`);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [code]);

  const editorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    console.log("editorDidMount", editor);
    editor.focus();
  };

  const onChange = (newValue: string) => {
    setCode(newValue);
  };

  // 点击预览按钮，更新预览 URL
  const handlePreview = () => {
    const encodedCode = encodeURIComponent(code);
    const url = `data:text/html;charset=UTF-8,<html><body><script>${encodedCode}</script></body></html>`;
    setPreviewUrl(url);
  };

  return (
    <>
      <Header />
      <button onClick={handlePreview}>预览</button>
      <MonacoEditor
        width="100vw"
        height="60vh"
        language="javascript"
        theme="vs-dark"
        value={code}
        options={options}
        onChange={onChange}
        editorDidMount={editorDidMount}
      />
      <iframe className="preview-iframe" src={previewUrl} />
    </>
  );
};

export default App;
