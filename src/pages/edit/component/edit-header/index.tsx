import React from "react";
import { CloseOutlined } from "@ant-design/icons";

import styles from "./index.module.scss";

import { useAppSelector } from "@/store";
import { fileTypeIconMap } from "@/common";
import { getFileSuffix } from "@/utils";

const EditHeader = () => {
  const { formatPath, globalFileConfigPath } = useAppSelector(
    state => state.code,
  );
  return (
    <div className={styles["root"]}>
      <div className={styles["edit-header-left"]}>
        <div className={styles["editor-tab"]}>
          <img
            src={fileTypeIconMap.get(
              getFileSuffix(formatPath || globalFileConfigPath),
            )}
            alt=""
          />
          <span className={styles["edit-file-name"]}>
            {formatPath || globalFileConfigPath}
          </span>
          <CloseOutlined rev={undefined} style={{ cursor: "pointer" }} />
        </div>
      </div>
      <div className={styles["edit-header-right"]}>2</div>
    </div>
  );
};

export default EditHeader;
