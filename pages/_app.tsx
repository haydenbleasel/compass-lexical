import '../styles/globals.css';
import type { AppProps } from 'next/app';
import type { FC } from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';
import { Analytics } from '@vercel/analytics/react';
import '../lib/firebase';
import Head from 'next/head';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Compass — a simple, ephemeral notes app</title>
      <meta
        name="description"
        content="Compass is a simple app that lets you write Markdown-enabled notes."
      />
    </Head>
    <TooltipProvider delayDuration={0}>
      <Component {...pageProps} />
      <Toaster position="bottom-right" />
    </TooltipProvider>
    <Analytics />
  </>
);

export default App;
