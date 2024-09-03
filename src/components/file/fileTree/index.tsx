'use client';

import { useMemo } from 'react';

import { Tree, TreeViewElement, File, Folder } from '@/components/extension/tree-view-api';
import { PendingFileItem } from '@/components/file/pendingFileItem';
import { FileItem } from '@/components/file/fileItem';

type TOCProps = {
  toc: TreeViewElement[];
};

function sortToc(toc: TreeViewElement[]): TreeViewElement[] {
  const tempToc = [...toc];

  tempToc
    .filter((element) => element.kind === 'directory' && element.children?.length)
    .forEach((element) => {
      element.children = sortToc(element.children || []);
    });

  return tempToc.sort((a, b) => {
    if (a.kind === 'directory' && b.kind === 'file') {
      return -1;
    }

    if (a.kind === 'file' && b.kind === 'directory') {
      return 1;
    }

    if (a.filename < b.filename) {
      return -1;
    }

    return 0;
  });
}

const TOC = ({ toc }: TOCProps) => {
  const sortedToc = useMemo(() => {
    return sortToc(toc);
  }, [toc]);

  return (
    <Tree className="w-full h-full bg-transparent p-2 rounded-md" indicator={true}>
      {sortedToc.map((element) => (
        <TreeItem key={element.id} elements={[element]} />
      ))}
    </Tree>
  );
};

type TreeItemProps = {
  elements: TreeViewElement[];
};

export const TreeItem = ({ elements }: TreeItemProps) => {
  return (
    <ul className="w-full space-y-1">
      {elements.map((element) => (
        <li key={`${element.id}+${element.filename}`} className="w-full space-y-2">
          {element.status === 'pending' ? (
            <PendingFileItem
              filename={element.filename}
              path={(element as any).path}
              kind={(element as any).kind}
              id={element.id}
            />
          ) : (element.children && element.children?.length > 0) || element.kind === 'directory' ? (
            <Folder
              element={element.filename}
              path={(element as any).path}
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
