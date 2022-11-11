import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { createCart, useParsedSearchParams } from 'app/hooks';
import { GetDebtsRequestSchema } from 'app/services';

import { Fatura, Footer, Header, NoDebtsFound } from './components';
import { useDebts } from './use-debts';

export function SelecionarFaturasPage() {
  const navigate = useNavigate();

  const request = useParsedSearchParams(GetDebtsRequestSchema);
  const debts = useDebts(request);

  const handleFinishSelectingFaturas = useCallback(() => {
    if (!debts.query.data) {
      return;
    }

    const selectedDebts = debts.query.data.filter((debt) => debts.selectedIds.includes(debt.id));
    createCart(selectedDebts);
    navigate(`/dados-pagador`);
  }, [navigate, debts.query]);

  if (debts.query.isLoading) {
    return <LoadingContainer>Buscando faturas...</LoadingContainer>;
  }

  if (debts.query.isError) {
    return <LoadingContainer>Erro ao buscar faturas</LoadingContainer>;
  }

  const numberOfDebts = debts.query.data.length;

  if (numberOfDebts === 0) {
    return <NoDebtsFound />;
  }

  return (
    <Container>
      <Header
        areAllDebtsSelected={debts.areAllSelected}
        numberOfDebts={numberOfDebts}
        toggleAllDebts={debts.toggleAll}
      />
      <Faturas>
        {debts.query.data.map((debt) => (
          <Fatura key={debt.id} debt={debt} selected={debts.selectedIds.includes(debt.id)} onClick={debts.toggle} />
        ))}
      </Faturas>
      <Footer
        selectedDebtsTotal={debts.totalSelectedValue}
        totalNumberOfDebts={numberOfDebts}
        numberOfSelectedDebts={debts.selectedIds.length}
        onFinishSelectingFaturas={handleFinishSelectingFaturas}
      />
    </Container>
  );
}

const LoadingContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Faturas = styled.div`
  margin: 0 1rem;

  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;
