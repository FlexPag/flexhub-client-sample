/* eslint-disable sonarjs/no-duplicate-string */
import { useMemo } from 'react';

import { Cart, CartSchema, OrderInfo, PayerInfo, PendingPayment } from 'app/schemas';

import { usePersistedState } from '../use-persisted-state';

type NotFoundState = { stage: 'not-found' };

type DebtsSelectedState = Extract<Cart, { stage: 'debts-selected' }> & {
  setPayerInfo: (payerInfo: PayerInfo, orderInfo: OrderInfo) => void;
};

type PayerInfoEnteredState = Extract<Cart, { stage: 'payer-info-entered' }> & {
  setPendingPayment: (payment: PendingPayment) => void;
};

type PaymentPendingState = Extract<Cart, { stage: 'payment-pending' }> & {
  retryPayment: () => void;
};

type State = NotFoundState | DebtsSelectedState | PayerInfoEnteredState | PaymentPendingState;

export function useCart(): State {
  const [cart, setCart] = usePersistedState(sessionStorage, 'cart', CartSchema);

  return useMemo(() => {
    if (!cart) {
      return { stage: 'not-found' };
    }

    if (cart.stage === 'debts-selected') {
      return {
        ...cart,
        setPayerInfo: (payerInfo: PayerInfo, orderInfo: OrderInfo) =>
          setCart({ ...cart, stage: 'payer-info-entered', payerInfo, orderInfo }),
      };
    }

    if (cart.stage === 'payer-info-entered') {
      return {
        ...cart,
        setPendingPayment: (payment: PendingPayment) =>
          setCart({ ...cart, stage: 'payment-pending', pendingPayment: payment }),
      };
    }

    if (cart.stage === 'payment-pending') {
      return {
        ...cart,
        retryPayment: () => {
          const newCart = { ...cart, pendingPayment: undefined };
          setCart({ ...newCart, stage: 'payer-info-entered' });
        },
      };
    }

    throw new Error('Invalid cart stage');
  }, [cart]);
}
