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
import Input from './input';

const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const firestore = getFirestore();

  const createAccount = async () => {
    const newUser = await createUserWithEmailAndPassword(auth, email, password);
    const newDoc = doc(firestore, 'users', newUser.user.uid);

    await setDoc(
      newDoc,
      {
        content: null,
      },
      { merge: true }
    );

    setLoading(false);
  };

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
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
                  className="block w-full rounded-md bg-zinc-900 p-3 text-white"
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
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <fieldset className="flex flex-col gap-2">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="janesmith@example.com"
          required
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="••••••••"
          required
          data-passwordrules="minlength: 6;"
          minLength={6}
        />
      </fieldset>
      <button
        className="block w-full rounded-md bg-zinc-900 p-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
        type="submit"
        disabled={!email || !password || loading}
      >
        Login
      </button>
    </form>
  );
};

export default Login;
