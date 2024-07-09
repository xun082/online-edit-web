import React, { FC, memo, useState, ChangeEvent, useEffect } from 'react';
import { FaUndoAlt, FaLock } from 'react-icons/fa';
import { RxPinRight, RxPinLeft, RxOpenInNewWindow } from 'react-icons/rx';
import { Slot } from '@radix-ui/react-slot';
import { v4 as uniqueKey } from 'uuid';

import BootingWebContainer from './booting';

// 自定义输入框组件
const CustomInput: FC<{
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}> = ({ value, onChange, placeholder }) => {
  return (
    <div
      className="flex items-center bg-gray-900 text-white  px-2 py-1 rounded flex-1 box-border border 
    hover:border-white hover:border-solid duration-300"
    >
      <Slot>
        <FaLock className="mr-2" />
      </Slot>
      <input
        type="text"
        className="bg-transparent border-none flex-1 outline-none text-white "
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export const Preview: FC = memo(function Preview() {
  const uuid = uniqueKey();
  const src = 'https://www.bilibili.com/';

  const [iframeUrl, setIframeUrl] = useState<string>('');
  const [id, setId] = useState<string>(uuid);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIframeUrl(src);
  }, [src]);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIframeUrl(event.target.value);
  };

  return (
    <main className="flex flex-col h-full">
      <header className="flex items-center p-2 bg-gray-800 text-white">
        <FaUndoAlt
          className="text-slate-400 hover:text-white transition-all duration-300 ease-in-out cursor-pointer mx-2"
          onClick={() => setId(uniqueKey())}
        />
        <div className="flex-1 ml-2 ">
          <CustomInput value={iframeUrl} onChange={handleInputChange} placeholder="Enter URL" />
        </div>
        <RxOpenInNewWindow className="cursor-pointer mx-2 " />
        {true ? (
          <RxPinRight className="text-slate-400 hover:text-white transition-all duration-300 ease-in-out cursor-pointer mx-2" />
        ) : (
          <RxPinLeft className="text-slate-400 hover:text-white transition-all duration-300 ease-in-out cursor-pointer mx-2" />
        )}
      </header>
      <div className="bg-gray-800 flex-1 border-0">
        {loaded ? (
          <iframe width="100%" height="100%" src={iframeUrl} key={id}></iframe>
        ) : (
          <BootingWebContainer />
        )}
      </div>
    </main>
  );
});
