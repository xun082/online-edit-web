import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";
import parserHTML from "prettier/parser-html";
import parserMarkdown from "prettier/parser-markdown";
import parserYaml from "prettier/parser-yaml";
import parserCss from "prettier/parser-postcss";

self.onmessage = event => {
  const { content, type, prettierConfig } = event.data;

  async function codeFormatting() {
    let parserPlugin;
    let parseType;
    // 根据不同的文件类型选择合适的 parser 插件
    switch (type) {
      case "js":
      case "jsx":
      case "ts":
      case "tsx":
        parserPlugin = parserBabel;
        parseType = "babel";
        break;
      case "html":
      case "vue":
        parserPlugin = parserHTML;
        parseType = type;
        break;
      case "md":
        parserPlugin = parserMarkdown;
        parseType = "markdown";
        break;
      case "yaml":
        parserPlugin = parserYaml;
        parseType = type;
        break;
      case "json":
        parserPlugin = parserBabel;
        parseType = type;
        break;
      case "less":
      case "css":
      case "scss":
        parserPlugin = parserCss;
        parseType = type;
        break;
      // 如果没有匹配的类型，默认使用 Babel 解析器插件
      default:
        parserPlugin = parserBabel;
    }

    const formattedCode = await prettier.format(content, {
      parser: parseType,
      plugins: [parserPlugin],
      vueIndentScriptAndStyle: true,
      ...prettierConfig,
    });

    self.postMessage(formattedCode);
  }
  codeFormatting();
};
