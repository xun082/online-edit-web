const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const isDevelopment = process.env.NODE_ENV === "development";

const webpack = {
  plugins: [
    new MonacoWebpackPlugin([
      "apex",
      "azcli",
      "bat",
      "clojure",
      "coffee",
      "cpp",
      "csharp",
      "csp",
      "css",
      "dockerfile",
      "fsharp",
      "go",
      "handlebars",
      "html",
      "ini",
      "java",
      "javascript",
      "json",
      "less",
      "lua",
      "markdown",
      "msdax",
      "mysql",
      "objective",
      "perl",
      "pgsql",
      "php",
      "postiats",
      "powerquery",
      "powershell",
      "pug",
      "python",
      "r",
      "razor",
      "redis",
      "redshift",
      "ruby",
      "rust",
      "sb",
      "scheme",
      "scss",
      "shell",
      "solidity",
      "sql",
      "st",
      "swift",
      "typescript",
      "vb",
      "xml",
      "yaml",
    ]),
  ],
  devServer: {
    headers: {
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Cross-Origin-Opener-Policy": "same-origin",
    },
  },
};

if (isDevelopment) {
  webpack.optimization = {
    splitChunks: {
      cacheGroups: {
        reactMonacoEditor: {
          test: /[\\/]node_modules[\\/]react-monaco-editor[\\/]/,
          name: "react-monaco-editor",
          chunks: "all",
          minSize: 0,
          minChunks: 1,
        },
        prettier: {
          test: /[\\/]node_modules[\\/]prettier[\\/]/,
          name: "prettier",
          chunks: "all",
          minSize: 0,
          minChunks: 1,
        },
      },
    },
  };
}

module.exports = webpack;
