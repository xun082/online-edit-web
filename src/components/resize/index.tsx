import React from "react";
import { PanelResizeHandle } from "react-resizable-panels";
import styles from "./index.module.scss";

interface resizeHandleProps {
  title?: string;
}

export default function ResizeHandle(props: resizeHandleProps) {
  const { title } = props;
  return (
    <PanelResizeHandle className={styles.root}>
      <div className={styles.ResizeHandleInner}>
        {title ? (
          title
        ) : (
          <svg className={styles.icon} viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M8,18H11V15H2V13H22V15H13V18H16L12,22L8,18M12,2L8,6H11V9H2V11H22V9H13V6H16L12,2Z"
            />
          </svg>
        )}
      </div>
    </PanelResizeHandle>
  );
}
