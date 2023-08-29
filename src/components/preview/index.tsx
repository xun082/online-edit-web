import React, { FC, memo, useState, ChangeEvent, useEffect } from "react";
import { UndoOutlined, LockOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { v4 as uniqueKey } from "uuid";

import styles from "./index.module.scss";

import { LinkData } from "@/types";

// 将数据和其他逻辑拆分
interface PreviewProps {
  data: LinkData;
}

export const Preview: FC<PreviewProps> = memo(function Preview({ data }) {
  const { uuid, src } = data;

  const [iframeUrl, setIframeUrl] = useState<string>("");
  const [id, setId] = useState<string>(uuid);

  useEffect(() => {
    setIframeUrl(src);
  }, [src]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIframeUrl(event.target.value);
  };

  return (
    <main className={styles["root"]}>
      <header className={styles["iframe-header"]}>
        <UndoOutlined
          rev={undefined}
          className={styles["iframe-refresh"]}
          onClick={() => setId(uniqueKey())}
        />
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="type"
          className={styles["iframe-router"]}
          value={iframeUrl}
          onChange={handleInputChange}
        />
      </header>
      <iframe
        className={styles["iframe-content"]}
        width="100%"
        height="100%"
        src={iframeUrl}
        key={id}
      ></iframe>
      ;
    </main>
  );
});
