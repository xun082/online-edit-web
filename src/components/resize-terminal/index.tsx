import React, { useEffect, useRef } from "react";
import { Panel, PanelGroup } from "react-resizable-panels";
import { DeleteOutlined, RightOutlined } from "@ant-design/icons";

import ResizeHandle from "../resize";

import styles from "./index.module.scss";

import { useAppSelector } from "@/store";
import { getPreviewUrl } from "@/utils";

const ResizeTerminal = () => {
  const { code } = useAppSelector(state => state.code);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {}, []);

  return (
    <>
      <ResizeHandle title="预览" />
      <Panel collapsible={true} className={styles["root"]}>
        <PanelGroup autoSaveId="example" direction="vertical">
          <Panel className={styles.Panel} collapsible={true}>
            <iframe
              src={getPreviewUrl(code)}
              ref={iframeRef}
              width="100%"
              height="100%"
            ></iframe>
          </Panel>
          <ResizeHandle title="控制台" />
          <Panel className={styles.console} collapsible={true} defaultSize={0}>
            <div className={styles["top"]}>
              <DeleteOutlined rev={undefined} />
            </div>
            <div className={styles["middle"]}>
              <iframe width="100%" height="100%"></iframe>
            </div>
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
