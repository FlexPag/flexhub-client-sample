import { useMutation } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

import { DebtsSelectedCart, OrderInfo, PayerInfo } from 'app/schemas';
import { getInstallments, GetInstallmentsRequestSchema } from 'app/services';

export function useGetInstallments(onInstallmentsFetched: (payerInfo: PayerInfo, orderInfo: OrderInfo) => void) {
  const mutation = useMutation(['get-installments'], performGetInstallmentsRequest, {
    onSuccess: (data) => {
      onInstallmentsFetched(data.payerInfo, data.orderInfo);
    },
    retry: 5,
    retryDelay: (failures) => failures * 1000,
  });

  return { status: mutation.status, fetch: mutation.mutate };
}

async function performGetInstallmentsRequest({ payerInfo, cart }: { payerInfo: PayerInfo; cart: DebtsSelectedCart }) {
  const request = createGetInstallmentsRequest(payerInfo, cart);
  const response = await getInstallments(request);

  return {
    payerInfo,
    orderInfo: {
      orderId: response.order_id,
      installments: response.installments,
      fees: response.fees,
      amount: request.order.amount,
    } as OrderInfo,
  };
}

function createGetInstallmentsRequest(payerInfo: PayerInfo, cart: DebtsSelectedCart) {
  const cartTotal = cart.debts.reduce((accumulator, debt) => accumulator + debt.value, 0);

  return {
    is_authenticated: true,
    client: {
      name: payerInfo.nome,
      email: payerInfo.email,
      ni: payerInfo.document,
      document_type: payerInfo.document.length === 11 ? 'CPF' : 'CNPJ',
      address: {
        zipCode: payerInfo.address.cep,
        number: payerInfo.address.numero,
        complement: payerInfo.address.complemento,
        street: payerInfo.address.logradouro,
        city: payerInfo.address.cidade,
        state: payerInfo.address.estado,
        district: payerInfo.address.bairro,
      },
    },
    order: {
      id: uuidv4(),
      amount: cartTotal,
      account: [
        {
          uc: payerInfo.document,
          invoices: cart.debts.map((debt) => ({ invoice_id: debt.id, due_date: debt.due_date, amount: debt.value })),
        },
      ],
    },
  } as z.input<typeof GetInstallmentsRequestSchema>;
}
