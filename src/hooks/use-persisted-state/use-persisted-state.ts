import { useCallback, useState } from 'react';
import { ZodType, ZodTypeDef } from 'zod';

import { AsParsedJSON } from 'app/shared';
import { getAndParsePersistedValue } from 'app/utils';

export function usePersistedState<T>(
  storage: Storage,
  key: string,
  schema: ZodType<T, ZodTypeDef, AsParsedJSON<T>>,
  defaultValue: T
): [T, (value: T) => void];
export function usePersistedState<T>(
  storage: Storage,
  key: string,
  schema: ZodType<T, ZodTypeDef, AsParsedJSON<T>>
): [T | undefined, (value: T | undefined) => void];
export function usePersistedState<T>(
  storage: Storage,
  key: string,
  schema: ZodType<T, ZodTypeDef, AsParsedJSON<T>>,
  defaultValue?: T
): [T, (value: T) => void] | [T | undefined, (value: T | undefined) => void] {
  const [state, setState] = useState(getAndParsePersistedValue(storage, key, schema, defaultValue));

  const handleSetState = useCallback(
    (value: T | undefined) => {
      setState(value);

      if (value) {
        storage.setItem(key, JSON.stringify(value));
      } else {
        storage.removeItem(key);
      }
    },
    [setState, key, schema]
  );

  return [state, handleSetState] as [T | undefined, (value: T | undefined) => void];
}
