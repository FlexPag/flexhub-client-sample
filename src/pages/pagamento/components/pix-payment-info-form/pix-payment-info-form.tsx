import { useCallback } from 'react';
import styled from 'styled-components';

import { Button } from 'app/components';
import { PayerInfoEnteredCart, PendingPayment } from 'app/schemas';
import { MakePixPaymentResponse } from 'app/services';

import { usePixPayment } from './use-pix-payment';

export interface PixPaymentProps {
  cart: PayerInfoEnteredCart;
  onPixPayment: (pendingPayment: PendingPayment) => void;
}

export function PixPayment({ cart, onPixPayment }: PixPaymentProps) {
  const handlePaymentSuccess = useCallback(
    (data: MakePixPaymentResponse) => {
      onPixPayment({
        type: 'pix',
        pixCode: data.QrCodeText,
        pixImageBase64: data.QrCodeImage64,
      });
    },
    [onPixPayment]
  );

  const payment = usePixPayment(handlePaymentSuccess);

  const handleMakePayment = useCallback(() => {
    payment.makePayment(cart);
  }, [cart, payment.makePayment]);

  return (
    <Wrapper>
      <Container>
        <Section>
          <Title>PIX - QR CODE</Title>
          <Instructions>
            <li>
              Clique no botão <b>PAGAR COM PIX</b>.
            </li>
            <li>Acesse seu Internet Banking ou app de pagamentos.</li>
            <li>Escolha pagar via PIX</li>
            <li>Escaneie o código QR Code gerado (Ou copie o código de texto).</li>
            <li>Ao escanear o código, seu pagamento será creditado na hora.</li>
          </Instructions>
        </Section>
        <Section>
          <Title>Dados de Pagamento</Title>
          <Paragraph>Ao pagar sua conta, essas informações aparecerão na fatura do seu banco:</Paragraph>
          <InformationTitle>NOME</InformationTitle>
          <InformationText>FlexPag</InformationText>

          <InformationTitle>INSTITUIÇÃO</InformationTitle>
          <InformationText>BCO VOTORANTIN S.A.</InformationText>
        </Section>
        <Button onClick={handleMakePayment} disabled={payment.status === 'loading'}>
          PAGAR COM PIX
        </Button>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.gray2};

  b {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
`;

const Section = styled.div`
  background: ${({ theme }) => theme.colors.gray5};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 1rem;

  &:first-child {
    margin-top: 1rem;
  }

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

const Instructions = styled.ol`
  list-style: decimal;
  list-style-position: inside;

  & > li:not(:last-child) {
    margin-bottom: 0.85rem;
  }
`;

const Paragraph = styled.p`
  margin-bottom: 1rem;
  font-size: 1.25rem;
`;

const InformationTitle = styled.div`
  color: ${({ theme }) => theme.colors.gray3};
  font-size: 1rem;
  font-weight: 300;
`;
const InformationText = styled.div`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 1.5rem;
  font-weight: bold;
  text-transform: uppercase;
  margin-bottom: 1rem;
`;
