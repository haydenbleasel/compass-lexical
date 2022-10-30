import { Html, Head, Main, NextScript } from 'next/document';
import type { FC } from 'react';

const Document: FC = () => (
  <Html lang="en" className="scroll-smooth">
    <Head>
      <link
        href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz@1,6..72&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
    </Head>
    <body className="font-text overflow-x-hidden bg-neutral-100 font-normal antialiased dark:bg-neutral-900">
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
