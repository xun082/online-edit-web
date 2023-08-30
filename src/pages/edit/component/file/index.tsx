import React, { useRef, useEffect } from "react";
import { CloudDownloadOutlined } from "@ant-design/icons";

import styles from "./index.module.scss";

import Collapse from "@/components/collapse";
import { useAppDispatch } from "@/store";
import { changeHight } from "@/store/modules/code";

const File = () => {
  const fileContentRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const handleResize = () => {
    if (fileContentRef.current) {
      // 38为头部 PROJECT 的高度 22 为文件头部的高度
      const actualHeight = fileContentRef.current.clientHeight - 38 - 22;
      dispatch(changeHight(actualHeight));
    }
  };

  useEffect(() => {
    handleResize(); // 初始化时获取一次高度
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles["root"]} ref={fileContentRef}>
      <div className={styles["project-download"]}>
        <h2 className={styles["title"]}>PROJECT</h2>
        <CloudDownloadOutlined rev={undefined} style={{ color: "#F0F0F0" }} />
      </div>
      <Collapse />
    </div>
  );
};

export default File;
