import React from "react";
import { Panel, PanelGroup } from "react-resizable-panels";
import ResizeHandle from "../resize";
import styles from "./index.module.scss";
import { DeleteOutlined, RightOutlined } from "@ant-design/icons";

const ResizeTerminal = () => {
  return (
    <>
      <ResizeHandle title="预览" />
      <Panel collapsible={true} className={styles["root"]}>
        <PanelGroup autoSaveId="example" direction="vertical">
          <Panel className={styles.Panel} collapsible={true} defaultSize={100}>
            <div>2</div>
          </Panel>
          <ResizeHandle title="控制台" />
          <Panel className={styles.console} collapsible={true} defaultSize={0}>
            <div className={styles["top"]}>
              <DeleteOutlined rev={undefined} />
            </div>
            <div className={styles["middle"]}></div>
            <div className={styles["bottom"]}>
              <RightOutlined rev={undefined} />
              <input type="text" className={styles["input"]} />
            </div>
          </Panel>
        </PanelGroup>
      </Panel>
    </>
  );
};

export default ResizeTerminal;
