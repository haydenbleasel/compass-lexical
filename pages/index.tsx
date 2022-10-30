import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import type { User } from 'firebase/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState } from 'react';
import { LogOut } from 'react-feather';
import Login from '../components/login';
import Tooltip from '../components/tooltip';

const Home: NextPage = () => {
  const auth = getAuth();
  const [user, setUser] = useState<User | null | undefined>(undefined);

  onAuthStateChanged(auth, setUser);

  const Editor = dynamic(
    async () =>
      import(
        /* webpackChunkName: "Editor" */
        '../components/editor'
      ),
    { ssr: false }
  );

  if (typeof user === 'undefined') {
    return null;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div>
      <Editor />
      <div className="absolute bottom-4 right-4">
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
