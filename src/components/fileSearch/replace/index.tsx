'use client';

import { ChangeEvent, FC } from 'react';
import { VscPreserveCase, VscReplaceAll } from 'react-icons/vsc';
import * as monaco from 'monaco-editor';

import InputComp from '@/components/fileSearch/input';
import ToolBtn from '@/components/fileSearch/ToolBtn';
import { useFileSearch, useFileReplace } from '@/store/fileSearchStore';
import { useModelsStore } from '@/store/editorStore';
import { useUploadFileDataStore } from '@/store/uploadFileDataStore';
import { caseParse } from '@/utils';

const ReplaceComp: FC = () => {
  const { searchInpVal, searchResult, searchBaseOptions } = useFileSearch();
  const { replaceInpVal, replaceOptions, setReplaceInpVal, setReplaceOptionItem } =
    useFileReplace();
  const { models } = useModelsStore();
  const { updateItem } = useUploadFileDataStore();

  const replaceInpOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    const key = e.target.value;
    setReplaceInpVal(key);
  };

  function replaceAll() {
    //是否保留大小写部分
    const { preserveCase } = replaceOptions;

    function getReplaceVal(mathedStr: string): string {
      return preserveCase ? caseParse(mathedStr, replaceInpVal) : replaceInpVal;
    }

    searchResult.forEach((file) => {
      console.log('replace-file', file);

      // 更新fileData
      let newValue = file.rawValue;
      const matchesData = file.matches || [];

      const replaceVals: string[] = []; //保留预替换的字符串，给下面编辑器替换时用

      // 遍历所有匹配项
      matchesData.forEach((match) => {
        const matchText = match.match;
        // 根据是否需要保留大小写来决定替换值
        const replaceVal = getReplaceVal(matchText);
        replaceVals.push(replaceVal);

        // 创建正则表达式，全局匹配，考虑大小写
        const regExp = new RegExp(matchText, 'g');
        // 替换文本
        newValue = newValue.replace(regExp, replaceVal);
      });

      // 更新文件内容
      updateItem(file.fileId, { value: newValue });

      //同步更新编辑器
      const target = models.find((model) => model.id === file.fileId);
      const matchesModel = target?.model.findMatches(
        searchInpVal,
        false, //指示是否只在可编辑的范围内搜索
        searchBaseOptions.regex, //是否应该被当作一个正则表达式来处理
        searchBaseOptions.caseSensitive, //是否应该区分大小写
        null, //定义了单词分隔符，可以用于搜索单词边界。
        false, //是否应该捕获匹配项的子表达式
      );

      if (matchesModel) {
        for (const [index, match] of matchesModel.entries()) {
          // console.log('match', match);

          const start = new monaco.Position(match.range.startLineNumber, match.range.startColumn);
          const end = new monaco.Position(match.range.endLineNumber, match.range.endColumn);
          const editOperation = {
            range: new monaco.Range(start.lineNumber, start.column, end.lineNumber, end.column),
            text: replaceVals[index], //修改的内容
            forceMoveMarkers: true,
          };
          const beforeCursorState = null; // 初始光标状态为null
          const editOperations = [editOperation]; // 编辑操作数组
          const cursorStateComputer: monaco.editor.ICursorStateComputer = () => null; //计算新的光标和选择状态
          target?.model.pushEditOperations(beforeCursorState, editOperations, cursorStateComputer);
        }
      }
    });
  }

  return (
    <div className="flex justify-between">
      <InputComp
        className="flex-1"
        placeholder="替换"
        btnGroup={
          <div className="flex items-center">
            <ToolBtn
              tip="保留大小写"
              active={replaceOptions.preserveCase}
              onClick={() => setReplaceOptionItem('preserveCase')}
            >
              <VscPreserveCase />
            </ToolBtn>
          </div>
        }
        value={replaceInpVal}
        onchange={replaceInpOnchange}
      />
      <div className="ml-[1px] flex items-center">
        <ToolBtn tip="全部替换" onClick={replaceAll}>
          <VscReplaceAll />
        </ToolBtn>
      </div>
    </div>
  );
};

export default ReplaceComp;
