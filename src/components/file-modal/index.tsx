import React, { ChangeEvent, useContext } from "react";
import { Modal, Input } from "antd";
import { WebContainer } from "@webcontainer/api";

import { useAppDispatch, useAppSelector } from "@/store";
import {
  changeFileModalStatus,
  changeFormatPathValue,
} from "@/store/modules/code";
import { ActionTypeEnumMap, ActionTypeEnum } from "@/types";
import { getNodePath } from "@/utils/file";
import { renameFile } from "@/utils/webContainer";
import useMemoSelectedNode from "@/hooks/useMemoSelectedNode";
import TreeDataContext, { treeDataContextType } from "@/context/tree-data";
import WebContainerContext from "@/context/webContainer";

const FileEditorModal: React.FC = () => {
  const { fileModalIsOpen, fileControlType, formatPath, selectedKey } =
    useAppSelector(state => state.code);

  const { treeData, setTreeData } = useContext(
    TreeDataContext,
  ) as treeDataContextType;
  const webcontainerInstance = useContext(WebContainerContext) as WebContainer;

  const dispatch = useAppDispatch();

  const selectedNode = useMemoSelectedNode(selectedKey, treeData);

  const handleOk = async () => {
    const path = getNodePath(selectedKey, treeData);
    renameFile(path, formatPath, webcontainerInstance);

    selectedNode!.title = formatPath;

    setTreeData(pre => [...pre]);

    dispatch(changeFileModalStatus({ open: false }));
  };

  const handleCancel = () => {
    dispatch(changeFileModalStatus({ open: false }));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeFormatPathValue(event.target.value));
  };

  return (
    <>
      <Modal
        title={ActionTypeEnumMap.get(fileControlType as ActionTypeEnum)}
        open={fileModalIsOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Basic usage"
          value={formatPath}
          onChange={handleInputChange}
        />
      </Modal>
    </>
  );
};

export default FileEditorModal;
