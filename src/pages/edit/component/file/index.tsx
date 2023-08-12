import React from "react";
import { CloudDownloadOutlined } from "@ant-design/icons";

import styles from "./index.module.scss";

const File = () => {
  return (
    <div className={styles["root"]}>
      <div className={styles["project-download"]}>
        <h2 className={styles["title"]}>PROJECT</h2>

        <CloudDownloadOutlined rev={undefined} style={{ color: "#F0F0F0" }} />
      </div>
    </div>
  );
};

export default File;
