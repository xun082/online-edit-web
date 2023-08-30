import React, { MouseEvent, useState, ChangeEvent } from "react";
import { useSpring, animated } from "react-spring";
import useMeasure from "react-use-measure";
import { Input } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

import styles from "./index.module.scss";

import { routerFormat, PRETTIER_FORMAT_PATH } from "@/utils";
import { prettierFileNameType, UserCustomConfig } from "@/types";
import { useAppDispatch } from "@/store";
import { changeGlobalFileConfigPath } from "@/store/modules/code";

const Setting = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [prettierPath, setPrettierPath] = useState<string>("");
  const dispatch = useAppDispatch();

  const [ref, bounds] = useMeasure();

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

  const settingGlobalPrettierConfig = () => {
    dispatch(
      changeGlobalFileConfigPath({
        path: UserCustomConfig.GLOBAL_PRETTIER_CONFIG,
        isWebContainerFile: false,
      }),
    );
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
              placeholder={
                localStorage.getItem(PRETTIER_FORMAT_PATH)
                  ? (localStorage.getItem(PRETTIER_FORMAT_PATH) as string)
                  : "示例: moment/.prettierrc"
              }
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
      <div
        className={styles["global-format-title"]}
        onClick={settingGlobalPrettierConfig}
      >
        全局的prettier文件格式化代码
      </div>
    </div>
  );
};

export default Setting;
