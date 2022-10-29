import type { EditorState, EditorThemeClasses } from 'lexical';
import { $getRoot, $getSelection } from 'lexical';
import type { ComponentProps, FC } from 'react';
import { useEffect } from 'react';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import toast from 'react-hot-toast';
import { LinkNode } from '@lexical/link';

const theme: EditorThemeClasses = {
  // Theme styling goes here
  root: 'bg-white',
};

/*
 * When the editor changes, you can get notified via the
 * LexicalOnChangePlugin!
 */
const onChange = (editorState: EditorState) => {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot();
    const selection = $getSelection();

    console.log(root, selection);
  });
};

/*
 * Lexical React plugins are React components, which makes them
 * highly composable. Furthermore, you can lazy load plugins if
 * desired, so you don't pay the cost for plugins until you
 * actually use them.
 */
const MyCustomAutoFocusPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);

  return null;
};

/*
 * Catch any errors that occur during Lexical updates and log them
 * or throw them as needed. If you don't throw them, Lexical will
 * try to recover gracefully without losing user data.
 */
const onError = (error: Error) => {
  toast.error(error.message);
};

const Editor: FC = () => {
  const initialConfig: ComponentProps<typeof LexicalComposer>['initialConfig'] =
    {
      namespace: 'Compass',
      theme,
      onError,
      nodes: [LinkNode],
    };

  return (
    <div className="prose relative mx-auto p-4">
      <LexicalComposer initialConfig={initialConfig}>
        <RichTextPlugin
          contentEditable={<ContentEditable className="outline-none" />}
          placeholder={
            <p className="pointer-events-none absolute inset-4 select-none text-base text-gray-500">
              Start typing...
            </p>
          }
        />
        <OnChangePlugin onChange={onChange} />
        <HistoryPlugin />
        <LinkPlugin />
        <MyCustomAutoFocusPlugin />
      </LexicalComposer>
    </div>
  );
};

export default Editor;
