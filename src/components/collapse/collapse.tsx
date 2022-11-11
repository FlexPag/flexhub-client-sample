import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';

import { useHeight } from 'app/hooks';

export interface CollapseProps {
  children: React.ReactNode;
  isOpen: boolean;
}

export function Collapse({ children, isOpen }: CollapseProps) {
  const [containerRef, containerHeight] = useHeight<HTMLDivElement>();
  const animation = useSpring({ height: isOpen ? containerHeight : 0 });

  return (
    <Wrapper style={{ height: animation.height }}>
      <div ref={containerRef}>{children}</div>
    </Wrapper>
  );
}

const Wrapper = styled(animated.div)`
  overflow: hidden;
`;
