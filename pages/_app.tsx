import '../styles/globals.css';
import type { AppProps } from 'next/app';
import type { FC } from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';
import { Analytics } from '@vercel/analytics/react';
import '../lib/firebase';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <TooltipProvider delayDuration={0}>
      <Component {...pageProps} />
      <Toaster position="bottom-right" />
    </TooltipProvider>
    <Analytics />
  </>
);

export default App;
