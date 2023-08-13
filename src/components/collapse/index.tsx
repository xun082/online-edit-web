import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import useMeasure from "react-use-measure";
import { Tree } from "antd";
import type { DataNode, DirectoryTreeProps } from "antd/es/tree";
import { StepBackwardFilled } from "@ant-design/icons";

import styles from "./index.module.scss";

import addFile from "@/assets/images/addFile.svg";
import addFolder from "@/assets/images/addFolder.svg";
import editFile from "@/assets/images/editFile.svg";
import deleteFile from "@/assets/images/deleteFile.svg";

const { DirectoryTree } = Tree;

const treeData: DataNode[] = [
  {
    title: "src",
    key: "0-0",
    children: [
      {
        title: (
          <div className={styles["tree-title"]}>
            <span>component</span>
            <div className={styles["tree-title-edit"]}>
              <img className={styles["file-edit-icon"]} src={addFile} alt="" />
              <img
                className={styles["file-edit-icon"]}
                src={addFolder}
                alt=""
              />
              <img className={styles["file-edit-icon"]} src={editFile} alt="" />
              <img
                className={styles["file-edit-icon"]}
                src={deleteFile}
                alt=""
              />
            </div>
          </div>
        ),
        key: "1-0-0",
        children: [
          {
            title: (
              <div className={styles["tree-title"]}>
                <span>component</span>
                <div className={styles["tree-title-edit"]}>
                  <img
                    className={styles["file-edit-icon"]}
                    src={addFile}
                    alt=""
                  />
                  <img
                    className={styles["file-edit-icon"]}
                    src={addFolder}
                    alt=""
                  />
                  <img
                    className={styles["file-edit-icon"]}
                    src={editFile}
                    alt=""
                  />
                  <img
                    className={styles["file-edit-icon"]}
                    src={deleteFile}
                    alt=""
                  />
                </div>
              </div>
            ),
            key: "0-0-0-0",
            isLeaf: true,
          },
          { title: "index.module.scss", key: "0-0-1-0", isLeaf: true },
        ],
      },
      { title: "index.tsx", key: "0-0-1", isLeaf: true },
    ],
  },
  {
    title: "public",
    key: "0-1",
    children: [
      {
        title: "index.html",
        key: "0-1-0",
        isLeaf: true,
        icon: <StepBackwardFilled rev={undefined} />,
      },
      { title: "moment.icon", key: "0-1-1-2", isLeaf: true },
    ],
  },
  {
    title: "index.tsx",
    key: "0-1-1",
    isLeaf: true,
  },
];

const Collapse = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [ref, bounds] = useMeasure();

  const togglePanel = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    console.log(e.target);

    setIsCollapsed(prevState => !prevState);
  };
  const panelContentAnimatedStyle = useSpring({
    height: isCollapsed ? 0 : bounds.height,
  });
  const toggleWrapperAnimatedStyle = useSpring({
    transform: isCollapsed ? "rotate(0deg)" : "rotate(180deg)",
  });

  // 添加文件
  const addFileHandle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    console.log(111);
  };

  // 添加文件夹
  const addFolderHandle = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    console.log(222);
  };

  const onSelect: DirectoryTreeProps["onSelect"] = (keys, info) => {
    console.log("Trigger Select", keys, info);
  };

  const onExpand: DirectoryTreeProps["onExpand"] = (keys, info) => {
    console.log("Trigger Expand", keys, info);
  };

  return (
    <div className={styles.root} onClick={togglePanel}>
      <div className={styles.heading}>
        <div className={styles["header-info"]}>
          <animated.div style={toggleWrapperAnimatedStyle}>
            <svg
              width="12px"
              height="12px"
              viewBox="0 0 1024 1024"
              style={{ color: "#6495ed" }}
              className={styles["svg"]}
            >
              <path
                d="M64 351c0-8 3-16 9-22.2 12.3-12.7 32.6-13.1
                         45.3-0.8l394.1 380.5L905.7 328c12.7-12.3 33-12 45.3 0.7s12 33-0.7 45.3L534.7 
                         776c-12.4 12-32.1 12-44.5 0L73.8 374c-6.5-6.3-9.8-14.6-9.8-23z"
              ></path>
            </svg>
          </animated.div>
          <span>FILES</span>
        </div>
        <div className={styles["header-control"]}>
          <img
            className={styles["file-edit-icon"]}
            src={addFile}
            alt=""
            onClick={addFileHandle}
          />
          <img
            className={styles["file-edit-icon"]}
            src={addFolder}
            alt=""
            onClick={addFolderHandle}
          />
        </div>
      </div>
      <animated.div
        style={panelContentAnimatedStyle}
        className={styles.content}
      >
        <div
          onClick={e => e.stopPropagation()}
          ref={ref}
          className={styles.contentInner}
        >
          <DirectoryTree
            multiple
            onSelect={onSelect}
            onExpand={onExpand}
            treeData={treeData}
            className={styles["antd-tree"]}
          />
        </div>
      </animated.div>
    </div>
  );
};

export default Collapse;
