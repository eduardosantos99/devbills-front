import { ReactNode } from 'react';

import {
  Overlay,
  Root,
  Portal,
  Content,
  Trigger,
  Title,
  Description,
} from './styles';

type DialogProps = {
  children: ReactNode;
  trigger: JSX.Element;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function Dialog({ children, trigger, open, onOpenChange }: DialogProps) {
  return (
    <Root open={open} onOpenChange={onOpenChange}>
      <Trigger>{trigger}</Trigger>
      <Portal>
        <Overlay />
        <Content>
          <Title />
          <Description />
          {children}
        </Content>
      </Portal>
    </Root>
  );
}
