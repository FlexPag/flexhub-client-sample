import { useMutation } from '@tanstack/react-query';
import convert from 'convert';
import creditCardType from 'credit-card-type';
import { useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useAbortController } from 'app/hooks/use-abort-controller/use-abort-controller';
import { OrderInfo, PayerInfoEnteredCart } from 'app/schemas';
import {
  makePayment,
  MakePaymentRequest,
  getIp,
  MakePCIAuthorizationRequest,
  makePciAuthorization,
  getTransactionStatus,
} from 'app/services';
import { pollUntil } from 'app/utils';

import { CreditCardInfo } from './use-credit-card-form';

export interface UseMakePaymentOptions {
  onPaymentSuccess: () => void;
}

export interface PayOptions {
  cart: PayerInfoEnteredCart;
  cardInfo: CreditCardInfo;
  usePci: boolean;
}

export function useMakePayment({ onPaymentSuccess }: UseMakePaymentOptions) {
  const abortController = useAbortController();

  const handlePayment = useCallback(
    async (options: PayOptions) => {
      await performPayment(options.cart.orderInfo, options.cardInfo, options.usePci);

      if (!options.usePci) {
        return;
      }

      const transactionStatus = await pollUntil(
        () => getTransactionStatus({ order_id: options.cart.orderInfo.orderId }),
        {
          ignoreErrors: true,
          pollingInterval: convert(1, 'second').to('milliseconds'),
          signal: abortController.signal,
          pollUntil: (data) => {
            if (data.transaction && data.transaction.status !== '17') {
              return true;
            }

            return !!data.paymentReferenceId;
          },
        }
      );

      if (!transactionStatus?.paymentReferenceId) {
        throw new Error('Não foi possível realizar o pagamento');
      }

      await performPciAuthorization(options.cardInfo, options.cart, transactionStatus.paymentReferenceId);
    },
    [abortController.signal]
  );

  const payment = useMutation(['make-payment'], handlePayment, {
    onSuccess: () => {
      onPaymentSuccess();
    },

    retry: false,
  });

  if (payment.status === 'error') {
    return { status: 'error', error: payment.error, pay: payment.mutate } as const;
  }

  if (payment.status === 'idle') {
    return { status: 'idle', pay: payment.mutate } as const;
  }

  return { status: 'loading' } as const;
}

async function performPciAuthorization(cardInfo: CreditCardInfo, cart: PayerInfoEnteredCart, referenceId: string) {
  const { ip } = await getIp();

  const request: MakePCIAuthorizationRequest = {
    Payment: {
      Card: {
        ExpirationDate: cardInfo.expirationDate,
        Brand: creditCardType(cardInfo.cardNumber)[0].niceType,
        Holder: cardInfo.cardHolderName,
        Number: cardInfo.cardNumber,
        SecurityCode: cardInfo.cvv,
      },

      FraudAnalysis: {
        Browser: {
          CookiesAccepted: true,
          Email: cart.payerInfo.email,
          IpAddress: ip,
          Type: 'Chrome',
        },

        TotalOrderAmount: cart.orderInfo.amount,
        Cart: {
          Items: cart.debts.map((debt, index) => ({
            Name: debt.description || `Dívida ${index + 1}`,
            Quantity: 1,
            Sku: debt.id,
            Type: 'Fatura',
            UnitPrice: debt.value,
          })),
        },

        FingerPrint: {
          Reference: 'CLEARSALE',
          SessionId: uuidv4(),
        },
      },
    },
  };

  return makePciAuthorization(request, referenceId);
}

async function performPayment(orderInfo: OrderInfo, cardInfo: CreditCardInfo, usePci: boolean) {
  const { ip } = await getIp();

  const request: MakePaymentRequest = {
    amount: orderInfo.amount,
    order_id: orderInfo.orderId,
    installments: Number.parseInt(cardInfo.numberOfInstallments, 10),
    payment_module: 16,
    card_request: usePci
      ? {
          card_number: cardInfo.cardNumber.slice(0, 6),
          brand: creditCardType(cardInfo.cardNumber)[0].niceType,
        }
      : {
          card_number: cardInfo.cardNumber,
          security_code: cardInfo.cvv,
          holder: cardInfo.cardHolderName,
          expiration_date: cardInfo.expirationDate,
          brand: creditCardType(cardInfo.cardNumber)[0].niceType,
        },
    fraud_analysis: {
      extra_fields: {
        restriction_type: 'ContractAccount',
        value: '',
      },
      fingerprint: uuidv4(),
      ip,
    },
  };

  return makePayment(request);
}
