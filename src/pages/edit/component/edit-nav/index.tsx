import React, { FC, useContext } from "react";
import { GithubOutlined } from "@ant-design/icons";

import { editorAsideTop } from "../edit-aside";

import styles from "./index.module.scss";

import { labelType } from "@/types";
import ActionIconTypeContext, {
  actionIconContextType,
} from "@/context/setActionIcon";

const EditorNav: FC = () => {
  const { activeIconType, setActiveIconType } = useContext(
    ActionIconTypeContext,
  ) as actionIconContextType;

  const handleIconClick = (label: labelType) => {
    setActiveIconType(label);
  };

  return (
    <nav className={styles["root"]}>
      <div className={styles["edit-nav-top"]}>
        {editorAsideTop.map(({ icon, label }) => (
          <div
            className={styles["aside-button"]}
            key={label}
            onClick={() => handleIconClick(label)}
          >
            {React.cloneElement(icon, {
              style: {
                fontSize: "24px",
                color: activeIconType === label ? "#f0f0f0" : "#828388",
              },
            })}
          </div>
        ))}
      </div>
      <div className={styles["edit-nav-button"]}>
        <a
          href="https://github.com/xun082/online-cooperative-edit"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubOutlined className={styles["github-icon"]} />
        </a>
      </div>
    </nav>
  );
};

export default EditorNav;
