import type { DialogProps } from '@radix-ui/react-dialog';
import {
  Root,
  Trigger,
  Portal,
  Overlay,
  Title,
  Description,
  Close,
  Content,
} from '@radix-ui/react-dialog';
import Image from 'next/image';
import type { FC, ReactNode } from 'react';

type ModalProps = {
  title: string;
  description: string;
  content: ReactNode;
} & DialogProps;

const Modal: FC<ModalProps> = ({
  title,
  description,
  content,
  children,
  ...props
}) => (
  <Root {...props}>
    <Trigger>{children}</Trigger>
    <Portal className={props.open ? 'opacity-100' : 'opacity-0'}>
      <Overlay className="fixed inset-0 bg-zinc-900/90 backdrop-blur-sm" />
      <Content className="fixed top-1/2 left-1/2 w-full max-w-xs -translate-x-1/2 -translate-y-1/2 transform rounded-md bg-white p-4 shadow-lg">
        <Image src="/logo.svg" width={32} height={32} alt="" className="mb-4" />
        <Title className="mb-2 text-base font-semibold text-zinc-900">
          {title}
        </Title>
        <Description className="text-base text-zinc-500">
          {description}
        </Description>
        <Close />
        {content}
      </Content>
    </Portal>
  </Root>
);

export default Modal;
