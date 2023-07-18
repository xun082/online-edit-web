import React from "react";
import styles from "./index.module.scss";
import Editor from "@/components/editor";
import { Css, Html, JavaScript } from "@/components/menu";
import Iframe from "@/components/iframe";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ResizeHandle from "@/components/resize";
const Edit = () => {
  return (
    <div className={styles["root"]}>
      {/* <Editor language="html" items={Html} />
      <Editor language="css" items={Css} />
      <Editor language="javascript" items={JavaScript} />
      <Iframe /> */}
      <div className={styles.BottomRow}>
        <PanelGroup direction="horizontal">
          <Panel>
            <PanelGroup autoSaveId="example" direction="vertical">
              <Panel
                className={styles.Panel}
                collapsible={true}
                defaultSize={60}
                order={1}
              >
                <div className={styles.PanelContent}>top</div>
              </Panel>
              <ResizeHandle />
              <Panel
                className={styles.Panel}
                defaultSize={60}
                collapsible={true}
                order={2}
              >
                <div className={styles.PanelContent}>middle</div>
              </Panel>
              <ResizeHandle />
              <Panel
                className={styles.Panel}
                collapsible={true}
                defaultSize={60}
                order={3}
              >
                <div className={styles.PanelContent}>bottom</div>
              </Panel>
            </PanelGroup>
          </Panel>
          <ResizeHandle />
          <Panel collapsible={true} defaultSize={40}>
            left
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
};

export default Edit;
