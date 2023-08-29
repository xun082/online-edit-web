import React, { MouseEvent, useState, ChangeEvent, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import useMeasure from "react-use-measure";
import { Input } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

import styles from "./index.module.scss";

import { routerFormat, PRETTIER_FORMAT_PATH } from "@/utils";
import { prettierFileNameType } from "@/types";

const Setting = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [prettierPath, setPrettierPath] = useState<string>("");

  const [ref, bounds] = useMeasure();

  useEffect(() => {
    const path = localStorage.getItem(PRETTIER_FORMAT_PATH) as string;
    setPrettierPath(path);
  }, [prettierPath]);

  const togglePanel = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsCollapsed(prevState => !prevState);
  };

  const panelContentAnimatedStyle = useSpring({
    height: isCollapsed ? 0 : bounds.height,
  });

  const prettierFormatHandle = (event: ChangeEvent<HTMLInputElement>) => {
    setPrettierPath(event.target.value);
  };

  const storagePrettierPath = () => {
    const path = routerFormat(prettierPath) as prettierFileNameType;

    if (
      [
        ".prettierrc",
        ".prettierrc.js",
        "prettier.config.js",
        ".prettierrc.json",
        ".prettierrc.yml",
      ].includes(path)
    ) {
      localStorage.setItem(PRETTIER_FORMAT_PATH, prettierPath);
      setIsCollapsed(true);
    } else {
      console.log("文件名不符合");
    }
  };

  return (
    <div className={styles["root"]}>
      <div className={styles["switch-prettier-format"]} onClick={togglePanel}>
        <div className={styles["format-title"]}>
          根据项目中的prettier文件格式化代码
        </div>
        <animated.div
          style={panelContentAnimatedStyle}
          className={styles["content"]}
        >
          <div
            onClick={e => e.stopPropagation()}
            ref={ref}
            className={styles["file-path-control"]}
          >
            <Input
              placeholder="示例: moment/.prettierrc"
              bordered={false}
              className={styles["path-input"]}
              value={prettierPath}
              onChange={prettierFormatHandle}
            />
            <div className={styles["path-confirm"]}>
              <CloseOutlined
                rev={undefined}
                className={styles["path-control"]}
                onClick={() => setIsCollapsed(true)}
              />
              <CheckOutlined
                rev={undefined}
                className={styles["path-control"]}
                onClick={storagePrettierPath}
              />
            </div>
          </div>
        </animated.div>
      </div>
    </div>
  );
};

export default Setting;
