import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

const Home: NextPage = () => {
  const Editor = dynamic(
    async () =>
      import(
        /* webpackChunkName: "Editor" */
        '../components/editor'
      ),
    { ssr: false }
  );

  return (
    <div>
      <Editor />
    </div>
  );
};

export default Home;
