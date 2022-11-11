import { useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { useCart } from 'app/hooks';
import { OrderInfo, PayerInfo } from 'app/schemas';

import { DadosPagadorForm } from './components';
import { useGetInstallments } from './use-get-installments';

export function DadosPagadorPage() {
  const navigate = useNavigate();
  const cart = useCart();

  if (cart.stage !== 'debts-selected') {
    return <Navigate to="buscar-faturas" replace />;
  }

  const handleUpdateCart = useCallback((payerInfo: PayerInfo, orderInfo: OrderInfo) => {
    cart.setPayerInfo(payerInfo, orderInfo);
    navigate(`/pagamento`);
  }, []);

  const installmentsRequest = useGetInstallments(handleUpdateCart);

  const handleSubmit = useCallback((data: PayerInfo) => {
    installmentsRequest.fetch({
      payerInfo: data,
      cart,
    });
  }, []);

  return (
    <Wrapper>
      <Container>
        <Header>
          <Title>Dados do pagador</Title>
          <DadosPagadorForm onSubmit={handleSubmit} isLoading={installmentsRequest.status === 'loading'} />
        </Header>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Container = styled.div`
  background: white;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  min-width: 500px;
  max-width: 100%;
`;

const Header = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: 1rem 0;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-left: ${({ theme }) => theme.borderRadius};
`;
