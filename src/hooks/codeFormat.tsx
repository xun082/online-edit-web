import { useEffect, useState } from "react";
import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";

const useCodeFormatting = (initialCode: string) => {
  const [code, setCode] = useState<string>(initialCode);
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

  return code;
};

export default useCodeFormatting;
