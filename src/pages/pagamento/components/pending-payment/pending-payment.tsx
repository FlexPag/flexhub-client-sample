import { Fragment } from 'react';
import styled from 'styled-components';

import { useTransactionStatus } from './use-transaction-status';

export interface PendingPaymentProps {
  orderId: string;
}

export function PendingPayment({ orderId }: PendingPaymentProps) {
  const transactionStatus = useTransactionStatus(orderId);

  if (transactionStatus.isLoading) {
    // eslint-disable-next-line unicorn/no-null
    return null;
  }

  const status = transactionStatus.data?.transaction?.status || '17';

  // PENDENTE
  if (status === '17') {
    return (
      <Container>
        <Title>Estamos processando seu pagamento</Title>
        <Message>Por favor, aguarde enquanto processamos seu pagamento</Message>
      </Container>
    );
  }

  // APROVADO
  if (status === '2') {
    return (
      <Container>
        <Title>Sucesso</Title>
        <Message>Seu pagamento foi processado com sucesso</Message>
      </Container>
    );
  }

  // NAO APROVADO
  if (status === '3') {
    return (
      <Container>
        <Title error>Não aprovado</Title>
        <Message>Seu pagamento não foi aprovado, verifique os dados de pagamento informados e tente novamente.</Message>
      </Container>
    );
  }

  // ERRO INESPERADO
  return (
    <Container>
      <Title error>Um erro ocorreu com seu pagamento</Title>
      <Message>Um erro inesperado ocorreu com seu pagamento, por favor, tente novamente mais tarde</Message>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
`;

const Title = styled.h1<{ error?: boolean }>`
  color: ${({ theme, error }) => (error ? theme.colors.error : theme.colors.gray1)};
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 4rem;
  text-align: center;
`;

const Message = styled.h2`
  font-size: 1.5rem;
`;
