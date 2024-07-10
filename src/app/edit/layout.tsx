'use client';

import React, { Fragment, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PanelGroup, Panel } from 'react-resizable-panels';
import { FaFileAlt, FaSearch, FaPlug, FaCog, FaQuestionCircle } from 'react-icons/fa';

import ResizeHandle from '@/components/resize-handle';
import { PATHS } from '@/utils';
import { Preview } from '@/components/preview';
import { Header } from '@/components/edit/header';
import CodeEditor from '@/components/editor';
import { useSplitStore } from '@/store/editorStore';

const MockUserInfo = {
  name: 'xiaoming',
};

const MockProjectData = {
  name: '这是一个project',
};

const renderSplitCodeEditor = (splitState: boolean[]): React.ReactNode => {
  return splitState.map((state, index) => {
    return (
      state && (
        <Fragment key={`${state}+${index}}`}>
          <Panel defaultSize={100} minSize={10} key={`${state}+${index}}`}>
            <div className="flex-1 h-full overflow-hidden">
              <CodeEditor editorId={index} />
            </div>
          </Panel>
          {index < splitState.length - 1 && <ResizeHandle />}
        </Fragment>
      )
    );
  });
};
const Page: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const terminalRef = useRef<any>(null);
  const pathname = usePathname();
  const { splitState } = useSplitStore();

  const editPanelGroupResize = () => {
    terminalRef.current?.terminalResize();
  };

  return (
    <div className="flex flex-col justify-start items-center h-[100vh] overflow-hidden">
      {/* Header */}
      <div className=" w-full h-[5vh] flex items-center justify-around bg-[#24262b]">
        <Header userInfo={MockUserInfo} project={MockProjectData} />
      </div>
      <div className=" w-full flex flex-1 overflow-hidden">
        {' '}
        {/* 侧边栏 */}
        <div className="bg-gray-900 text-gray-400 w-[2.9vw] flex flex-col justify-between items-center py-4">
          <div className="flex flex-col items-center space-y-4">
            <Link href={PATHS.EDIT_FILE}>
              <FaFileAlt size="24" className={pathname === PATHS.EDIT_FILE ? 'text-white' : ''} />
            </Link>
            <Link href={PATHS.EDIT_SEARCH}>
              <FaSearch size="24" className={pathname === PATHS.EDIT_SEARCH ? 'text-white' : ''} />
            </Link>
            <Link href={PATHS.EDIT_PLUGINS}>
              <FaPlug size="24" className={pathname === PATHS.EDIT_PLUGINS ? 'text-white' : ''} />
            </Link>
            <Link href={PATHS.EDIT_SETTINGS}>
              <FaCog size="24" className={pathname === PATHS.EDIT_SETTINGS ? 'text-white' : ''} />
            </Link>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <FaQuestionCircle size="24" />
          </div>
        </div>
        {/* 可调整大小的面板 */}
        <PanelGroup direction="horizontal" className="flex-1">
          <Panel minSize={1} defaultSize={15} className="bg-gray-800">
            {children}
          </Panel>
          <ResizeHandle />
          <Panel className="flex-1 bg-gray-700" minSize={1} defaultSize={50}>
            <PanelGroup direction="vertical" className="h-full" onLayout={editPanelGroupResize}>
              <Panel defaultSize={70} className="bg-gray-600" collapsible={true}>
                <PanelGroup direction="horizontal" className=" flex relative h-full">
                  {renderSplitCodeEditor(splitState)}
                </PanelGroup>
              </Panel>
              <ResizeHandle direction="vertical" />
              <Panel defaultSize={30} minSize={4} className="bg-black">
                <div className=" text-green-500 h-full">
                  <h2>Terminal</h2>
                </div>
              </Panel>
            </PanelGroup>
          </Panel>
          <ResizeHandle />
          <Panel className="bg-gray-900" minSize={1} defaultSize={35}>
            <div className=" h-full">
              <Preview />
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
};

export default Page;
