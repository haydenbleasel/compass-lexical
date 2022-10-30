import type { FirebaseError } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import type { FC, FormEventHandler } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();
  const firestore = getFirestore();

  const createAccount = async () => {
    const newUser = await createUserWithEmailAndPassword(auth, email, password);
    const newDoc = doc(firestore, 'users', newUser.user.uid);

    await setDoc(
      newDoc,
      {
        content: '',
        lastUpdated: new Date(),
      },
      { merge: true }
    );
  };

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const castedError = error as FirebaseError;

      if (castedError.message.includes('auth/user-not-found')) {
        toast(
          (customToast) => (
            <span>
              No account found. Would you like to create an account instead?
              <span className="mt-2 inline-block">
                <button
                  type="button"
                  className="block w-full rounded-md bg-gray-900 p-3 text-white"
                  onClick={async () => {
                    await createAccount();
                    toast.dismiss(customToast.id);
                  }}
                >
                  Create an account
                </button>
              </span>
            </span>
          ),
          {
            duration: 10000,
          }
        );
        return;
      }

      toast.error(castedError.message);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="mx-auto flex w-full max-w-xs flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-base font-semibold text-gray-900">Login</h1>
          <p className="text-base text-gray-500">
            Enter your email and password to login.
          </p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <fieldset className="flex flex-col gap-2">
            <input
              className="block w-full rounded-md bg-gray-50 p-3 placeholder:text-gray-500"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              className="block w-full rounded-md bg-gray-50 p-3 placeholder:text-gray-500"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </fieldset>
          <button
            className="block w-full rounded-md bg-gray-900 p-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
            type="submit"
            disabled={!email || !password}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
