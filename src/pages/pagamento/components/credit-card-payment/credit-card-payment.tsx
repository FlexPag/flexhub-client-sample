import { useCallback } from 'react';
import { Col, Row } from 'react-grid-system';
import styled from 'styled-components';

import { Button, Collapse, Select, TextField } from 'app/components';
import { PCI_ENABLED } from 'app/environment';
import { PayerInfoEnteredCart, PendingPayment } from 'app/schemas';

import { CreditCardInfo, useCreditCardForm } from './use-credit-card-form';
import { useInstallmentOptions } from './use-installment-options';
import { useMakePayment } from './use-make-payment';

export interface CreditCardPaymentProps {
  cart: PayerInfoEnteredCart;
  onPaymentSuccess: (payment: PendingPayment) => void;
}

export function CreditCardPayment({ cart, onPaymentSuccess }: CreditCardPaymentProps) {
  const installmentOptions = useInstallmentOptions(cart.orderInfo.installments);

  const handlePaymentSuccess = useCallback(() => {
    onPaymentSuccess({ type: 'credit-card' });
  }, [onPaymentSuccess]);

  const payment = useMakePayment({ onPaymentSuccess: handlePaymentSuccess });
  const form = useCreditCardForm(payment.status === 'loading');

  const handleMakePayemnt = useCallback(
    (cardInfo: CreditCardInfo) => {
      if (payment.status === 'loading') {
        return;
      }

      payment.pay({ cardInfo, cart, usePci: PCI_ENABLED });
    },
    [payment, cart.orderInfo]
  );

  return (
    <Container>
      <form onSubmit={form.handleSubmit(handleMakePayemnt)}>
        <Row>
          <Col xs={12}>
            <TextField form={form} fieldName="cardNumber" label="Número do cartão" mask="credit-card-number" />
          </Col>
          <Col xs={12}>
            <TextField form={form} fieldName="cardHolderName" label="Nome impresso no cartão" />
          </Col>
          <Col xs={6}>
            <TextField
              form={form}
              fieldName="expirationDate"
              label="Validade"
              mask={{ type: 'credit-card-expiration-date', autoUnmask: false }}
            />
          </Col>
          <Col xs={6}>
            <TextField form={form} fieldName="cvv" label="CVV" mask="credit-card-cvv" />
          </Col>
          <Col xs={12}>
            <Select
              form={form}
              fieldName="numberOfInstallments"
              options={installmentOptions}
              label="Escolha um número de parcelas"
              style={{ marginBottom: '1rem', width: '100%' }}
            />
          </Col>
          <Collapse isOpen={payment.status === 'error'}>
            <ErrorMessage>
              Não foi possível realizar o pagamento. <br />
              Por favor, verifique os dados do cartão e tente novamente.
            </ErrorMessage>
          </Collapse>
          <Col xs={12}>
            <Button type="submit" disabled={payment.status === 'loading'}>
              Pagar com cartão de crédito
            </Button>
          </Col>
        </Row>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.error};
  padding: 1rem;
  padding-top: 0;
`;
