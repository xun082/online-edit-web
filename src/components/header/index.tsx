import React, { FC } from "react";

import styles from "./index.module.scss";

const Header: FC = () => {
  return (
    <header className={styles.root}>
      <div className={styles["header-left"]}>Moment</div>
      <div className={styles["header-right"]}>
        <div className={styles["login"]}>登录</div>
      </div>
    </header>
  );
};

export default Header;
