import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import type { User } from 'firebase/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { HelpCircle, LogOut, Zap } from 'react-feather';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import toast from 'react-hot-toast';
import type { FirebaseError } from 'firebase/app';
import Link from 'next/link';
import Login from '../components/login';
import Tooltip from '../components/tooltip';

const Home: NextPage = () => {
  const auth = getAuth();
  const firestore = getFirestore();
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [defaultContent, setDefaultContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  onAuthStateChanged(auth, setUser);

  useEffect(() => {
    const getProfile = async (uid: string) => {
      const profileRef = doc(firestore, 'users', uid);
      const profile = await getDoc(profileRef);

      if (profile.exists()) {
        const { content } = profile.data() as { content: string | null };

        setDefaultContent(content);
      }

      setLoading(false);
    };

    if (user && !defaultContent && loading) {
      getProfile(user.uid).catch((error) => {
        toast.error((error as FirebaseError).message);
      });
    }
  }, [defaultContent, firestore, user, loading]);

  const Editor = dynamic(
    async () =>
      import(
        /* webpackChunkName: "Editor" */
        '../components/editor'
      ),
    { ssr: false }
  );

  if (typeof user === 'undefined' || (user && loading)) {
    return null;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div>
      <Editor defaultContent={defaultContent} />
      <div className="fixed bottom-4 right-4 flex flex-col gap-2">
        <Tooltip label="Give feedback" side="left">
          <Link
            href="https://twitter.com/haydenbleasel"
            className="block rounded-full bg-white p-2 shadow-md"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Zap size={16} />
          </Link>
        </Tooltip>
        <Tooltip label="Markdown cheatsheet" side="left">
          <Link
            href="https://www.markdownguide.org/cheat-sheet/"
            className="block rounded-full bg-white p-2 shadow-md"
            target="_blank"
            rel="noopener noreferrer"
          >
            <HelpCircle size={16} />
          </Link>
        </Tooltip>
        <Tooltip label="Log out" side="left">
          <button
            type="button"
            className="rounded-full bg-white p-2 shadow-md"
            onClick={async () => auth.signOut()}
          >
            <LogOut size={16} />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Home;
