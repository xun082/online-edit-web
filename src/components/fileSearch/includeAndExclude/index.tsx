'use client';

import { ChangeEvent, FC } from 'react';
import { VscBook, VscEllipsis, VscExclude } from 'react-icons/vsc';

// import { TreeViewElement } from '@/components/extension/tree-view-api';
import ToolBtn from '@/components/fileSearch/ToolBtn';
import InputComp from '@/components/fileSearch/input';
import { useFileFilter } from '@/store/fileSearchStore';
import debounce from '@/utils/debounce';
// import { matchFilesByKey } from '@/utils/match';
// import { useUploadFileDataStore } from '@/store/uploadFileDataStore';
// import { useModelsStore } from '@/store/editorStore';
// import { TreeViewElement } from '@/components/extension/tree-view-api';
// import { openedFileIds } from '@/utils/matchHelper';

const IncludeAndExclude: FC = () => {
  // const { fileData } = useUploadFileDataStore();
  // let data: TreeViewElement[] = fileData as unknown as TreeViewElement[];

  // const { models } = useModelsStore();
  // const openedIds = openedFileIds(models);

  const {
    filterSearchOptions,
    setFilterSearchOptionItem,
    setIncludeFileInpVal,
    setExcludeFileInpVal,
  } = useFileFilter();

  const excludeInpOnchange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setExcludeFileInpVal(e.target.value);
  });
  const includeInpOnchange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setIncludeFileInpVal(e.target.value);
  });

  return (
    <div>
      <div className="w-full flex">
        <ToolBtn
          tip="切换搜索详细信息"
          className="mr-2 ml-auto"
          onClick={() => setFilterSearchOptionItem('isUsed')}
          active={filterSearchOptions.isUsed}
        >
          <VscEllipsis />
        </ToolBtn>
      </div>
      {filterSearchOptions.isUsed && (
        <div className="pr-1 pl-7">
          <div>
            <div className="text-[10px]">包含的文件</div>
            <InputComp
              btnGroup={
                <ToolBtn
                  tip="仅在打开的编辑器搜索"
                  active={filterSearchOptions.isOnlyOpened}
                  onClick={() => setFilterSearchOptionItem('isOnlyOpened')}
                >
                  <VscBook />
                </ToolBtn>
              }
              placeholder="例如：*.ts,src/**/include"
              onchange={includeInpOnchange}
            ></InputComp>
          </div>
          <div>
            <div className="text-[10px]">排除的文件</div>
            <InputComp
              btnGroup={
                <ToolBtn
                  tip={`使用"排除设置"与"忽略文件"`}
                  active={filterSearchOptions.isUseGitignoreFile}
                  onClick={() => setFilterSearchOptionItem('isUseGitignoreFile')}
                >
                  <VscExclude />
                </ToolBtn>
              }
              placeholder="例如：*.ts,src/**/exclude"
              onchange={excludeInpOnchange}
            ></InputComp>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncludeAndExclude;
