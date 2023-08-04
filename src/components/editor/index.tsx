import React, { useState, useEffect, FC } from "react";
import MonacoEditor from "react-monaco-editor";
import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";
import parserCss from "prettier/parser-postcss";
import parserHtml from "prettier/parser-html";
import styles from "./index.module.scss";
import { CaretDownOutlined } from "@ant-design/icons";
import { EditorTitleObjects } from "@/common/constant";
import { EditorTitleType } from "@/common/edit-title";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { useAppDispatch, useAppSelector } from "@/store";
import { changeCode } from "@/store/modules/code";
import { languageType } from "@/types";
import { removeSemicolonAfterClosingTag } from "@/utils";

interface EditorProps {
  language: languageType;
  items: MenuProps["items"];
}

const Editor: FC<EditorProps> = (props: EditorProps) => {
  const { language, items } = props;
  const { code } = useAppSelector(state => state.code);

  const [editTitle] = useState<EditorTitleType>(() => {
    const res = EditorTitleObjects.find(value => value.tag === language);
    return res as EditorTitleType;
  });
  const dispatch = useAppDispatch();

  // 代码实现自动格式化
  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        try {
          const newCode = await prettier.format(code[language], {
            parser: language === "css" ? "css" : "babel",
            plugins:
              language === "css"
                ? [parserCss, parserHtml]
                : [parserBabel, parserHtml],
            printWidth: 80,
            tabWidth: 2,
          });
          dispatch(
            changeCode({
              newCode:
                language === "html"
                  ? removeSemicolonAfterClosingTag(newCode)
                  : newCode,
              language,
            }),
          );
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

  const onChange = (newCode: string) => {
    dispatch(changeCode({ newCode, language }));
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
          value={code[language]}
          options={{
            selectOnLineNumbers: true,
            folding: true,
          }}
          onChange={onChange}
          editorDidMount={editor => {
            if (language === "javascript") editor.focus();
          }}
        />
      </div>
    </div>
  );
};

export default Editor;
