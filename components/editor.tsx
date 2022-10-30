import type { EditorState } from 'lexical';

import type { ComponentProps, FC } from 'react';
import { useRef } from 'react';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { AutoLinkPlugin } from '@lexical/react/LexicalAutoLinkPlugin';
import { AutoScrollPlugin } from '@lexical/react/LexicalAutoScrollPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { HashtagPlugin } from '@lexical/react/LexicalHashtagPlugin';
import toast from 'react-hot-toast';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import type { FirebaseError } from 'firebase/app';
import { FocusPlugin } from '../plugins/focus';
import nodes from '../lib/nodes';
import transformers from '../lib/transformers';
import sample from '../lib/sample';
import matchers from '../lib/autolink';

/*
 * When the editor changes, you can get notified via the
 * LexicalOnChangePlugin!
 */
const onChange = (editorState: EditorState) => {
  editorState.read(() => {
    const content = JSON.stringify(editorState);
    const { currentUser } = getAuth();
    const firestore = getFirestore();

    if (!currentUser) {
      return;
    }

    const profile = doc(firestore, 'users', currentUser.uid);

    updateDoc(profile, {
      content,
      lastUpdated: new Date(),
    }).catch((error) => {
      toast.error((error as FirebaseError).message);
    });
  });
};

const onError = (error: Error) => {
  toast.error(error.message);
};

type EditorProps = {
  defaultContent: string | null;
};

const Placeholder = (
  <p className="pointer-events-none absolute inset-y-16 inset-x-4 m-0 select-none text-base text-zinc-500">
    Start typing...
  </p>
);

const Editor: FC<EditorProps> = ({ defaultContent }) => {
  const containerWithScrollRef = useRef<HTMLDivElement>(null);
  const editorState = defaultContent?.trim() ? defaultContent : sample;
  const initialConfig: ComponentProps<typeof LexicalComposer>['initialConfig'] =
    {
      namespace: 'Compass',
      editorState,
      onError,
      nodes,
    };

  return (
    <div
      ref={containerWithScrollRef}
      className="prose prose-zinc relative mx-auto px-4 py-16"
    >
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          contentEditable={<ContentEditable className="outline-none" />}
          placeholder={Placeholder}
        />
        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
        <LinkPlugin />
        <ListPlugin />
        <CheckListPlugin />
        <TablePlugin />
        <AutoLinkPlugin matchers={matchers} />
        <AutoScrollPlugin scrollRef={containerWithScrollRef} />
        <MarkdownShortcutPlugin transformers={transformers} />
        <HashtagPlugin />
        <FocusPlugin />
      </LexicalComposer>
    </div>
  );
};

export default Editor;
