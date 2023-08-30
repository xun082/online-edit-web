import React, { FC } from "react";
import {
  RightSquareOutlined,
  LeftSquareOutlined,
  SwitcherOutlined,
} from "@ant-design/icons";

import styles from "./index.module.scss";

import { useAppDispatch, useAppSelector } from "@/store";
import { changePreviewSwitch } from "@/store/modules/home";

const Header: FC = () => {
  const { previewSwitch, previewUrl } = useAppSelector(state => state.home);

  const dispatch = useAppDispatch();

  const previewSwitchHandle = () => {
    dispatch(changePreviewSwitch(!previewSwitch));
  };

  const openNewTab = () => {
    dispatch(changePreviewSwitch(true));
    window.open(previewUrl, "_blank");
  };

  const login = () => {
    alert("登录成功");
  };

  return (
    <header className={styles.root}>
      <div className={styles["header-left"]}>在线代码编辑器</div>
      <div className={styles["header-right"]}>
        <div className={styles["open-new-tab"]} onClick={openNewTab}>
          <SwitcherOutlined />
          <span>Open in New Tab</span>
        </div>
        <div
          className={styles["preview-control"]}
          onClick={previewSwitchHandle}
        >
          {previewSwitch ? (
            <>
              <LeftSquareOutlined />
              <span>open</span>
            </>
          ) : (
            <>
              <RightSquareOutlined />
              <span>close</span>
            </>
          )}
        </div>
        <div className={styles["login"]} onClick={login}>
          登录
        </div>
      </div>
    </header>
  );
};

export default Header;
