import React, { FC, memo } from "react";

import { LinkData } from "@/types";

// 将数据和其他逻辑拆分
interface PreviewProps {
  data: LinkData;
}

export const Preview: FC<PreviewProps> = memo(function Preview({ data }) {
  const { uuid, src } = data;
  return <iframe width="100%" height="100%" src={src} key={uuid}></iframe>;
});
