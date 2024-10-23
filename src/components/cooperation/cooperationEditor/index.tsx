'use client';

import React, { useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import * as monaco from 'monaco-editor';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco';

import { Cursor } from '@/components/cooperation/cursor';
import LoadingComponent from '@/components/edit/edit-loading';
import { CooperationEditorHeader } from '@/components/cooperation/cooperationEditor/cooperationEditorHeader';
import { useCooperationPerson } from '@/store/cooperationPersonStore';
import { hexToRgba, throttle, createColorFromId } from '@/utils';

const Editor = dynamic(() => import('@monaco-editor/react'), { ssr: false });

type CooperationEditorProps = {
  roomId: string;
};

export const CooperationEditor: React.FC<CooperationEditorProps> = ({ roomId }) => {
  const ydoc = useMemo(() => new Y.Doc(), []);
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [provider, setProvider] = useState<WebsocketProvider | null>(null);
  const [, setBinding] = useState<MonacoBinding | null>(null);
  const [awareness, setAwareness] = useState<any[]>();
  const { addPersons, removePersons } = useCooperationPerson();

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

  // This effect manages the lifetime of the editor binding
  useEffect(() => {
    if (provider == null || editor == null || roomId === null) {
      return;
    }

    provider.awareness.setLocalStateField('cursorLocation', {
      x: undefined,
      y: undefined,
    });

    const binding = new MonacoBinding(
      ydoc.getText(),
      editor.getModel()!,
      new Set([editor]),
      provider?.awareness,
    );
    setBinding(binding);

    const handleMouseMove = throttle((e: MouseEvent) => {
      provider.awareness.setLocalStateField('cursorLocation', {
        x: e.clientX,
        y: e.clientY,
      });
    }, 15);

    const handleMouseout = () => {
      provider.awareness.setLocalStateField('cursorLocation', {
        x: undefined,
        y: undefined,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseout);

    // Create a single <style> element on mount
    const styleElement = document.createElement('style');
    document.head.appendChild(styleElement);

    provider.awareness.on(
      'change',
      ({
        updated,
        added,
        removed,
      }: {
        updated: Array<number>;
        added: Array<number>;
        removed: Array<number>;
      }) => {
        type UserAwarenessData = Map<number, { firebaseUserID: string; selection: any }>;

        let awarenessState = provider.awareness.getStates() as UserAwarenessData;
        setAwareness(Array.from(awarenessState));

        let newStyles = '';
        addPersons(added.filter((id) => id !== ydoc.clientID));
        addPersons(updated.filter((id) => id !== ydoc.clientID));
        removePersons(removed.filter((id) => id !== ydoc.clientID));

        for (let addedUserID of updated) {
          if (addedUserID === ydoc.clientID) return;

          newStyles += `
          .yRemoteSelection-${addedUserID} {
            background-color: ${createColorFromId(addedUserID)};
            color: ${createColorFromId(addedUserID)};
          }
          .yRemoteSelectionHead-${addedUserID} {
            position: relative;
            border-left: 2px solid ${createColorFromId(addedUserID)};
            border-top: 2px solid ${createColorFromId(addedUserID)};
            border-bottom: 2px solid ${createColorFromId(addedUserID)};
            height: 100%;
            box-sizing: border-box;
          }
          .yRemoteSelectionHead-${addedUserID}::after {
            position: absolute;
            content: "用户${addedUserID}";
            color: white;
            background-color: ${hexToRgba(createColorFromId(addedUserID), 0.5)};
            padding: 4px;
            margin: 4px;
            font-size: 12px;
            left: 0;
            top: 100%;
          }
        `;
        }

        styleElement.innerHTML += newStyles;
      },
    );

    return () => {
      binding.destroy();
      setBinding(null);
      styleElement.remove();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseout);
    };
  }, [ydoc, provider, editor, roomId]);

  const handleEditorDidMount = async (editor: monaco.editor.IStandaloneCodeEditor) => {
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
        {awareness
          ?.filter(([id]) => id !== ydoc.clientID) // Filter out self
          .filter(([, state]) => state.cursorLocation.x !== undefined) // Filter out users who have left the page
          .map(([id, state]) => {
            return (
              <Cursor
                key={id}
                color={createColorFromId(id)}
                point={[state.cursorLocation.x, state.cursorLocation.y]}
              ></Cursor>
            );
          })}
      </div>
    </div>
  );
};
