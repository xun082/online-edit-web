'use client';

/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import * as monaco from 'monaco-editor';
import { createHighlighter } from 'shiki';
import { shikiToMonaco } from '@shikijs/monaco';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco';
import { Monaco } from '@monaco-editor/react';

import LoadingComponent from '@/components/edit/edit-loading';
import { CooperationEditorHeader } from '@/components/cooperation/cooperationEditor/cooperationEditorHeader';

// 动态导入 @monaco-editor/react，确保它只在客户端加载
const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

type CooperationEditorProps = {
  roomId: string;
};

export const CooperationEditor: React.FC<CooperationEditorProps> = ({ roomId }) => {
  const ydoc = useMemo(() => new Y.Doc(), []);
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [provider, setProvider] = useState<WebsocketProvider | null>(null);
  const [binding, setBinding] = useState<MonacoBinding | null>(null);

  useEffect(() => {
    if (roomId == null) {
      return;
    }

    const provider = new WebsocketProvider('ws://localhost:8080', 'collaborateDoc', ydoc, {
      params: {
        record_id: roomId,
      },
    });
    setProvider(provider);

    return () => {
      provider?.destroy();
      ydoc.destroy();
    };
  }, [ydoc, roomId]);

  // this effect manages the lifetime of the editor binding
  useEffect(() => {
    if (provider == null || editor == null || roomId === null) {
      return;
    }

    const binding = new MonacoBinding(
      ydoc.getText(),
      editor.getModel()!,
      new Set([editor]),
      provider?.awareness,
    );
    setBinding(binding);

    return () => {
      binding.destroy();
      setBinding(null);
    };
  }, [ydoc, provider, editor, roomId]);

  const handleEditorDidMount = async (
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco,
  ) => {
    setEditor(editor);
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value && ydoc) {
      ydoc.getText('content').insert(0, value);
    }
  };

  return (
    <div className="w-full h-full relative flex flex-col overflow-hidden bg-[#181a1f]">
      <CooperationEditorHeader />
      <div className="w-full flex-1">
        <Editor
          className={'task-description-editor'}
          language="javascript"
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            wordWrap: 'on',
            automaticLayout: true,
            scrollBeyondLastLine: false,
          }}
          loading={<LoadingComponent />}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
        />
      </div>
    </div>
  );
};
