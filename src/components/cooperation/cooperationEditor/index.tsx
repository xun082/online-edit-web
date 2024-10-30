'use client';

import React, { memo, useEffect, useMemo, useState, useRef } from 'react';
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
  userInfo: Record<string, any>;
};

const CooperationEditor: React.FC<CooperationEditorProps> = ({ roomId, userInfo }) => {
  const ydoc = useMemo(() => new Y.Doc({}), []);
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [provider, setProvider] = useState<WebsocketProvider | null>(null);
  const [, setBinding] = useState<MonacoBinding | null>(null);
  const [awareness, setAwareness] = useState<any[]>([]);
  const { removePersons, addPersons } = useCooperationPerson();

  const emailsRef = useRef(new Set());
  const emailMapRef = useRef(new Map());

  useEffect(() => {
    if (!roomId) return;

    const provider = new WebsocketProvider(
      `${process.env.NEXT_PUBLIC_WS_URL}`,
      'collaborateDoc',
      ydoc,
      {
        params: { record_id: roomId },
      },
    );
    setProvider(provider);

    const handleBeforeUnload = () => {
      provider.awareness.setLocalStateField('cursorLocation', { x: undefined, y: undefined });
      provider.destroy();
      ydoc.destroy();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      provider.destroy();
      ydoc.destroy();
      setBinding(null);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [ydoc, roomId]);

  useEffect(() => {
    if (!provider || !editor || !roomId) return;

    provider.awareness.setLocalStateField('cursorLocation', { x: undefined, y: undefined });
    provider.awareness.setLocalStateField('userInfo', userInfo);

    const binding = new MonacoBinding(
      ydoc.getText(),
      editor.getModel()!,
      new Set([editor]),
      provider.awareness,
    );
    setBinding(binding);

    const handleMouseMove = throttle((e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      provider.awareness.setLocalStateField('cursorLocation', {
        x:
          clientX < 10 || clientX > innerWidth - 10 || clientY < 10 || clientY > innerHeight - 10
            ? undefined
            : clientX,
        y:
          clientX < 10 || clientX > innerWidth - 10 || clientY < 10 || clientY > innerHeight - 10
            ? undefined
            : clientY,
      });
    }, 10);

    const handleMouseout = () => {
      provider.awareness.setLocalStateField('cursorLocation', { x: undefined, y: undefined });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseout);

    const styleElement = document.createElement('style');
    document.head.appendChild(styleElement);

    const updateUsers = (userIds: Array<number>, action: 'add' | 'remove' | 'update') => {
      userIds.forEach((id) => {
        const user = provider.awareness.getStates().get(id);
        console.log(emailMapRef.current);

        if (!user) {
          const email = findKeyContainingElement(emailMapRef.current, id);

          if (email) {
            emailsRef.current.delete(email);
            removePersons([email]);
          }
        } else if (user.userInfo?.email) {
          const email = user.userInfo.email;

          if (emailMapRef.current.has(email)) {
            emailMapRef.current.set(
              email,
              Array.from(new Set([...emailMapRef.current.get(email), id])),
            );
          } else {
            emailMapRef.current.set(email, [id]);
          }

          if (action === 'add') {
            emailsRef.current.add(email);
            addPersons(Array.from(emailsRef.current) as string[]);
          } else if (action === 'remove') {
            emailsRef.current.delete(email);
            removePersons([email]);
          }
        }
      });
    };

    const throttledUpdate = throttle((changes: Record<string, any>) => {
      const { updated, added, removed } = changes;
      const awarenessState = provider.awareness.getStates();
      setAwareness(Array.from(awarenessState));

      updateUsers(updated, 'update');
      updateUsers(added, 'add');
      updateUsers(removed, 'remove');

      let newStyles = '';

      updated.forEach((addedUserClientID: any) => {
        if (addedUserClientID === ydoc.clientID) return;

        const addUserId = awarenessState.get(addedUserClientID)?.userInfo?.email;

        if (addUserId) {
          newStyles += `
            .yRemoteSelection-${addedUserClientID} {
              background-color: ${createColorFromId(addUserId)};
              color: ${createColorFromId(addUserId)};
            }
            .yRemoteSelectionHead-${addedUserClientID} {
              position: relative;
              border: 2px solid ${createColorFromId(addUserId)};
              height: 100%;
              box-sizing: border-box;
            }
            .yRemoteSelectionHead-${addedUserClientID}::after {
              position: absolute;
              content: "用户${addUserId}";
              color: white;
              background-color: ${hexToRgba(createColorFromId(addUserId), 0.5)};
              padding: 4px;
              margin: 4px;
              font-size: 12px;
              left: 0;
              top: 100%;
            }
          `;
        }
      });

      styleElement.innerHTML += newStyles;
    }, 250);

    provider.awareness.on('change', throttledUpdate);

    return () => {
      binding.destroy();
      setBinding(null);
      styleElement.remove();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseout);
      provider.awareness.off('change', throttledUpdate); // 移除事件监听器
    };
  }, [provider, editor, roomId, userInfo]);

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
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
          .filter(([id]) => id !== ydoc.clientID)
          .filter(([, state]) => state.cursorLocation?.x !== undefined)
          .map(([id, state]) => (
            <Cursor
              key={id}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              //@ts-expect-error
              color={createColorFromId(provider?.awareness.getStates().get(id).userInfo.email)}
              point={[state.cursorLocation.x, state.cursorLocation.y]}
            />
          ))}
      </div>
    </div>
  );
};

function findKeyContainingElement(map: Map<string, any>, element: number) {
  for (const [key, valueArray] of map.entries()) {
    if (Array.isArray(valueArray) && valueArray.includes(element)) {
      return key;
    }
  }

  return null;
}

export default memo(CooperationEditor);
