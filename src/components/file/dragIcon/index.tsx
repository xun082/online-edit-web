'use client';

import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

import { Badge } from '@/components/ui/badge';
import { useDragIconStore } from '@/store/dragIconStore';

interface DragIconProps {}

export const DragIcon: React.FC<DragIconProps> = () => {
  const { setDragIconRef } = useDragIconStore();
  const flagRef = useRef(false);

  const [body, setBody] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setBody(document.body);
  }, []);
  if (!body) return;

  return ReactDOM.createPortal(
    <div
      ref={(dom) => {
        if (!flagRef.current) {
          setDragIconRef(dom);
          flagRef.current = true;
        }
      }}
      className="absolute left-0 top-0 hidden"
    >
      <Badge className="z-[999] bg-black/60 text-white">3131</Badge>
    </div>,
    body,
  );
};
