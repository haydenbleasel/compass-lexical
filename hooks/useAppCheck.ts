'use client';
import type { FirebaseApp } from 'firebase/app';
import { useEffect } from 'react';
import { appCheck } from '../lib/firebase';

const useAppCheck = (app: FirebaseApp): void => {
  useEffect(() => {
    if (
      process.env.NODE_ENV === 'production' &&
      typeof window !== 'undefined'
    ) {
      appCheck(app);
    }
  }, [app]);
};

export default useAppCheck;
