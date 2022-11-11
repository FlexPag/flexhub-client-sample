import { useIsFetching } from '@tanstack/react-query';
import { BarLoader } from 'react-spinners';
import styled, { useTheme } from 'styled-components';

export function QueryLoadingIndicator() {
  const theme = useTheme();
  const isFetching = useIsFetching();

  return (
    <Container>
      <BarLoader loading={Boolean(isFetching)} width="100%" color={theme.colors.secondary} />
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  width: 100%;
`;
