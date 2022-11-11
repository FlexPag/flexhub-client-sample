import convert from 'convert';
import { useCallback } from 'react';

import { usePollingQuery } from 'app/hooks';
import { getTransactionStatus } from 'app/services';

export function useTransactionStatus(orderId: string) {
  const fetchTransactionStatus = useCallback(() => getTransactionStatus({ order_id: orderId }), [orderId]);

  return usePollingQuery(['transaction-status', orderId], fetchTransactionStatus, {
    pollingInterval: convert(1, 'second').to('milliseconds'),
    pollUntil: (data) => {
      if (!data.transaction) {
        return false;
      }

      return !(data.transaction.status === '17');
    },
  });
}
