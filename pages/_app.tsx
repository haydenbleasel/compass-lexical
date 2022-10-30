import '../styles/globals.css';
import type { AppProps } from 'next/app';
import type { FC } from 'react';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';
import { Analytics } from '@vercel/analytics/react';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import { firebase, appCheck } from '../lib/firebase';

const title = 'Compass — a simple, ephemeral notes app';
const description =
  'Compass is a simple app that lets you write Markdown-enabled notes.';

const app = firebase();

const App: FC<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      appCheck(app);
    }
  }, []);

  return (
    <>
      <DefaultSeo
        title={title}
        description={description}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: 'https://compass.haydenbleasel.com/',
          site_name: 'Compass',
          images: [
            {
              url: `https://compass.haydenbleasel.com/api/og?title=${title}&description=${description}`,
              width: 1200,
              height: 630,
              alt: 'Compass',
            },
          ],
        }}
        twitter={{
          handle: '@haydenbleasel',
          site: '@haydenbleasel',
          cardType: 'summary_large_image',
        }}
      />
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content={title} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={title} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
        />
      </Head>
      <TooltipProvider delayDuration={0}>
        <Component {...pageProps} />
        <Toaster position="bottom-right" />
      </TooltipProvider>
      <Analytics />
    </>
  );
};

export default App;
