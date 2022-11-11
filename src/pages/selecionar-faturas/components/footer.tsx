import Color from 'color';
import styled, { css } from 'styled-components';

import { Button } from 'app/components';
import { useIsStuck } from 'app/hooks';
import { formatToBrl } from 'app/utils';

export interface FooterProps {
  selectedDebtsTotal: number;
  numberOfSelectedDebts: number;
  totalNumberOfDebts: number;
  onFinishSelectingFaturas: () => void;
}

export function Footer({
  selectedDebtsTotal,
  numberOfSelectedDebts,
  totalNumberOfDebts,
  onFinishSelectingFaturas,
}: FooterProps) {
  const [isStuck, ref] = useIsStuck('bottom');

  return (
    <Container ref={ref} stuck={isStuck}>
      <ItemContainer>
        <ItemTitle>Faturas selecionadas</ItemTitle>
        <ItemValue>
          {numberOfSelectedDebts} de {totalNumberOfDebts}
        </ItemValue>
      </ItemContainer>
      <ItemContainer>
        <ItemTitle>Total das faturas selecionadas</ItemTitle>
        <ItemValue>{formatToBrl(selectedDebtsTotal)}</ItemValue>
      </ItemContainer>
      <PayButtonContainer>
        <Button onClick={onFinishSelectingFaturas} disabled={numberOfSelectedDebts === 0}>
          PAGAR FATURAS SELECIONADAS
        </Button>
      </PayButtonContainer>
    </Container>
  );
}

const Container = styled.div<{ stuck: boolean }>`
  position: sticky;
  padding: 1rem;

  // Trick to detect when header is stuck
  bottom: -1px;
  padding-bottom: calc(1rem + 1px);

  margin: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.white};
  display: flex;
  align-items: center;
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

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  &:not(:last-child) {
    margin-right: 2rem;
  }
`;

const ItemTitle = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.gray4};
`;

const ItemValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray3};
`;

const PayButtonContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;
