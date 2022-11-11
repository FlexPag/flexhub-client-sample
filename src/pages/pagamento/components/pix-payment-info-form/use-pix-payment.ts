import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

import { PayerInfoEnteredCart } from 'app/schemas';
import { makePixPayment, MakePixPaymentRequest, MakePixPaymentResponse } from 'app/services';
import { formatDate } from 'app/utils';

export function usePixPayment(onSuccess: (data: MakePixPaymentResponse) => void) {
  const payment = useMutation(['makePixPayment'], makePixPayment, {
    onSuccess,
  });

  const makePayment = useCallback(
    (cart: PayerInfoEnteredCart) => {
      const request = createPaymentRequest(cart);
      return makePixPayment(request);
    },
    [payment.mutate]
  );

  return { status: payment.status, makePayment };
}

function createPaymentRequest(cart: PayerInfoEnteredCart): MakePixPaymentRequest {
  const totalAmount = cart.debts.reduce((accumulator, debt) => accumulator + debt.value, 0);

  return {
    paymentMopdule: 6,
    amount: toPixMonetaryValue(totalAmount),
    isAuthenticated: true,
    isCallCPFCNPJ: false,
    uc: {
      uc: cart.payerInfo.document,
      invoices: cart.debts.map((debt, index) => ({
        amount: toPixMonetaryValue(debt.value),
        barCodeOne: '000000000000000000000000000000000000000000',
        dueDate: formatDate(debt.due_date, 'yyyy-mm-dd'),
        invoiceId: index.toString().padStart(6, '0'),
      })),
    },

    cliente: {
      ni: cart.payerInfo.document,
      email: cart.payerInfo.email,
      nome: cart.payerInfo.nome,
      tipoDocumento: 'CPF',
      telefone: '21999999999',
      endereco: {
        logradouro: cart.payerInfo.address.logradouro,
        bairro: cart.payerInfo.address.bairro,
        cep: cart.payerInfo.address.cep,
        complemento: cart.payerInfo.address.complemento,
        numero: cart.payerInfo.address.numero,
        municipio: cart.payerInfo.address.cidade,
        uf: cart.payerInfo.address.uf,
      },
    },
  };
}

function toPixMonetaryValue(value: number) {
  return Number((value * 100).toFixed(0));
}
