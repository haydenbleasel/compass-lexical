import { Root, Trigger, Portal, Content, Arrow } from '@radix-ui/react-tooltip';
import type { FC, ReactNode } from 'react';
import type { TooltipContentProps } from '@radix-ui/react-tooltip';

type TooltipProps = {
  label: string;
  children: ReactNode;
  side?: TooltipContentProps['side'];
};

const Tooltip: FC<TooltipProps> = ({ label, side, children }) => (
  <Root>
    <Trigger>{children}</Trigger>
    <Portal>
      <Content
        side={side}
        className="rounded-md bg-zinc-900 py-1 px-2 text-sm text-white"
      >
        <Arrow />
        {label}
      </Content>
    </Portal>
  </Root>
);

export default Tooltip;
