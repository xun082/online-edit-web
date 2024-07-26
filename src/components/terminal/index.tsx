'use client';

import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';

import { useWebContainerStore } from '@/store/webContainerStore';

export interface TerminalPanelRefInterface {
  terminalResize: () => void;
}

export const TerminalPanel = forwardRef<TerminalPanelRefInterface, any>(
  function TerminalPanel(props, ref) {
    const terminalRef = useRef<HTMLDivElement>(null);
    const { webContainerInstance, setUrl } = useWebContainerStore();

    let shell = useRef<any>(null); // This should be of type WebContainerProcess from @webcontainer/api but we use 'any' for simplicity
    let terminal: any;
    let fitAddon: any;
    let webLinksAddon: any;
    let webglAddon: any;

    useImperativeHandle(ref, () => ({
      terminalResize: () => {
        if (fitAddon && shell.current) {
          fitAddon.fit();
          shell.current.resize({
            cols: terminal?.cols,
            rows: terminal?.rows,
          });
        }
      },
    }));

    useEffect(() => {
      (async function init() {
        const { Terminal } = await import('xterm');
        const { FitAddon } = await import('xterm-addon-fit');
        const { WebLinksAddon } = await import('xterm-addon-web-links');
        const { WebglAddon } = await import('xterm-addon-webgl');
        fitAddon = new FitAddon();
        webLinksAddon = new WebLinksAddon();
        webglAddon = new WebglAddon();

        if (webContainerInstance) {
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

            shell.current = await webContainerInstance.spawn('jsh', {
              terminal: {
                cols: terminal?.cols,
                rows: terminal?.rows,
              },
            });

            window.addEventListener('resize', () => {
              if (fitAddon && shell.current) {
                fitAddon.fit();
                shell.current.resize({
                  cols: terminal?.cols,
                  rows: terminal?.rows,
                });
              }
            });

            shell.current.output.pipeTo(
              new WritableStream({
                write(data) {
                  terminal?.write(data);
                },
              }),
            );

            const input = shell.current.input.getWriter();

            terminal?.onData((data: any) => {
              input.write(data);
            });
          }
        }
      })();

      return () => {
        webContainerInstance?.fs.rm('/', { recursive: true });
        shell.current?.kill();
        setUrl('');
        terminal = null;
      };
    }, [webContainerInstance]);

    return <div className="h-full" ref={terminalRef} />;
  },
);
