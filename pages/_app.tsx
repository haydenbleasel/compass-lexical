import '../styles/globals.css';
import type { AppProps } from 'next/app';
import type { FC } from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';
import { Analytics } from '@vercel/analytics/react';
import '../lib/firebase';
import { DefaultSeo } from 'next-seo';

const title = 'Compass — a simple, ephemeral notes app';
const description =
  'Compass is a simple app that lets you write Markdown-enabled notes.';

const App: FC<AppProps> = ({ Component, pageProps }) => (
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
    />
    <TooltipProvider delayDuration={0}>
      <Component {...pageProps} />
      <Toaster position="bottom-right" />
    </TooltipProvider>
    <Analytics />
  </>
);

export default App;
