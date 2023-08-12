import React, { FC } from "react";
import { PanelResizeHandle } from "react-resizable-panels";

import styles from "./index.module.scss";

interface ResizeHandleType {
  direction?: "vertical" | "horizontal";
}

const ResizeHandle: FC<ResizeHandleType> = props => {
  const { direction = "horizontal" } = props;
  return (
    <PanelResizeHandle
      style={{
        height: direction === "horizontal" ? "100%" : "5px",
        width: direction === "vertical" ? "100%" : "5px",
      }}
      className={styles["root"]}
    />
  );
};

export default ResizeHandle;
