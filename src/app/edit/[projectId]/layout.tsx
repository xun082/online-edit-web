'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PanelGroup, Panel } from 'react-resizable-panels';
import { DndContext } from '@dnd-kit/core';
import { FaFileAlt, FaSearch, FaPlug, FaCog, FaQuestionCircle } from 'react-icons/fa';
import { PiOpenAiLogo } from 'react-icons/pi';
import { editor } from 'monaco-editor';
import { motion, useAnimation } from 'framer-motion';

import ResizeHandle from '@/components/resize-handle';
import { PATHS } from '@/utils';
import { Preview } from '@/components/preview';
import { Header } from '@/components/edit/header';
import CodeEditor from '@/components/editor';
import { DragIcon } from '@/components/file/dragIcon';
import { TerminalPanel } from '@/components/terminal';
import { useActiveModelStore, useModelsStore, useSplitStore } from '@/store/editorStore';
import { useDragIconStore } from '@/store/dragIconStore';
import { useUploadFileDataStore } from '@/store/uploadFileDataStore';
import { addNewModel } from '@/utils';

const MockUserInfo = {
  name: 'xiaoming',
};

const MockProjectData = {
  name: '这是一个project',
};

const renderSplitCodeEditor = (splitState: boolean[]): JSX.Element[] => {
  return splitState
    .map((state, index) => {
      if (!state) return null;

      return (
        <React.Fragment key={index}>
          {index !== 0 && <ResizeHandle key={`resize-${index}`} />}
          <Panel key={`panel-${index}`} defaultSize={100} minSize={10}>
            <div key={`div-${index}`} className="flex-1 h-full overflow-hidden">
              <CodeEditor editorId={index} />
            </div>
          </Panel>
        </React.Fragment>
      );
    })
    .filter((element): element is JSX.Element => element !== null); // 过滤掉 null 值
};

const Page: React.FC<{ children: React.ReactNode; params: any }> = ({ children, params }) => {
  const terminalRef = useRef<any>(null);
  const pathname = usePathname();
  const { splitState, removeSplit } = useSplitStore();

  const controls = useAnimation();

  const { models, setModels, removeAllModel } = useModelsStore();

  const { setActiveModel, clearActiveModel } = useActiveModelStore();

  const { dragIconRef } = useDragIconStore();

  const { initFileData, clearFileData } = useUploadFileDataStore();

  useEffect(() => {
    initFileData(params.projectId);
    window.addEventListener('beforeunload', (event) => {
      event?.preventDefault();
      clearFileData(true, params.projectId);
    });

    return () => {
      removeAllModel(0);
      removeAllModel(1);
      removeAllModel(2);
      clearActiveModel(0);
      clearActiveModel(1);
      clearActiveModel(2);
      removeSplit(1);
      removeSplit(2);
      clearFileData(true, params.projectId);
    };
  }, [params.projectId, initFileData]);
  useEffect(() => {
    controls.start({
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { ease: 'easeInOut', duration: 1 },
    });
  }, [pathname, controls]);

  const editPanelGroupResize = () => {
    terminalRef.current?.terminalResize();
  };

  function handleFileDrop({ active, over }: any) {
    dragIconRef.style.display = 'none';
    dragIconRef.style.left = '0px';
    dragIconRef.style.top = '0px';
    dragIconRef.innerHtml = '';
    if (!active || !over) return;

    const { file, monacos } = active.data.current;
    const editor = over.data.current.editorInstance;

    const willChangeEditor = editor;
    const willChangeEditorId = over.id;

    const mathModel = models.filter((model) => model.id === file.id);

    if (mathModel.length > 0) {
      mathModel[0].model && setActiveModel(mathModel[0].id, mathModel[0], willChangeEditorId);
      mathModel[0].model &&
        setModels(
          { filename: mathModel[0].filename, value: '', language: 'typescript', id: file.id },
          mathModel[0].model,
          willChangeEditorId,
          file.id,
        );
      willChangeEditor?.setModel(mathModel[0].model);
    } else {
      const monaco = monacos[willChangeEditorId];
      addNewModel(
        file,
        monaco as any,
        willChangeEditor as editor.IStandaloneCodeEditor,
        setModels,
        setActiveModel,
        willChangeEditorId,
      );
    }
  }

  return (
    <div className="flex flex-col justify-start items-center h-[100vh] overflow-hidden">
      {/* Header */}
      <div className=" w-full h-[5vh] flex items-center justify-around bg-[#24262b]">
        <Header projectId={params.projectId} userInfo={MockUserInfo} project={MockProjectData} />
      </div>
      <div className=" w-full flex flex-1 overflow-hidden">
        {/* 侧边栏 */}
        <div className="bg-[#2e3138] text-gray-400 w-[2.9vw] flex flex-col justify-between items-center py-4">
          <div className="flex flex-col items-center space-y-6">
            <Link href={PATHS.EDIT_FILE}>
              <FaFileAlt size="18" className={pathname === PATHS.EDIT_FILE ? 'text-white' : ''} />
            </Link>
            <Link href={PATHS.EDIT_SEARCH}>
              <FaSearch size="18" className={pathname === PATHS.EDIT_SEARCH ? 'text-white' : ''} />
            </Link>
            <Link href={PATHS.EDIT_PLUGINS}>
              <FaPlug size="18" className={pathname === PATHS.EDIT_PLUGINS ? 'text-white' : ''} />
            </Link>
            <Link href={PATHS.EDIT_SETTINGS}>
              <FaCog size="18" className={pathname === PATHS.EDIT_SETTINGS ? 'text-white' : ''} />
            </Link>
            <Link href={PATHS.AI}>
              <PiOpenAiLogo size="18" className={pathname === PATHS.AI ? 'text-white' : ''} />
            </Link>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <FaQuestionCircle size="20" />
          </div>
        </div>
        {/* 可调整大小的面板 */}
        <DndContext onDragEnd={(e) => handleFileDrop(e)}>
          <PanelGroup direction="horizontal" className="flex-1">
            <Panel minSize={1} defaultSize={15} className="bg-[#202327]">
              <motion.div
                key={pathname}
                className=" overflow-y-scroll h-full hide-scrollbar"
                initial={{ y: 20, opacity: 0, scale: 0.95 }}
                animate={controls}
                transition={{ ease: 'easeInOut', duration: 1 }}
              >
                {children}
              </motion.div>
            </Panel>
            <ResizeHandle className=" w-[3px] bg-transparent" />
            <Panel className="flex-1 bg-gray-700" minSize={1} defaultSize={50}>
              <PanelGroup direction="vertical" className="h-full" onLayout={editPanelGroupResize}>
                <Panel defaultSize={70} className=" bg-[#15181e]" collapsible={true}>
                  <PanelGroup direction="horizontal" className=" flex relative h-full">
                    {renderSplitCodeEditor(splitState)}
                  </PanelGroup>
                </Panel>
                <ResizeHandle className=" bg-transparent h-[3px]" direction="vertical" />
                <Panel defaultSize={30} minSize={4} className="bg-black">
                  <div className=" text-green-500 h-full">
                    <TerminalPanel ref={terminalRef} />
                  </div>
                </Panel>
              </PanelGroup>
            </Panel>
            <ResizeHandle className=" w-[3px] bg-transparent" />
            <Panel className="bg-[#202327]" minSize={1} defaultSize={35}>
              <div className=" h-full">
                <Preview />
              </div>
            </Panel>
          </PanelGroup>
        </DndContext>
      </div>
      <DragIcon />
    </div>
  );
};

export default Page;
