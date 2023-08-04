import React from "react";
import { PanelGroup } from "react-resizable-panels";

import styles from "./index.module.scss";

import ResizeEdit from "@/components/resize-edit";
import ResizeTerminal from "@/components/resize-terminal";

const Edit = () => {
  return (
    <div className={styles["root"]}>
      <div className={styles.BottomRow}>
        <PanelGroup direction="vertical">
          <ResizeEdit />
          <ResizeTerminal />
        </PanelGroup>
      </div>
    </div>
  );
};

export default Edit;
