/* eslint-disable unicorn/no-useless-undefined */
import { useMemo, useState } from 'react';
import styled from 'styled-components';

import { PaymentOption, paymentOptions, PaymentOptionType } from 'app/configuration';
import { PayerInfoEnteredCart, PendingPayment } from 'app/schemas';

import { CreditCardPayment } from '../credit-card-payment';
import { FormaPagamento } from '../forma-pagamento/forma-pagamento';
import { PixPayment } from '../pix-payment-info-form';

export interface FormaPagamentoSelectorProps {
  cart: PayerInfoEnteredCart;
  onPendingPayment: (payment: PendingPayment) => void;
}

export function FormaPagamentoSelector({ cart, onPendingPayment }: FormaPagamentoSelectorProps) {
  const [selectedPaymentOption, setSelectedPayementOption] = useState<PaymentOption>();

  const visiblePaymentOptions = useMemo(() => {
    if (selectedPaymentOption) {
      return [selectedPaymentOption];
    }

    return paymentOptions;
  }, [selectedPaymentOption]);

  return (
    <Container>
      {!selectedPaymentOption && <Title>Escolha uma forma de pagamento</Title>}
      {visiblePaymentOptions.map((paymentOption) => (
        <FormaPagamento
          key={paymentOption.key}
          selected={paymentOption.key === selectedPaymentOption?.key}
          paymentOption={paymentOption}
          onClick={setSelectedPayementOption}
        />
      ))}

      {selectedPaymentOption?.key === 'credit-card' && (
        <CreditCardPayment cart={cart} onPaymentSuccess={onPendingPayment} />
      )}

      {selectedPaymentOption?.key === 'pix' && <PixPayment cart={cart} onPixPayment={onPendingPayment} />}
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
`;

const Title = styled.h1`
  margin-bottom: 1rem;

  text-align: center;
  padding-left: ${({ theme }) => theme.borderRadius};
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.gray1};
`;
