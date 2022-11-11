import { useQuery } from '@tanstack/react-query';
import convert from 'convert';
import { useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { PayerInfo } from 'app/schemas';
import { getCep, GetCepResponse } from 'app/services';

const CEP_FIELD = 'address.cep';

export function useCepQuery(form: UseFormReturn<PayerInfo>) {
  const handleError = useCallback(
    (error: unknown) => {
      if (error === 'cep-nao-encontrado') {
        form.setError(CEP_FIELD, {
          type: 'validate',
          message: 'CEP não encontrado',
        });
      }
    },
    [form]
  );

  const handleSuccess = useCallback(
    (data: GetCepResponse) => {
      form.setValue('address.logradouro', data.logradouro);
      form.setValue('address.cidade', data.localidade);
      form.setValue('address.estado', data.uf);
      form.setValue('address.bairro', data.bairro);
      form.setValue('address.uf', data.uf);
      form.trigger('address');

      requestAnimationFrame(() => {
        form.setFocus('address.numero');
      });
    },
    [form]
  );

  const cep = form.watch(CEP_FIELD, '');

  form.clearErrors(CEP_FIELD);

  const fetchCep = useCallback(() => {
    form.clearErrors(CEP_FIELD);
    return getCep(cep);
  }, [cep]);

  return useQuery(['cep', cep], fetchCep, {
    enabled: cep.length === 8,

    retry: shouldRetry,
    staleTime: convert(5, 'minutes').to('milliseconds'),
    onSuccess: handleSuccess,
    onError: handleError,
  });
}

const shouldRetry = (failureCount: number, error: unknown) => failureCount < 3 && error !== 'cep-nao-encontrado';
