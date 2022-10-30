import type { FirebaseApp } from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

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

export const firebase = (): FirebaseApp => {
  // eslint-disable-next-line jest/require-hook
  const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);

  if (process.env.NODE_ENV !== 'production') {
    const auth = getAuth();
    connectAuthEmulator(auth, 'http://localhost:9099');

    const firestore = getFirestore();
    connectFirestoreEmulator(firestore, 'localhost', 8080);

    const storage = getStorage();
    connectStorageEmulator(storage, 'localhost', 9199);
  }

  return app;
};

export const appCheck = (app: FirebaseApp): void => {
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(
      process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY ?? ''
    ),

    isTokenAutoRefreshEnabled: true,
  });
};
