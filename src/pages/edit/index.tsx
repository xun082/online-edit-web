import React, { FC, useState } from "react";
import { PanelGroup, Panel } from "react-resizable-panels";

import styles from "./index.module.scss";
import { components, editorAside, ResizeHandle } from "./component";

import { labelType } from "@/types";
import Editor from "@/components/editor";
import { TerminalPanel } from "@/components/terminal";
import { useAppSelector } from "@/store";

const Edit: FC = () => {
  const [activeIcon, setActiveIcon] = useState<labelType>("file");
  const { path } = useAppSelector(state => state.code);

  const handleIconClick = (label: labelType) => {
    setActiveIcon(label);
  };

  const Component = components[activeIcon];

  return (
    <main className={styles["root"]}>
      <nav className={styles["edit-nav"]}>
        {editorAside.map(({ icon, label }) => (
          <div
            className={styles["aside-button"]}
            key={label}
            onClick={() => handleIconClick(label)}
          >
            {React.cloneElement(icon, {
              style: {
                fontSize: "24px",
                color: activeIcon === label ? "#f0f0f0" : "#828388",
              },
            })}
          </div>
        ))}
      </nav>
      <section className={styles["edit-content"]}>
        <PanelGroup direction="horizontal">
          {/* 文件栏 */}
          <Panel style={{ background: "#202327" }} minSize={1} defaultSize={15}>
            <Component />
          </Panel>
          <ResizeHandle />
          {/* 代码编辑栏 */}
          <Panel minSize={1} defaultSize={50}>
            <PanelGroup direction="vertical">
              <Panel collapsible={true}>
                <div className={styles["edit-header"]}>1</div>
                <Editor filePath={path} />
              </Panel>
              <ResizeHandle direction="vertical" />
              <Panel
                defaultSize={30}
                minSize={2}
                style={{ background: "#15181E" }}
              >
                <TerminalPanel />
              </Panel>
            </PanelGroup>
          </Panel>

          <ResizeHandle />
          {/* 效果展示 */}
          <Panel minSize={1} defaultSize={35}>
            <iframe width="100%" height="100%"></iframe>
          </Panel>
        </PanelGroup>
      </section>
    </main>
  );
};

export default Edit;
