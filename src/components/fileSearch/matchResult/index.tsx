'use client';

import { FC, useEffect, useState, MouseEventHandler } from 'react';
import { editor } from 'monaco-editor';
// import { v4 as uuidv4 } from 'uuid';

import { MatchResult } from '@/utils/match';
import {
  useActiveEditorStore,
  useActiveModelStore,
  useEditorStore,
  useModelsStore,
  useMonacoStore,
  useSplitStore,
} from '@/store/editorStore';
import { useFileSearch } from '@/store/fileSearchStore';
import { cn, getFileLanguage, getFileSpecificIcon, addNewModel } from '@/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
// import { ScrollArea } from '@/components/ui/scroll-area';

type ClickEventHandler = MouseEventHandler<HTMLDivElement>;

const MatchResultItem: FC<{
  data: MatchResult;
  value: string;
  className?: string;
  onClick?: ClickEventHandler;
}> = ({ data, value, className, onClick }) => {
  const tipContentClasses = `bg-gray-700 text-while py-1 px-2 border-gray-500 border-[1px]`;

  const { filename, filepath, matches, fileId, rawValue } = data;

  const [open, setOpen] = useState<boolean>(false); //expand

  const { models, setModels } = useModelsStore();
  const { activeEditor, activeEditorId } = useActiveEditorStore();
  const { splitState } = useSplitStore();
  const { editors } = useEditorStore();
  const { setActiveModel } = useActiveModelStore();
  const { monacos } = useMonacoStore();

  const willChangeEditorId = activeEditor ? activeEditorId : splitState.findIndex((item) => item);
  const willChangeEditor = activeEditor ?? editors[splitState.findIndex((item) => item)];

  function findFileAtMatchedSelection() {
    const mathModel = models.filter((model) => model.id === fileId);

    if (mathModel.length > 0) {
      mathModel[0].model && setActiveModel(mathModel[0].id, mathModel[0], willChangeEditorId);
      mathModel[0].model &&
        setModels(
          {
            id: fileId,
            filename: mathModel[0].filename,
            value: '',
            language: getFileLanguage(mathModel[0].filename),
          },
          mathModel[0].model,
          willChangeEditorId,
          fileId,
        );
      willChangeEditor?.setModel(mathModel[0].model);
    } else {
      const monaco = monacos[willChangeEditorId];
      addNewModel(
        { id: fileId, filename, value: rawValue, language: getFileLanguage(filename) },
        monaco as any,
        willChangeEditor as editor.IStandaloneCodeEditor,
        setModels,
        setActiveModel,
        willChangeEditorId,
      );
    }
  }

  return (
    <AccordionItem
      value={value}
      className={cn(className, '')}
      data-state={'open'}
      onClick={onClick}
    >
      <TooltipProvider>
        <Tooltip open={open}>
          <AccordionTrigger className="text-[14px] hover:bg-gray-600 pr-2 pl-6">
            <div
              className="flex items-center relative w-full"
              onMouseMove={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <img src={`/images/fileIcon/${getFileSpecificIcon(filename)}.svg`} className="mr-1" />
              {filename}
              <span className="absolute right-1 rounded-full bg-gray-600 text-[10px] text-white px-2">
                {matches.length}
              </span>
            </div>
          </AccordionTrigger>
          <TooltipContent className={tipContentClasses}>
            <p>{filepath}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {matches.map((match, index) => {
        const { after, before, match: matchKey, content } = match;

        return (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger className="block pr-2 pl-8 w-full text-left hover:bg-gray-600">
                <AccordionContent
                  key={index}
                  className="text-[14px] cursor-pointer truncate w-full p-0"
                  onMouseUp={() => findFileAtMatchedSelection()}
                >
                  <span>{before}</span>
                  <span className="bg-green-500/[.4]">{matchKey}</span>
                  <span>{after}</span>
                </AccordionContent>
              </TooltipTrigger>
              <TooltipContent className={cn(tipContentClasses, 'max-w-[200px]')}>
                <p>{content}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </AccordionItem>
  );
};

const MatchResultComp: FC<{ className?: string; expandAll?: boolean }> = ({ expandAll = true }) => {
  const { searchResult } = useFileSearch();

  const createDefaultValues = (): Set<string> => {
    //保证结果都默认打开
    return new Set(Array.from({ length: searchResult.length }, (_, i) => `item-${i}`));
  };

  const [values, setValues] = useState<Set<string>>(expandAll ? createDefaultValues() : new Set());
  useEffect(() => {
    setValues(expandAll ? createDefaultValues() : new Set());
  }, [expandAll, searchResult]);
  // console.log('values', values.values());

  const expandOrCollapeItem = (index: number) => {
    const targetValue = `item-${index}`;

    setValues((prev) => {
      const newValues = new Set(prev);

      if (prev.has(targetValue)) {
        newValues.delete(targetValue);
      } else {
        newValues.add(targetValue);
      }

      return newValues;
    });
  };

  return (
    <div className="size-full">
      {/* <ScrollArea className="size-full scrollbar-thin scrollbar-thumb-red}"> */}
      <Accordion
        type="multiple"
        value={Array.from(values)}
        // onValueChange={(e) => console.log('onValueChange', e)}
        // onClick={(e) => console.log('onClick-parent', e.target)}
      >
        {searchResult &&
          searchResult.map((item, index) => (
            <MatchResultItem
              className="size-full"
              data={item}
              key={index}
              value={`item-${index}`}
              onClick={() => expandOrCollapeItem(index)}
            />
          ))}
      </Accordion>
      {/* </ScrollArea> */}
    </div>
  );
};

export default MatchResultComp;
