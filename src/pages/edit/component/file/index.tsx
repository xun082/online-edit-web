import React, { useState } from "react";
import { CloudDownloadOutlined } from "@ant-design/icons";

import styles from "./index.module.scss";

import Collapse from "@/components/collapse";

const File = () => {
  const [filePath, setFilePath] = useState("");
  console.log("🚀 ~ file: index.tsx:11 ~ File ~ filePath:", filePath);
  return (
    <div className={styles["root"]}>
      <div className={styles["project-download"]}>
        <h2 className={styles["title"]}>PROJECT</h2>
        <CloudDownloadOutlined rev={undefined} style={{ color: "#F0F0F0" }} />
      </div>
      <Collapse />
    </div>
  );
};

export default File;
