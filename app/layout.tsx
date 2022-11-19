import type { ReactNode } from 'react';
import '../styles/globals.css';
import {
  Inter as createInter,
  Newsreader as createNewsreader,
} from '@next/font/google';
import Providers from '../components/providers';

const inter = createInter({ variable: '--font-inter', subsets: ['latin'] });
const newsreader = createNewsreader({
  variable: '--font-newsreader',
  subsets: ['latin'],
});

const RootLayout = ({ children }: { children: ReactNode }): ReactNode => (
  <html
    lang="en"
    className={`${inter.variable} ${newsreader.variable} scroll-smooth`}
  >
    <body className="font-text overflow-x-hidden bg-zinc-100 font-normal antialiased dark:bg-zinc-900">
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
