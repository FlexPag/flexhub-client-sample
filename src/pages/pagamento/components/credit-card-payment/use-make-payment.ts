import { useMutation } from '@tanstack/react-query';
import creditCardType from 'credit-card-type';
import { v4 as uuidv4 } from 'uuid';

import { OrderInfo } from 'app/schemas';
import { makePayment, MakePaymentRequest, getIp } from 'app/services';

import { CreditCardInfo } from './use-credit-card-form';

export function useMakePayment(onMakePaymentSuccess: () => void) {
  const mutation = useMutation(['make-payment'], performMakePaymentRequest, {
    onSuccess: () => {
      onMakePaymentSuccess();
    },
    retry: 5,
    retryDelay: (failures) => failures * 1000,
  });

  return { status: mutation.status, pay: mutation.mutate };
}

export async function performMakePaymentRequest({
  orderInfo,
  cardInfo,
}: {
  orderInfo: OrderInfo;
  cardInfo: CreditCardInfo;
}) {
  const { ip } = await getIp();

  const request: MakePaymentRequest = {
    amount: orderInfo.amount,
    order_id: orderInfo.orderId,
    installments: Number.parseInt(cardInfo.numberOfInstallments, 10),
    payment_module: 16,
    card_request: {
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
