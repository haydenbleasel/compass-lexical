import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

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

// eslint-disable-next-line jest/require-hook
initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

if (process.env.NODE_ENV !== 'production') {
  const auth = getAuth();
  connectAuthEmulator(auth, 'http://localhost:9099');

  const firestore = getFirestore();
  connectFirestoreEmulator(firestore, 'localhost', 8080);

  const storage = getStorage();
  connectStorageEmulator(storage, 'localhost', 9199);
}