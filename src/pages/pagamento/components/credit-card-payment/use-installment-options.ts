import { useMemo } from 'react';

import { formatToBrl } from 'app/utils';

export function useInstallmentOptions(installments: Record<string, number>) {
  return useMemo(() => {
    const entries = Object.entries(installments);
    const options = entries.map(([installment, value]) => [installment, `${installment}x de ${formatToBrl(value)}`]);

    return Object.fromEntries(options);
  }, [installments]);
}
