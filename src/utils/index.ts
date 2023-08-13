interface getPreviewUrlProps {
  css: string | "";
  html: string | "";
  javascript: string | "";
}

export function getPreviewUrl(props: getPreviewUrlProps) {
  const { css, html, javascript } = props;
  const cssCode = encodeURIComponent(css);
  const htmlCode = encodeURIComponent(html);
  const javascriptCode = encodeURIComponent(javascript);

  const url: string = `
  data:text/html;charset=UTF-8,
<html>
  <head>
    <style>
      ${cssCode}
    </style>
  </head>
  <body>
    ${htmlCode}
    <script src="./console.js"></script>
    <script>
      ${javascriptCode}
    </script>
  </body>
</html>
`;
  return url;
}

export function removeSemicolonAfterClosingTag(str: string) {
  const regex = /<\/\w+>\s*;/g;
  return str.replace(regex, match => match.replace(";", ""));
}

export function uint8Array2string(u: Uint8Array) {
  const utf8decoder = new TextDecoder();
  return utf8decoder.decode(u);
}
