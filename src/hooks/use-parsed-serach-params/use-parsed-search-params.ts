import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import zod from 'zod';

export function useParsedSearchParams<T extends zod.Schema>(schema: T): zod.infer<T> {
  const [searchParams] = useSearchParams();

  return useMemo(() => {
    const paramsAsObject = Object.fromEntries(searchParams.entries());
    return schema.parse(paramsAsObject);
  }, [schema, searchParams]);
}
