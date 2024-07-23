'use client';

import { Inter } from 'next/font/google';

import { WebContainerProvider } from '@/context/webContainer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <WebContainerProvider>{children}</WebContainerProvider>
      </body>
    </html>
  );
}
