'use client';

import type { User } from 'firebase/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

const useUser = (): User | null | undefined => {
  const auth = getAuth();
  const [data, setData] = useState<User | null | undefined>(
    auth.currentUser ?? undefined
  );

  useEffect(() => {
    onAuthStateChanged(auth, setData);
  }, [auth]);

  return data;
};

export default useUser;
