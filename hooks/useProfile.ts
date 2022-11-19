'use client';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import useUser from './useUser';

type ProfileProps = {
  content: string | null;
};

const getProfile = async (uid: string) => {
  const firestore = getFirestore();
  const profileRef = doc(firestore, 'users', uid);
  const profile = await getDoc(profileRef);

  if (!profile.exists()) {
    return null;
  }

  return profile.data() as ProfileProps;
};

const useProfile = (): {
  data: ProfileProps | null;
  loading: boolean;
} => {
  const user = useUser();
  const [data, setData] = useState<ProfileProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data ?? !user?.uid) {
      return;
    }

    getProfile(user.uid)
      .then(setData)
      .catch((error) => {
        const message = (error as Error).toString();
        toast.error(message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [data, user?.uid]);

  return { data, loading };
};

export default useProfile;
