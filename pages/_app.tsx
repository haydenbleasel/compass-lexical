import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import type { FC } from 'react';
import { Toaster } from 'react-hot-toast';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
    authDomain: `${
      process.env.NEXT_PUBLIC_FIREBASE_PROJECTID ?? ''
    }.firebaseapp.com`,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
    storageBucket: `${
      process.env.NEXT_PUBLIC_FIREBASE_PROJECTID ?? ''
    }.appspot.com`,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENTID,
  };

  // Initialize Firebase
  initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);

  return (
    <>
      <Component {...pageProps} />
      <Toaster position="bottom-right" />
    </>
  );
};

export default App;
