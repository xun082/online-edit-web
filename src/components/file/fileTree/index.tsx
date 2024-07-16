'use client';

import { Tree, TreeViewElement, File, Folder } from '@/components/extension/tree-view-api';
import { FileItem } from '@/components/file/fileItem';
import { useUploadFileDataStore } from '@/store/uploadFileDataStore';

type TOCProps = {
  toc: TreeViewElement[];
};

const TOC = ({ toc }: TOCProps) => {
  return (
    <Tree className="w-full h-full bg-transparent p-2 rounded-md" indicator={true}>
      {toc.map((element) => (
        <TreeItem key={element.id} elements={[element]} />
      ))}
    </Tree>
  );
};

type TreeItemProps = {
  elements: TreeViewElement[];
};

export const TreeItem = ({ elements }: TreeItemProps) => {
  const { removeFileById, updateItem } = useUploadFileDataStore();

  return (
    <ul className="w-full space-y-1">
      {elements.map((element) => (
        <li key={`${element.id}+${element.filename}`} className="w-full space-y-2">
          {element.status === 'pending' ? (
            <input
              autoFocus
              onBlur={(e) => {
                if (e.target.value === '') {
                  removeFileById(element.id);
                } else {
                  updateItem(element.id, {
                    filename: e.target.value,
                    status: 'success',
                  });
                }
              }}
              className=" px-px pl-2 pr-1 border-[1px] border-[#3f85f5] focus:outline-none focus:ring-1 focus:ring-[#3f85f5] ring-opacity-50 bg-transparent/30 text-[12px] font-[300]"
            />
          ) : (element.children && element.children?.length > 0) || element.kind === 'directory' ? (
            <Folder
              element={element.filename}
              value={element.id}
              key={element.id}
              isSelectable={element.isSelectable}
              empty={element.children?.length === 0}
              className="px-px pr-1 text-[12px] font-[300]"
            >
              <TreeItem
                key={element.id}
                aria-label={element.filename}
                elements={element.children as TreeViewElement[]}
              />
            </Folder>
          ) : (
            <File key={element.id} value={element.id} isSelectable={element.isSelectable}>
              <FileItem key={element.id} file={element}></FileItem>
            </File>
          )}
        </li>
      ))}
    </ul>
  );
};

const FileTree = ({ data }: { data: TreeViewElement[] }) => {
  return <TOC toc={data} />;
};

export default FileTree;
