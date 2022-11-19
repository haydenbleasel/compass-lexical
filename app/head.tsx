import { NextSeo } from 'next-seo';
import type { ReactNode } from 'react';

const title = 'Compass — a simple, ephemeral notes app';
const description =
  'Compass is a simple app that lets you write Markdown-enabled notes.';

const Head = (): ReactNode => (
  <>
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        type: 'website',
        locale: 'en_US',
        url: process.env.NEXT_PUBLIC_SITE_URL,
        site_name: 'Compass',
        images: [
          {
            url: new URL(
              `/api/og?title=${title}&description=${description}`,
              process.env.NEXT_PUBLIC_SITE_URL ?? ''
            ).href,
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
      useAppDir
    />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
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
  </>
);

export default Head;
