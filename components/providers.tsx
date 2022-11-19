'use client';

import type { FC, ReactNode } from 'react';
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';

const Providers: FC<{ children: ReactNode }> = ({ children }) => (
  <>
    <TooltipProvider>{children}</TooltipProvider>
    <Toaster position="bottom-right" />
    <Analytics />
  </>
);

export default Providers;
