import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useState } from 'react';
import { FieldValues, useForm, UseFormProps, FieldPath, UseFormReturn } from 'react-hook-form';
import { ZodType } from 'zod';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UseZodFormProps<TFieldValues extends FieldValues, TContext = any> = Omit<
  UseFormProps<TFieldValues, TContext>,
  'resolver'
> & {
  isDisabled?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface UseZodFormReturn<TFieldValues extends FieldValues, TContext = any>
  extends UseFormReturn<TFieldValues, TContext> {
  disabledFields: Array<FieldPath<TFieldValues>>;
  isFieldDisabled: (field: FieldPath<TFieldValues>) => boolean;
  enableField: (field: FieldPath<TFieldValues>) => void;
  disableField: (field: FieldPath<TFieldValues>) => void;

  isFormDisabled: boolean;
  disableForm: () => void;
  enableForm: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useZodForm<T extends FieldValues, TContext = any>(
  schema: ZodType<T>,
  options?: UseZodFormProps<T, TContext>
): UseZodFormReturn<T> {
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const [disabledFields, setDisabledFields] = useState<Array<FieldPath<T>>>([]);

  const disableField = useCallback(
    (field: FieldPath<T>) => {
      setDisabledFields((previous) => (previous.includes(field) ? previous : [...previous, field]));
    },
    [setDisabledFields]
  );

  const enableField = useCallback(
    (field: FieldPath<T>) => {
      setDisabledFields((previous) => previous.filter((f) => f !== field));
    },
    [setDisabledFields]
  );

  const isFieldDisabled = useCallback((field: FieldPath<T>) => disabledFields.includes(field), [disabledFields]);

  const disableForm = useCallback(() => {
    setIsFormDisabled(true);
  }, [setIsFormDisabled]);

  const enableForm = useCallback(() => {
    setIsFormDisabled(false);
  }, [setIsFormDisabled]);

  const form = useForm<T, TContext>({
    ...options,
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const isDisabled = options?.isDisabled;
    if (typeof isDisabled !== 'boolean') {
      return;
    }

    if (isDisabled) {
      disableForm();
    } else {
      enableForm();
    }
  }, [options?.isDisabled]);

  return {
    ...form,
    disabledFields,
    isFieldDisabled,
    enableField,
    disableField,
    isFormDisabled,
    disableForm,
    enableForm,
  };
}
