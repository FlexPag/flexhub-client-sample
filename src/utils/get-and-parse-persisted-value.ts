import { IS_DEV } from 'environment';
import { ZodType, ZodTypeDef } from 'zod';

import { AsParsedJSON } from 'app/shared';

export function getAndParsePersistedValue<T>(
  storage: Storage,
  key: string,
  schema: ZodType<T, ZodTypeDef, AsParsedJSON<T>>,
  defaultValue: T
): T;
export function getAndParsePersistedValue<T>(
  storage: Storage,
  key: string,
  schema: ZodType<T, ZodTypeDef, AsParsedJSON<T>>,
  defaultValue: undefined
): T | undefined;
export function getAndParsePersistedValue<T>(
  storage: Storage,
  key: string,
  schema: ZodType<T, ZodTypeDef, AsParsedJSON<T>>,
  defaultValue: T | undefined
): T | undefined {
  const storedValue = storage.getItem(key);

  if (!storedValue) {
    if (!defaultValue) {
      return;
    }

    storage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }

  try {
    const json = JSON.parse(storedValue);
    return schema.parse(json);
  } catch (error) {
    if (IS_DEV) {
      console.error(`Error parsing persisted value for key "${key}"`, error);
    }
    if (!defaultValue) {
      storage.removeItem(key);
      return;
    }

    storage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
}
