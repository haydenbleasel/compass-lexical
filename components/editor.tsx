import type { EditorState, EditorThemeClasses } from 'lexical';
import { $createParagraphNode, $createTextNode, $getRoot } from 'lexical';
import type { ComponentProps, FC } from 'react';
import { useRef, useEffect } from 'react';

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
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import toast from 'react-hot-toast';
import { LinkNode, AutoLinkNode } from '@lexical/link';
import { ListNode, ListItemNode } from '@lexical/list';
import { TableNode, TableCellNode, TableRowNode } from '@lexical/table';
import { $createHeadingNode, HeadingNode, QuoteNode } from '@lexical/rich-text';
import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { HashtagNode } from '@lexical/hashtag';
import {
  CHECK_LIST,
  ELEMENT_TRANSFORMERS,
  TEXT_FORMAT_TRANSFORMERS,
  TEXT_MATCH_TRANSFORMERS,
} from '@lexical/markdown';
import { getAuth } from 'firebase/auth';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import type { FirebaseError } from 'firebase/app';

const urlMatcher =
  // eslint-disable-next-line prefer-named-capture-group
  /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/u;

const MATCHERS = [
  (text: string) => {
    const match = urlMatcher.exec(text);
    return (
      match && {
        index: match.index,
        length: match[0].length,
        text: match[0],
        url: match[0],
      }
    );
  },
];

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

type EditorProps = {
  defaultContent: string | null;
};

const placeholderText = () => {
  const root = $getRoot();
  if (root.getFirstChild() === null) {
    const heading = $createHeadingNode('h1');
    heading.append($createTextNode('Welcome to Compass'));
    root.append(heading);
    const paragraph = $createParagraphNode();
    paragraph.append(
      $createTextNode('Compass is a super simple '),
      $createTextNode('notes').toggleFormat('bold'),
      $createTextNode(' editor with Markdown support.')
    );
    root.append(paragraph);
    const paragraph2 = $createParagraphNode();
    paragraph2.append($createTextNode('Give it a try!'));
    root.append(paragraph2);
  }
};

const Placeholder = (
  <p className="pointer-events-none absolute inset-y-16 inset-x-4 m-0 select-none text-base text-zinc-500">
    Start typing...
  </p>
);

const Editor: FC<EditorProps> = ({ defaultContent }) => {
  const containerWithScrollRef = useRef<HTMLDivElement>(null);
  const editorState = defaultContent?.trim() ? defaultContent : placeholderText;
  const initialConfig: ComponentProps<typeof LexicalComposer>['initialConfig'] =
    {
      namespace: 'Compass',
      editorState,
      onError,
      nodes: [
        HeadingNode,
        QuoteNode,
        LinkNode,
        ListNode,
        ListItemNode,
        TableNode,
        TableCellNode,
        TableRowNode,
        AutoLinkNode,
        HorizontalRuleNode,
        CodeHighlightNode,
        CodeNode,
        HashtagNode,
      ],
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
        <AutoLinkPlugin matchers={MATCHERS} />
        <AutoScrollPlugin scrollRef={containerWithScrollRef} />
        <MarkdownShortcutPlugin
          transformers={[
            CHECK_LIST,
            ...ELEMENT_TRANSFORMERS,
            ...TEXT_FORMAT_TRANSFORMERS,
            ...TEXT_MATCH_TRANSFORMERS,
          ]}
        />
        <HashtagPlugin />
        <MyCustomAutoFocusPlugin />
      </LexicalComposer>
    </div>
  );
};

export default Editor;
