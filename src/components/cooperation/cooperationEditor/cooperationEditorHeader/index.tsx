import React from 'react';
import { GrLanguage } from 'react-icons/gr';
import { CgArrowsExchangeAlt } from 'react-icons/cg';

// eslint-disable-next-line @typescript-eslint/ban-types
type CooperationEditorHeaderProps = {};

export const CooperationEditorHeader: React.FC<CooperationEditorHeaderProps> = ({}) => {
  return (
    <div className=" flex items-center justify-between h-12 w-full border-b border-white/20 px-6 cursor-pointer7">
      <div className=" font-bold flex items-center text-sm rounded-sm p-3 pr-4 py-1 bg-[#2a2c35] cursor-pointer">
        <GrLanguage className=" mr-[6px] text-blue-500 font-semibold text-base rotate-90" />
        javascript
      </div>
      <div className=" font-thin text-[#9599a6] hover:text-white/60 flex items-center text-sm rounded-sm p-3 pr-4 py-1 cursor-pointer">
        <CgArrowsExchangeAlt className=" mr-[5px] text-base" />
        <span className=" text-sm">切换语言</span>
      </div>
    </div>
  );
};
