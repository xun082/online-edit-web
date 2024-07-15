import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextDevtoolsProvider } from '@next-devtools/core';

import './globals.css';
import { ModalProvider } from '@/components/provider/modal-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'online-edit',
  description: 'online edit web app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextDevtoolsProvider>
          {children}
          <ModalProvider />
        </NextDevtoolsProvider>
      </body>
    </html>
  );
}
