'use client';

import React, { useState } from 'react';
import { useQRCode } from 'next-qrcode';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

type ShareDocumentButtonProps = {
  shareUrl: string;
};

export const ShareDocumentButton: React.FC<ShareDocumentButtonProps> = ({ shareUrl }) => {
  const { SVG } = useQRCode();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div
        onClick={() => setIsOpen(true)}
        className=" font-bold flex items-center text-sm rounded-sm p-3 pr-4 py-1 bg-[#2a2c35] cursor-pointer"
      >
        分享文档
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>分享文档</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 mt-4">
            {/* 生成二维码 */}
            <SVG
              text={shareUrl}
              options={{
                margin: 2,
                width: 200,
                color: {
                  dark: '#000000',
                  light: '#ffffff',
                },
              }}
            />

            {/* 链接显示和复制 */}
            <div className="text-center">
              <p className="text-sm text-gray-600">或使用链接：</p>
              <a
                href={shareUrl}
                className="text-blue-500 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {shareUrl}
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
