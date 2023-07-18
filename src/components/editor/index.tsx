import React, { useState, useEffect, FC } from "react";
import MonacoEditor from "react-monaco-editor";
import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";
import { editor } from "monaco-editor";
import styles from "./index.module.scss";
import { CaretDownOutlined } from "@ant-design/icons";
import { EditorTitleObjects } from "@/common/constant";
import { EditorTitleType } from "@/common/edit-title";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";

interface EditorProps {
  language: string;
  items: MenuProps["items"];
}

const Editor: FC<EditorProps> = (props: EditorProps) => {
  const { language, items } = props;
  console.log("🚀 ~ file: index.tsx:20 ~ language:", language);
  const [editTitle] = useState<EditorTitleType>(() => {
    const res = EditorTitleObjects.find(value => value.tag === language);
    return res as EditorTitleType;
  });

  const [code, setCode] = useState<string>(``);

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

  const onChange = (newValue: string) => {
    setCode(newValue);
  };

  const editorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    if (language === "javascript") editor.focus();
  };

  return (
    <div className={styles["root"]}>
      <header className={styles["edit-header"]}>
        <h2 className={styles["language"]}>
          {editTitle.svg}
          <span>{editTitle.title}</span>
        </h2>
        <div className={styles["control"]}>
          <Dropdown menu={{ items }}>
            <CaretDownOutlined rev={undefined} style={{ fontSize: "20px" }} />
          </Dropdown>
        </div>
      </header>
      <div className={styles["monaco-editor"]}>
        <MonacoEditor
          language={language}
          height="100vh"
          width="100vw"
          theme="vs-dark"
          value={code}
          options={{ selectOnLineNumbers: true, folding: true }}
          onChange={onChange}
          editorDidMount={editorDidMount}
        />
      </div>
    </div>
  );
};

export default Editor;
