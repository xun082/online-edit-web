import React, { FC, useState, useLayoutEffect, useEffect, useRef } from "react";
import { PanelGroup, Panel } from "react-resizable-panels";
import { WebContainer } from "@webcontainer/api";
import { v4 as uuid } from "uuid";
import { Spin } from "antd";

import styles from "./index.module.scss";
import { components, EditorNav, ResizeHandle, EditHeader } from "./component";

import Editor from "@/components/editor";
import { TerminalPanel, TerminalPanelRefInterface } from "@/components/terminal";
import { useAppSelector, useAppDispatch } from "@/store";
import WebContainerContext from "@/context/webContainer";
import ActionIconTypeContext from "@/context/setActionIcon";
import {
  WebContainerFileSystemTreeSavePoint,
  saveFileSystemTree,
  writeDirByLocal,
  curDirectory,
  clearCurDirectory,
} from "@/utils";
import { LinkData, labelType } from "@/types";
import { Preview } from "@/components/preview";
import { changePreviewUrl } from "@/store/modules/home";

const Edit: FC = () => {
  const terminalRef = useRef<TerminalPanelRefInterface>(null);

  const [linkData, setLinkData] = useState<LinkData>(() => ({
    src: "",
    uuid: "",
  }));
  const [activeIcon, setActiveIcon] = useState<labelType>("file");

  const { path, isLeaf, globalFileConfigPath } = useAppSelector(
    state => state.code,
  );
  const { previewSwitch } = useAppSelector(state => state.home);

  const dispatch = useAppDispatch();

  const [webContainerInstance, setWebContainerInstance] =
    useState<WebContainer | null>(null);
  /**
   * Editing area layout changes
   */
  const editPanelGroupResize = () => {
    terminalRef.current?.terminalResize()
  }

  useLayoutEffect(() => {
    const bootWebContainer = async () => {
      const instance = await WebContainer.boot();

      const treeData = localStorage.getItem(
        WebContainerFileSystemTreeSavePoint,
      );

      if (treeData) {
        const fileSystemTree = JSON.parse(treeData);
        await instance.mount(fileSystemTree);
      }

      if (curDirectory) {
        await writeDirByLocal(curDirectory, instance);
        clearCurDirectory();
      }

      setWebContainerInstance(instance);
    };

    if (webContainerInstance) return;
    bootWebContainer();
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();

      webContainerInstance && saveFileSystemTree(webContainerInstance);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [webContainerInstance]);

  useEffect(() => {
    if (webContainerInstance) {
      webContainerInstance.on("server-ready", (port, host) => {
        setLinkData({
          src: host,
          uuid: uuid(),
        });
        dispatch(changePreviewUrl(host));
      });
    }
  }, [webContainerInstance]);

  const Component = components[activeIcon];

  return (
    <Spin spinning={webContainerInstance ? false : true}>
      <WebContainerContext.Provider
        value={webContainerInstance && webContainerInstance}
      >
        <main className={styles["root"]}>
          <ActionIconTypeContext.Provider
            value={{
              activeIconType: activeIcon,
              setActiveIconType: setActiveIcon,
            }}
          >
            <EditorNav />
          </ActionIconTypeContext.Provider>

          <section className={styles["edit-content"]}>
            <PanelGroup direction="horizontal">
              {/* 文件栏 */}
              <Panel
                style={{ background: "#202327" }}
                minSize={1}
                defaultSize={15}
              >
                <Component />
              </Panel>
              <ResizeHandle />
              {/* 代码编辑栏 */}
              <Panel minSize={1} defaultSize={previewSwitch === true ? 50 : 85}>
                <PanelGroup direction="vertical" onLayout={editPanelGroupResize}>
                  <Panel
                    collapsible={true}
                    style={{ backgroundColor: "hsl(220 10% 14%)" }}
                  >
                    {(globalFileConfigPath || (path && isLeaf)) && (
                      <>
                        <EditHeader />
                        <Editor filePath={path} />
                      </>
                    )}
                  </Panel>
                  <ResizeHandle direction="vertical" />
                  <Panel
                    defaultSize={30}
                    minSize={2}
                    style={{ background: "#15181E" }}
                  >
                    <TerminalPanel ref={terminalRef} />
                  </Panel>
                </PanelGroup>
              </Panel>
              {previewSwitch === true ? (
                <>
                  <ResizeHandle />
                  {/* 效果展示 */}
                  <Panel minSize={1} defaultSize={35}>
                    <Preview data={linkData} />
                  </Panel>
                </>
              ) : null}
            </PanelGroup>
          </section>
        </main>
      </WebContainerContext.Provider>
    </Spin>
  );
};

export default Edit;
