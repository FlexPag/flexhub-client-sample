import { Navigate } from 'react-router-dom';
import styled from 'styled-components';

import { useCart } from 'app/hooks';

import { FormaPagamentoSelector, PendingPayment } from './components';

export function PagamentoPage() {
  const cart = useCart();

  if (cart?.stage !== 'payer-info-entered' && cart?.stage !== 'payment-pending') {
    return <Navigate to="/buscar-faturas" replace />;
  }

  return (
    <Wrapper>
      <Container>
        {cart.stage === 'payer-info-entered' && (
          <FormaPagamentoSelector cart={cart} onPendingPayment={cart.setPendingPayment} />
        )}

        {cart.stage === 'payment-pending' && <PendingPayment orderId={cart.orderInfo.orderId} />}
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
  padding-top: 0;
  border-radius: ${({ theme }) => theme.borderRadius};
  max-width: 100%;
  width: 600px;
`;
