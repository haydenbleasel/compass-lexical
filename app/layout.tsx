'use client';
import type { ReactNode } from 'react';
import '../styles/globals.css';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';
import { Analytics } from '@vercel/analytics/react';
import useTheme from '@haydenbleasel/use-theme';
import {
  Inter as createInter,
  Newsreader as createNewsreader,
} from '@next/font/google';
import { firebase, appCheck } from '../lib/firebase';

const inter = createInter({ variable: '--font-inter' });
const newsreader = createNewsreader({ variable: '--font-newsreader' });

const app = firebase();

const RootLayout = ({ children }: { children: ReactNode }): ReactNode => {
  useTheme();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      appCheck(app);
    }
  }, []);

  return (
    <html
      lang="en"
      className={`${inter.variable} ${newsreader.variable} scroll-smooth`}
    >
      <body className="font-text overflow-x-hidden bg-zinc-100 font-normal antialiased dark:bg-zinc-900">
        <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
        <Toaster position="bottom-right" />
        <Analytics />
      </body>
    </html>
  );
};

export default RootLayout;
