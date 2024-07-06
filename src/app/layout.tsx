import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextDevtoolsProvider } from '@next-devtools/core';

import './globals.css';

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
        <NextDevtoolsProvider>{children}</NextDevtoolsProvider>
      </body>
    </html>
  );
}
