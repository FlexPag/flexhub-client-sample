import Color from 'color';
import styled, { css } from 'styled-components';

import { Button } from 'app/components';
import { useIsStuck } from 'app/hooks';

export interface HeaderProps {
  areAllDebtsSelected: boolean;
  numberOfDebts: number;
  toggleAllDebts: () => void;
}

export function Header({ numberOfDebts, areAllDebtsSelected, toggleAllDebts }: HeaderProps) {
  const [isHeaderStuck, headerRef] = useIsStuck('top');

  return (
    <Container ref={headerRef} stuck={isHeaderStuck}>
      <Title>
        {numberOfDebts > 1
          ? `${numberOfDebts} faturas disponíveis para pagamento`
          : 'Uma fatura disponível para pagamento'}
      </Title>

      <Button onClick={toggleAllDebts} type="button" variant="outlined" color="secondary">
        {areAllDebtsSelected ? 'DESMARCAR TODAS' : 'MARCAR TODAS'}
      </Button>
    </Container>
  );
}

const Container = styled.div<{ stuck: boolean }>`
  position: sticky;
  padding: 1rem;

  // Trick to detect when header is stuck
  top: -1px;
  padding-top: calc(1rem + 1px);

  margin: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  z-index: 999;
  transition: margin 100ms ease-in-out, border-radius 100ms ease-in-out;

  ${({ stuck }) =>
    stuck &&
    css`
      margin-left: 0;
      margin-right: 0;
      border-radius: 0;
      background-color: ${({ theme }) => Color(theme.colors.white).alpha(0.9).hexa()};
      box-shadow: 5px 0px 5px 0 rgba(0, 0, 0, 0.35);
      backdrop-filter: blur(2px);
    `}
`;

const Title = styled.h1`
  font-size: 2rem;
`;
