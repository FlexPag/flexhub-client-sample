import { useCallback } from 'react';
import styled from 'styled-components';

import { Checkbox } from 'app/components';
import { Debt } from 'app/services';
import { formatDate } from 'app/utils';

export type FaturaProps = {
  debt: Debt;
  selected: boolean;
  onClick: (debt: Debt) => void;
};

export function Fatura({ debt, selected, onClick }: FaturaProps) {
  const handleClick = useCallback(() => {
    if (!debt) {
      return;
    }

    if (onClick) {
      onClick(debt);
    }
  }, [debt, onClick]);

  const isPastDueDate = debt.due_date < new Date();

  return (
    <Container onClick={handleClick} selected={selected}>
      <StyledCheckbox checked={selected} />
      <Valor>
        <ValorTitle>Valor</ValorTitle>
        <ValorValue>R$ {debt.value}</ValorValue>
      </Valor>
      <DescricaoAndVencimento>
        {debt.description && <Descricao>{debt.description}</Descricao>}
        <Vencimento pastDueDate={isPastDueDate}>Vencimento: {formatDate(debt.due_date, 'dd/mm/yyyy')}</Vencimento>
      </DescricaoAndVencimento>
    </Container>
  );
}

const Container = styled.div<{ loading?: boolean; selected?: boolean }>`
  display: ${({ loading }) => (loading ? 'block' : 'flex')};
  align-items: center;
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  height: 75px;
  color: ${({ theme }) => theme.colors.gray2};
  background: white;
  user-select: none;

  &:hover {
    cursor: pointer;
  }
`;

const StyledCheckbox = styled(Checkbox)`
  height: calc(100% - 1rem);
  margin: 0.5rem;
  width: auto;
`;

const Valor = styled.div`
  display: flex;
  flex-direction: column;
`;

const ValorTitle = styled.div`
  font-size: 0.75rem;
  text-transform: uppercase;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.gray4};
`;

const ValorValue = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

const DescricaoAndVencimento = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: flex-end;
  justify-content: space-between;
  padding-right: 1rem;
`;

const Descricao = styled.div``;

const Vencimento = styled.div<{ pastDueDate?: boolean }>`
  font-size: 0.8rem;
  color: ${({ theme, pastDueDate }) => theme.colors[pastDueDate ? 'error' : 'gray2']};
  font-weight: bold;
`;
