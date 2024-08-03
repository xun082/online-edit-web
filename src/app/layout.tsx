'use client';

import { Inter } from 'next/font/google';

import NextProcessLoader from '@/components/nextTopLoader';

import './globals.css';
import './xterm.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <NextProcessLoader />
        {children}
      </body>
    </html>
  );
}
