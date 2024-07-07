'use client';

import { useRef } from 'react';
import { PanelGroup, Panel } from 'react-resizable-panels';
import { FaFileAlt, FaSearch, FaPlug, FaCog, FaQuestionCircle } from 'react-icons/fa';

import ResizeHandle from '@/components/resize-handle';

const Page = () => {
  const terminalRef = useRef<any>(null);

  const editPanelGroupResize = () => {
    terminalRef.current?.terminalResize();
  };

  return (
    <div className="flex h-screen">
      {/* 侧边栏 */}
      <div className="bg-gray-900 text-gray-400 w-16 flex flex-col justify-between items-center py-4">
        <div className="flex flex-col items-center space-y-4">
          <FaFileAlt size="24" className="text-white" />
          <FaSearch size="24" />
          <FaPlug size="24" />
          <FaCog size="24" />
        </div>
        <div className="flex flex-col items-center space-y-4">
          <FaQuestionCircle size="24" />
        </div>
      </div>

      {/* 可调整大小的面板 */}
      <PanelGroup direction="horizontal" className="flex-1">
        <Panel minSize={1} defaultSize={15} className="bg-gray-800">
          <div className="p-4 h-full">
            <h2 className="text-white">Ports in Use</h2>
            {/* 在这里添加内容 */}
          </div>
        </Panel>
        <ResizeHandle />
        <Panel className="flex-1 bg-gray-700" minSize={1} defaultSize={50}>
          <PanelGroup direction="vertical" className="h-full" onLayout={editPanelGroupResize}>
            <Panel className="bg-gray-600" collapsible={true}>
              <div className="p-4 h-full">
                <h2 className="text-white">Workspace Snippets</h2>
                {/* 在这里添加内容 */}
              </div>
            </Panel>
            <ResizeHandle direction="vertical" />
            <Panel defaultSize={30} minSize={2} className="bg-black">
              <div className="p-4 text-green-500 h-full">
                <h2>Terminal</h2>
                {/* 在这里添加内容 */}
              </div>
            </Panel>
          </PanelGroup>
        </Panel>
        <ResizeHandle />
        <Panel className="bg-gray-900" minSize={1} defaultSize={35}>
          <div className="p-4 h-full">
            <h2 className="text-white">Web Preview</h2>
            {/* 在这里添加内容 */}
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
};

export default Page;
