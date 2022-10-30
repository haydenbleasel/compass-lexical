import { $createParagraphNode, $createTextNode, $getRoot } from 'lexical';
import { $createHeadingNode } from '@lexical/rich-text';
import { $createListItemNode, $createListNode } from '@lexical/list';

const sample = (): void => {
  const root = $getRoot();
  if (root.getFirstChild() === null) {
    const heading = $createHeadingNode('h1');
    heading.append($createTextNode('Welcome to Compass'));
    root.append(heading);

    const paragraph = $createParagraphNode();
    paragraph.append(
      $createTextNode('Compass is a super simple '),
      $createTextNode('notes').toggleFormat('bold'),
      $createTextNode(' editor with '),
      $createTextNode('Markdown').toggleFormat('italic'),
      $createTextNode(' support.')
    );
    root.append(paragraph);

    const paragraph2 = $createParagraphNode();
    paragraph2.append($createTextNode('That means it supports:'));
    root.append(paragraph2);

    const list = $createListNode('bullet');
    list.append(
      $createTextNode('Lists'),
      $createTextNode('Links'),
      $createTextNode('Code'),
      $createTextNode('and more to come soon.')
    );
    root.append(list);

    const paragraph3 = $createParagraphNode();
    paragraph3.append(
      $createTextNode('It even supports '),
      $createTextNode('checklists!').toggleFormat('bold')
    );
    root.append(paragraph3);

    const checklist = $createListNode('check');
    checklist.append(
      $createListItemNode().append($createTextNode('Make some lists')),
      $createListItemNode().append($createTextNode('Add some things')),
      $createListItemNode(true).append($createTextNode('Get s**t done'))
    );
    root.append(checklist);

    const paragraph4 = $createParagraphNode();
    paragraph4.append($createTextNode('Give it a try!'));
    root.append(paragraph4);

    const paragraph5 = $createParagraphNode();
    paragraph5.append(
      $createTextNode('If you have feedback, send it my way: ')
    );
    root.append(paragraph5);

    const paragraph6 = $createParagraphNode();
    paragraph6.append($createTextNode('https://twitter.com/haydenbleasel'));
    root.append(paragraph6);
  }
};

export default sample;
