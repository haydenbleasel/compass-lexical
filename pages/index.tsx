import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import type { User } from 'firebase/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import Login from '../components/login';

const Home: NextPage = () => {
  const auth = getAuth();
  const [user, setUser] = useState<User | null>(auth.currentUser);

  onAuthStateChanged(auth, setUser);

  const Editor = dynamic(
    async () =>
      import(
        /* webpackChunkName: "Editor" */
        '../components/editor'
      ),
    { ssr: false }
  );

  if (!user) {
    return <Login />;
  }

  return (
    <div>
      <Editor />
    </div>
  );
};

export default Home;
