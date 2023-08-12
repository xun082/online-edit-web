import React, { useEffect, FC } from "react";
import MonacoEditor from "react-monaco-editor";
import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";
import parserCss from "prettier/parser-postcss";
import parserHtml from "prettier/parser-html";

import { useAppDispatch, useAppSelector } from "@/store";
import { changeCode } from "@/store/modules/code";
import { languageType } from "@/types";
import { removeSemicolonAfterClosingTag } from "@/utils";

interface EditorProps {
  language: languageType;
}

const Editor: FC<EditorProps> = (props: EditorProps) => {
  const { language } = props;
  const { code } = useAppSelector(state => state.code);

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
    <MonacoEditor
      language={language}
      theme="vs-dark"
      width="100vw"
      height="100vh"
      value={code[language]}
      options={{
        lineNumbers: "on",
        lineDecorationsWidth: 1,
        selectOnLineNumbers: true,
        folding: true,
        // 设置代码折叠策略
        foldingStrategy: "indentation", // 或 'auto'
        // 设置默认折叠级别
        foldingHighlight: true, // 或 'background'
      }}
      onChange={onChange}
      editorDidMount={editor => {
        if (language === "javascript") editor.focus();
      }}
    />
  );
};

export default Editor;
