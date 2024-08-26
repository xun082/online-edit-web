import { ChangeEvent, FC } from 'react';
import { VscCaseSensitive, VscRegex, VscWholeWord } from 'react-icons/vsc';

import debounce from '@/utils/debounce';
import { useFileSearch } from '@/store/fileSearchStore';
import InputComp from '@/components/fileSearch/input';
import ToolBtn from '@/components/fileSearch/ToolBtn';

const SearchComp: FC = () => {
  const { setSearchInpVal, searchBaseOptions, searchInpVal, setSearchBaseOptionItem } =
    useFileSearch();

  const searchInpOnchange = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.value;
    setSearchInpVal(key);
  });

  return (
    <div className="mb-1">
      <InputComp
        placeholder="搜索"
        btnGroup={
          <div className="flex items-center w-[80px]">
            <ToolBtn
              tip="区分大小写"
              active={searchBaseOptions.caseSensitive}
              onClick={() => setSearchBaseOptionItem('caseSensitive')}
            >
              <VscCaseSensitive />
            </ToolBtn>
            <ToolBtn
              tip="全字匹配"
              active={searchBaseOptions.wholeWord}
              onClick={() => setSearchBaseOptionItem('wholeWord')}
            >
              <VscWholeWord />
            </ToolBtn>
            <ToolBtn
              tip="使用正则表达式"
              active={searchBaseOptions.regex}
              onClick={() => setSearchBaseOptionItem('regex')}
            >
              <VscRegex />
            </ToolBtn>
          </div>
        }
        value={searchInpVal}
        onchange={searchInpOnchange}
      />
    </div>
  );
};

export default SearchComp;
