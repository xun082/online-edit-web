import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { WebLinksAddon } from 'xterm-addon-web-links';
import { WebglAddon } from 'xterm-addon-webgl';
import { WebContainerProcess } from '@webcontainer/api';

import { useWebContainerStore } from '@/store/webContainerStore';

let terminal: Terminal;
const fitAddon = new FitAddon();

const webLinksAddon = new WebLinksAddon();
const webglAddon = new WebglAddon();
export interface TerminalPanelRefInterface {
  terminalResize: () => void;
}

export const TerminalPanel = forwardRef<TerminalPanelRefInterface, any>(
  function TerminalPanel(props, ref) {
    const terminalRef = useRef<HTMLDivElement>(null);
    const { webContainerInstance } = useWebContainerStore();
    let shell: WebContainerProcess | null;
    useImperativeHandle(ref, () => ({
      // Expose terminal change size method
      terminalResize: () => {
        fitAddon.fit();
        shell?.resize({
          cols: terminal.cols,
          rows: terminal.rows,
        });
      },
    }));
    useEffect(() => {
      async function init() {
        if (webContainerInstance !== null) {
          if (terminalRef.current && !terminal) {
            terminal = new Terminal({
              fontFamily: '"Cascadia Code", Menlo, monospace',
              convertEol: true,
              cursorBlink: true,
              scrollback: 20,
              scrollOnUserInput: true,
              drawBoldTextInBrightColors: true,
            });

            terminal.loadAddon(fitAddon);
            terminal.loadAddon(webLinksAddon);
            terminal.loadAddon(webglAddon);

            terminal.open(terminalRef.current);
            fitAddon.fit();
            shell = await webContainerInstance?.spawn('jsh', {
              terminal: {
                cols: terminal.cols,
                rows: terminal.rows,
              },
            });

            window.addEventListener('resize', () => {
              fitAddon.fit();
              shell?.resize({
                cols: terminal.cols,
                rows: terminal.rows,
              });
            });

            shell?.output.pipeTo(
              new WritableStream({
                write(data) {
                  terminal.write(data);
                },
              }),
            );

            const input = shell?.input.getWriter();

            terminal.onData((data: string) => {
              input?.write(data);
            });
          }
        }
      }

      init();
    }, [webContainerInstance]);

    return <div className=" h-full" ref={terminalRef} />;
  },
);
