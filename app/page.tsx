'use client';
import dynamic from 'next/dynamic';
import { getAuth } from 'firebase/auth';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { Code, HelpCircle, LogOut, UserPlus, Zap } from 'react-feather';
import Link from 'next/link';
import Tooltip from '../components/tooltip';
import Modal from '../components/modal';
import Login from '../components/login';
import { firebase } from '../lib/firebase';
import useAppCheck from '../hooks/useAppCheck';
import useTheme from '../hooks/useTheme';
import useUser from '../hooks/useUser';
import useProfile from '../hooks/useProfile';
import Skeleton from '../components/skeleton';

const app = firebase();

const Home: FC = () => {
  const auth = getAuth();
  const user = useUser();
  const [defaultContent, setDefaultContent] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);
  const profile = useProfile();

  useTheme();
  useAppCheck(app);

  useEffect(() => {
    if (user && showLogin) {
      setShowLogin(false);
    }
  }, [user, showLogin]);

  useEffect(() => {
    if (profile.data?.content && !defaultContent) {
      setDefaultContent(profile.data.content);
    }
  }, [defaultContent, profile.data?.content]);

  const Editor = dynamic(
    async () =>
      import(
        /* webpackChunkName: "Editor" */
        '../components/editor'
      ),
    { ssr: false }
  );

  if (typeof user === 'undefined' || (user && profile.loading)) {
    return <Skeleton />;
  }

  return (
    <div>
      <Editor defaultContent={defaultContent} />
      <div className="fixed bottom-4 right-4 flex flex-col gap-2">
        <Tooltip label="Source code" side="left">
          <Link
            href="https://github.com/haydenbleasel/compass"
            className="block rounded-full border border-zinc-200 bg-white p-2 dark:border-zinc-700 dark:bg-zinc-800"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Source code"
          >
            <Code size={16} className="text-zinc-900 dark:text-white" />
          </Link>
        </Tooltip>
        <Tooltip label="Give feedback" side="left">
          <Link
            href="https://twitter.com/haydenbleasel"
            className="block rounded-full border border-zinc-200 bg-white p-2 dark:border-zinc-700 dark:bg-zinc-800"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Give feedback"
          >
            <Zap size={16} className="text-zinc-900 dark:text-white" />
          </Link>
        </Tooltip>
        <Tooltip label="Markdown cheatsheet" side="left">
          <Link
            href="https://www.markdownguide.org/cheat-sheet/"
            className="block rounded-full border border-zinc-200 bg-white p-2 dark:border-zinc-700 dark:bg-zinc-800"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Markdown cheatsheet"
          >
            <HelpCircle size={16} className="text-zinc-900 dark:text-white" />
          </Link>
        </Tooltip>
        {user ? (
          <Tooltip label="Log out" side="left">
            <button
              type="button"
              aria-label="Log out"
              className="rounded-full border border-zinc-200 bg-white p-2 dark:border-zinc-700 dark:bg-zinc-800"
              onClick={async () => auth.signOut()}
            >
              <LogOut size={16} className="text-zinc-900 dark:text-white" />
            </button>
          </Tooltip>
        ) : (
          <Modal
            show={showLogin}
            title="Login"
            description="Enter an email and password to login or create a new account."
            content={<Login />}
          >
            <Tooltip label="Login or signup" side="left">
              <button
                type="button"
                aria-label="Login or signup"
                className="block rounded-full border border-zinc-200 bg-white p-2 dark:border-zinc-700 dark:bg-zinc-800"
                onClick={() => setShowLogin(true)}
              >
                <UserPlus size={16} className="text-zinc-900 dark:text-white" />
              </button>
            </Tooltip>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Home;
