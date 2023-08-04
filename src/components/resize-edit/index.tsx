import React, { Fragment } from "react";
import { Panel, PanelGroup } from "react-resizable-panels";

import ResizeHandle from "../resize";
import Editor from "../editor";

import styles from "./index.module.scss";
import editorLanguage from "./edit-menu";

const ResizeEdit = () => {
  return (
    <Panel>
      <PanelGroup autoSaveId="example" direction="horizontal">
        {editorLanguage &&
          editorLanguage.map(item => {
            return (
              <Fragment key={item.index}>
                <Panel
                  className={styles.Panel}
                  collapsible={true}
                  defaultSize={60}
                  order={item.index}
                >
                  <div className={styles.PanelContent}>
                    <Editor language={item.languages} items={item.menu} />
                  </div>
                </Panel>
                {item.index !== 3 ? <ResizeHandle /> : null}
              </Fragment>
            );
          })}
      </PanelGroup>
    </Panel>
  );
};

export default ResizeEdit;
