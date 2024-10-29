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
  userInfo: Record<string, any>;
};

const CooperationEditor: React.FC<CooperationEditorProps> = ({ roomId, userInfo }) => {
  const ydoc = useMemo(() => new Y.Doc({}), []);
  const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [provider, setProvider] = useState<WebsocketProvider | null>(null);
  const [, setBinding] = useState<MonacoBinding | null>(null);
  const [awareness, setAwareness] = useState<any[]>();
  const { setPersons } = useCooperationPerson();

  useEffect(() => {}, []);

  useEffect(() => {
    if (roomId == null) {
      return;
    }

    const provider = new WebsocketProvider(
      `${process.env.NEXT_PUBLIC_WS_URL}`,
      'collaborateDoc',
      ydoc,
      {
        params: {
          record_id: roomId,
        },
      },
    );
    setProvider(provider);

    return () => {
      provider?.destroy();
      ydoc.destroy();
    };
  }, [ydoc, roomId]);

  useEffect(() => {
    if (provider == null || editor == null || roomId === null) {
      return;
    }

    provider.awareness.setLocalStateField('cursorLocation', {
      x: undefined,
      y: undefined,
    });
    provider.awareness.setLocalStateField('userInfo', userInfo);

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
    }, 5);

    const handleMouseout = () => {
      provider.awareness.setLocalStateField('cursorLocation', {
        x: undefined,
        y: undefined,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseout);

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
        type UserAwarenessData = Map<number, Record<any, any>>;

        let awarenessState = provider.awareness.getStates() as UserAwarenessData;
        setAwareness(Array.from(awarenessState));

        let newStyles = '';
        // 如果一个用户打开2个标签也要处理为一个
        const emails = new Set();

        const updateUsers = (userIds: Array<number>, action: 'add' | 'remove') => {
          userIds.forEach((id) => {
            const user = awarenessState.get(id);

            if (user && user.userInfo?.email) {
              const email = user.userInfo.email;

              if (action === 'add') {
                emails.add(email);
                setPersons(Array.from(emails));
              } else {
                emails.delete(email);
                setPersons(Array.from(emails));
              }
            }
          });
        };

        updateUsers(added, 'add');
        updateUsers(updated, 'add');
        updateUsers(removed, 'remove');

        for (let addedUserClientID of updated) {
          if (addedUserClientID === ydoc.clientID) return;

          let addUserId = '';
          Array.from(awarenessState).forEach(([o, t]) => {
            if (o === addedUserClientID) {
              addUserId = t.userInfo?.email;
            }
          });
          newStyles += `
            .yRemoteSelection-${addedUserClientID} {
              background-color: ${createColorFromId(addUserId)};
              color: ${createColorFromId(addUserId)};
            }
            .yRemoteSelectionHead-${addedUserClientID} {
              position: relative;
              border-left: 2px solid ${createColorFromId(addUserId)};
              border-top: 2px solid ${createColorFromId(addUserId)};
              border-bottom: 2px solid ${createColorFromId(addUserId)};
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
          ?.filter(([id]) => id !== ydoc.clientID)
          .filter(([, state]) => state.cursorLocation?.x !== undefined)
          .map(([id, state]) => {
            return (
              <Cursor
                key={id}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                color={createColorFromId(provider?.awareness.getStates().get(id).userInfo.email)}
                point={[state.cursorLocation?.x, state.cursorLocation?.y]}
              />
            );
          })}
      </div>
    </div>
  );
};

export default CooperationEditor;
