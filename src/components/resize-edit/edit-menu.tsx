import React from "react";
import type { MenuProps } from "antd";
import { languageType } from "@/types";

const Html: MenuProps["items"] = [
  {
    label: <span>折叠所有</span>,
    key: "0",
  },
  {
    label: <span>展开所有</span>,
    key: "1",
  },
];

const Css: MenuProps["items"] = [
  {
    label: <span>折叠所有</span>,
    key: "0",
  },
  {
    label: <span>展开所有</span>,
    key: "1",
  },
];

const JavaScript: MenuProps["items"] = [
  {
    label: <span>折叠所有</span>,
    key: "0",
  },
  {
    label: <span>展开所有</span>,
    key: "1",
  },
];

interface editorLanguageType {
  languages: languageType;
  menu: MenuProps["items"];
  index: number;
}

const editorLanguage: Array<editorLanguageType> = [
  { languages: "html", menu: Html, index: 1 },
  { languages: "css", menu: Css, index: 2 },
  { languages: "javascript", menu: JavaScript, index: 3 },
];

export default editorLanguage;
