import '../styles/globals.css';
import type { AppProps } from 'next/app';
import type { FC } from 'react';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <Component {...pageProps} />
);

export default App;
