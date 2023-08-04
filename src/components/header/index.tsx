import React, { FC, useState, useRef, useEffect, Fragment } from "react";

import styles from "./index.module.scss";

import { LayoutSwitchObjects, layoutModeTypes } from "@/common/constant";
import { useAppSelector, useAppDispatch } from "@/store";
import { switchLayoutMode } from "@/store/modules/edit";

const Header: FC = () => {
  const { layoutMode } = useAppSelector(state => state.edit);
  const dispatch = useAppDispatch();

  const [isShowSwitch, setIsShowSwitch] = useState<boolean>(false);
  const layoutSwitchRef = useRef<SVGSVGElement>(null);
  const switchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (switchRef.current?.contains(event.target as Node)) return;
      else if (event.target === layoutSwitchRef.current)
        setIsShowSwitch(!isShowSwitch);
      else setIsShowSwitch(false);
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isShowSwitch, layoutMode]);

  const layoutSwitchHandle = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as SVGSVGElement;
    const className = target.classList.value;
    if (
      ["center", "left", "right"].includes(className) &&
      className !== layoutMode
    ) {
      dispatch(switchLayoutMode(className as layoutModeTypes));
    }
  };

  return (
    <header className={styles.root}>
      <div className={styles["header-left"]}>Moment</div>
      <div className={styles["header-right"]}>
        <div className={styles["layout-switch"]}>
          <svg
            viewBox="0 0 28 28"
            xmlns="http://www.w3.org/2000/svg"
            className={styles["svg"]}
            fill="none"
            stroke="currentColor"
            ref={layoutSwitchRef}
          >
            <path
              className="active"
              d="M24.1348 22.1323C24.1348 22.4195 23.902 22.6523 23.6148 22.6523L4.37477 22.6523C4.08758 22.6523 3.85476 22.4195 3.85476 22.1323L3.85477 10.6632L24.1348 10.6632L24.1348 22.1323Z"
            ></path>
            <path
              className="active"
              d="M18.0427 5.29297L23.6148 5.29297C23.902 5.29297 24.1348 5.52578 24.1348 5.81297L24.1348 9.74831L18.0427 9.74831L18.0427 5.29297Z"
            ></path>
            <path
              className="active"
              d="M10.9504 5.29297L17.0426 5.29297L17.0426 9.74831L10.9504 9.74831L10.9504 5.29297Z"
            ></path>
            <path
              className="active"
              d="M3.8584 9.74792L3.8584 5.81292C3.8584 5.52574 4.09121 5.29292 4.3784 5.29292L9.95052 5.29292L9.95052 9.74792L3.8584 9.74792Z"
            ></path>
            <path
              className="normal"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.77539 9.66406V6.21094H9.95117V9.66406H4.77539ZM10.9512 9.66406V6.21094H17.043V9.66406H10.9512ZM18.043 9.66406H23.1348V6.21094H18.043V9.66406ZM4.77539 10.6641V21.625H23.1348V10.6641H4.77539ZM3.77539 5.73094C3.77539 5.44375 4.0082 5.21094 4.29539 5.21094H23.6148C23.902 5.21094 24.1348 5.44375 24.1348 5.73094V22.105C24.1348 22.3922 23.902 22.625 23.6148 22.625H4.29539C4.0082 22.625 3.77539 22.3922 3.77539 22.105V5.73094Z"
            ></path>
          </svg>
          {isShowSwitch && (
            <div
              className={styles["switch-control"]}
              onClick={layoutSwitchHandle}
              ref={switchRef}
            >
              {LayoutSwitchObjects &&
                LayoutSwitchObjects.map(item => (
                  <Fragment key={item.value}>{item.svg}</Fragment>
                ))}
            </div>
          )}
        </div>
        <div className={styles["operation-control"]}>运行</div>
      </div>
    </header>
  );
};

export default Header;
