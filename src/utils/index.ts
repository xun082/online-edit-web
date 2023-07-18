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
            <style>${cssCode}</style>
        </head>
        <body>
            ${htmlCode}
            <script>${javascriptCode}</script>
        </body>
    </html>
    `;
  return url;
}
