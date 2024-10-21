'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Editor, { Monaco, loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { editor } from 'monaco-editor';
import { useDroppable } from '@dnd-kit/core';
import { createHighlighter } from 'shiki';
import { shikiToMonaco } from '@shikijs/monaco';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco';

import {
  useEditorStore,
  useMonacoStore,
  useActiveModelStore,
  useActiveEditorStore,
  useModelsStore,
} from '@/store/editorStore';
import { TabBar } from '@/components/edit/tabbar';
import LoadingComponent from '@/components/edit/edit-loading';
import { useWebContainerStore } from '@/store/webContainerStore';
import { useUploadFileDataStore } from '@/store/uploadFileDataStore';
import { cn, writeFile } from '@/utils';

interface CodeEditorProps {
  editorId: number;
}

interface CollaborateUser {
  name: string;
  color: string;
  cursor: {
    x: number;
    y: number;
  };
}

export default function CodeEditor({ editorId }: CodeEditorProps) {
  const { webContainerInstance } = useWebContainerStore();
  const { updateItem } = useUploadFileDataStore();
  const { getEditor, setEditor } = useEditorStore();
  const { setMonaco } = useMonacoStore();
  const { setModels, models } = useModelsStore();
  const { activeMap, setActiveModel } = useActiveModelStore();
  const { activeEditorId, setActiveEditor } = useActiveEditorStore();
  const thisEditor = getEditor(editorId);
  const currentModel = activeMap[editorId];
  // console.log(thisEditor);
  // used for dnd
  // console.log(activeMap, activeEditorId);
  // 当前编辑model的path，用于与webContainer文件系统同步

  const currentPath = (activeMap[editorId]?.model as any)?.path;
  const currentId = activeMap[editorId]?.model?.id;

  const [, setUserInfo] = useState<Array<CollaborateUser>>([]);
  const [provider, setProvider] = useState<WebsocketProvider>();

  const { isOver, setNodeRef } = useDroppable({
    id: editorId,
    data: {
      editorInstance: thisEditor,
    },
  });

  const style = {
    border: isOver ? '1px #3b82f6 solid' : undefined,
  };

  const handleEditorDidMount = useCallback(
    async (editor: monaco.editor.IStandaloneCodeEditor, monaco: Monaco) => {
      monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
        module: monaco.languages.typescript.ModuleKind.ESNext,
        moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
        isolatedModules: true,
        allowJs: true,
        strict: true,
        skipLibCheck: true,
        jsx: monaco.languages.typescript.JsxEmit.Preserve,
        target: monaco.languages.typescript.ScriptTarget.ES2020,
        esModuleInterop: true,
      });

      setEditor(editorId, editor);
      setMonaco(editorId, monaco);

      const highlighter = await createHighlighter({
        themes: ['vitesse-dark', 'vitesse-light'],
        langs: ['javascript', 'typescript', 'vue', 'jsx'],
      });

      // Register the languageIds first. Only registered languages will be highlighted.
      monaco.languages.register({ id: 'vue' });
      monaco.languages.register({ id: 'typescript' });
      monaco.languages.register({ id: 'javascript' });
      monaco.languages.register({ id: 'jsx' });

      // Register the themes from Shiki, and provide syntax highlighting for Monaco.
      shikiToMonaco(highlighter, monaco);

      if (editorId !== 0) {
        const newModel = activeEditorId < 1 ? activeMap[0] : activeMap[1];
        newModel.model && setActiveModel(newModel.modelId, newModel.model, editorId);
        newModel.model &&
          setModels(
            { filename: newModel.modelId, value: '', language: 'typescript', id: newModel.modelId },
            newModel.model.model,
            editorId,
            newModel.modelId,
          );
        editor.setModel(newModel.model?.model as editor.ITextModel);
      }

      if (models.length === 0) {
        const defaultModel = monaco.editor.createModel('', 'typescript');
        editor.setModel(defaultModel);
      }

      monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: false,
        noSyntaxValidation: false,
      });
      editor.onDidFocusEditorText(() => {
        setActiveEditor(editor, editorId);
      });

      loader.init().then(/* ... */);
    },
    [],
  );

  const handleEditorChange = (value: string = ''): void => {
    currentId && updateItem(currentId, { value });
    webContainerInstance && writeFile(currentPath, value, webContainerInstance);
  };

  const ydoc = useMemo(() => new Y.Doc(), []);

  useEffect(() => {
    //先用monaco官方的
    const provider = new WebsocketProvider('wss://demos.yjs.dev/ws', 'monaco-react-2', ydoc);
    setProvider(provider);

    // 获取 provider 的 awareness 实例
    const awareness = provider.awareness;

    // 设置当前用户的状态
    awareness.setLocalStateField('user', {
      name: 'Alice', // 用户名，可以动态设置, 设置当前协作用户信息
      color: '#ff0000', // 用户颜色
      cursor: { x: 10, y: 20 }, // 光标位置信息
    });

    // 获取当前在线的用户信息
    const getAllUsers = () => {
      const userStates = Array.from(awareness.getStates().values()) as [CollaborateUser];
      setUserInfo(userStates); // 更新用户状态到 state
    };

    // 初始化时获取所有在线用户
    getAllUsers();

    // 监听用户状态更新事件，当有用户加入、离开或更新状态时调用
    awareness.on('update', () => {
      getAllUsers();
    });

    // 清理函数，断开 WebSocket 连接
    return () => {
      provider.disconnect();
    };
  }, [ydoc]);

  useEffect(() => {
    if (provider === null || thisEditor === null) {
      return;
    }

    // Y.applyUpdate(ydoc, data) 这里可以把后台数据库存储的拿过来渲染

    const binding = new MonacoBinding(
      ydoc.getText('monaco'),
      thisEditor.getModel()!,
      new Set([thisEditor]),
      provider?.awareness,
    );

    return () => {
      binding.destroy();
    };
  }, [provider, thisEditor, ydoc]);

  return (
    <div
      ref={setNodeRef}
      className={cn(
        ' w-full h-full flex-col border-[1px] hidden',
        (thisEditor === null || currentModel?.model) && ' flex',
      )}
      style={style}
    >
      <div className=" h-[3.5vh] w-full bg-[#202327]/80">
        <TabBar editorId={editorId} />
      </div>
      <Editor
        className={'editor'}
        theme={'vitesse-dark'}
        options={{
          minimap: { enabled: true },
          fontSize: 16,
          wordWrap: 'on', // 是否换行
          automaticLayout: true,
        }}
        loading={<LoadingComponent></LoadingComponent>}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
      />
    </div>
  );
}
