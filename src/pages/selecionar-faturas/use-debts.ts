import { useQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';

import { Debt, getDebts, GetDebtsRequest } from 'app/services';

export function useDebts(request: GetDebtsRequest) {
  const query = useQuery(['debts', ...Object.values(request)], () => getDebts(request));
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggle = useCallback(
    (debt: Debt) => {
      if (selectedIds.includes(debt.id)) {
        setSelectedIds(selectedIds.filter((id) => id !== debt.id));
        return;
      }

      setSelectedIds([...selectedIds, debt.id]);
    },
    [selectedIds, setSelectedIds]
  );

  const areAllSelected = selectedIds.length === query.data?.length;

  const toggleAll = useCallback(() => {
    if (areAllSelected) {
      setSelectedIds([]);
      return;
    }

    setSelectedIds(query.data?.map((debt) => debt.id) ?? []);
  }, [query.data, areAllSelected, setSelectedIds]);

  const totalSelectedValue = useMemo(() => {
    const selectedQueries = query.data?.filter((debt) => selectedIds.includes(debt.id));
    return selectedQueries?.reduce((accumulator, debt) => accumulator + debt.value, 0) ?? 0;
  }, [selectedIds, query.data]);

  return {
    query,
    selectedIds,
    toggle,
    areAllSelected,
    toggleAll,
    totalSelectedValue,
  };
}
