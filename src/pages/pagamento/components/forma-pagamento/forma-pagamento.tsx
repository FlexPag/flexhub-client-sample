import { FC, useCallback } from 'react';
import styled, { css } from 'styled-components';

import { ReactComponent as CreditCardIcon } from 'app/assets/icons/credit-card.svg';
import { ReactComponent as PixIcon } from 'app/assets/icons/pix.svg';
import { Button } from 'app/components';
import { PaymentOption, PaymentOptionType } from 'app/configuration';

export interface FormaPagamentoProps {
  selected: boolean;
  paymentOption: PaymentOption;
  onClick: (paymentOption?: PaymentOption) => void;
}

export function FormaPagamento({ selected, paymentOption, onClick }: FormaPagamentoProps) {
  const handleSelectPaymentOption = useCallback(() => {
    onClick(paymentOption);
  }, []);

  const handleDeselectPaymentOption = useCallback(() => {
    // eslint-disable-next-line unicorn/no-useless-undefined
    onClick(undefined);
  }, []);

  const Icon = paymentOptionIconMap[paymentOption.type];

  return (
    <Container selected={selected} onClick={!selected ? handleSelectPaymentOption : undefined}>
      <IconContainer>
        <Icon />
      </IconContainer>
      <Content>
        <Title>{paymentOption.title}</Title>
        <Description>{paymentOption.description}</Description>
      </Content>
      {selected && (
        <Actions>
          <Button variant="outlined" color="secondary" onClick={handleDeselectPaymentOption}>
            TROCAR
          </Button>
        </Actions>
      )}
    </Container>
  );
}

const paymentOptionIconMap = {
  'credit-card': CreditCardIcon,
  'pix': PixIcon,
} as Record<PaymentOptionType, FC>;

const Container = styled.div<{ selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 1rem;
  height: 85px;
  box-sizing: border-box;
  background-color: ${({ theme, selected }) => (selected ? 'transparent' : theme.colors.secondary)};
  color: ${({ theme, selected }) => (selected ? theme.colors.secondary : 'white')};
  fill: ${({ theme, selected }) => (selected ? theme.colors.secondary : 'white')};
  box-shadow: inset 0 0 0 2px ${({ theme }) => theme.colors.secondary};

  &:not(:last-child) {
    margin-bottom: 16px;
  }

  ${({ onClick }) =>
    onClick &&
    css`
      &:hover {
        cursor: pointer;
      }
    `}
`;

const IconContainer = styled.div`
  //fill: white;
  svg {
    height: 50px;
    width: 50px;
  }
`;

const Content = styled.div`
  display: flex;
  margin-left: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex: 1;
`;

const Title = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
`;

const Description = styled.div`
  font-size: 0.8rem;
  font-weight: 200;
`;

const Actions = styled.div``;
