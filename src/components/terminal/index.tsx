'use client';

import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';

import { useWebContainerStore } from '@/store/webContainerStore';

export interface TerminalPanelRefInterface {
  terminalResize: () => void;
}

export const TerminalPanel = forwardRef<TerminalPanelRefInterface, any>(
  function TerminalPanel(props, ref) {
    if (!window) return null;

    const terminalRef = useRef<HTMLDivElement>(null);
    const { webContainerInstance } = useWebContainerStore();

    let shell: any; // This should be of type WebContainerProcess from @webcontainer/api but we use 'any' for simplicity
    let terminal: any;
    let fitAddon: any;
    let webLinksAddon: any;
    let webglAddon: any;

    useImperativeHandle(ref, () => ({
      terminalResize: () => {
        if (fitAddon && shell) {
          fitAddon.fit();
          shell.resize({
            cols: terminal.cols,
            rows: terminal.rows,
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
          if (terminalRef.current) {
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

            shell = await webContainerInstance.spawn('jsh', {
              terminal: {
                cols: terminal.cols,
                rows: terminal.rows,
              },
            });

            window.addEventListener('resize', () => {
              if (fitAddon && shell) {
                fitAddon.fit();
                shell.resize({
                  cols: terminal.cols,
                  rows: terminal.rows,
                });
              }
            });

            shell.output.pipeTo(
              new WritableStream({
                write(data) {
                  terminal.write(data);
                },
              }),
            );

            const input = shell.input.getWriter();

            terminal.onData((data: any) => {
              input.write(data);
            });
          }
        }
      })();
    }, [webContainerInstance]);

    return <div className="h-full" ref={terminalRef} />;
  },
);
