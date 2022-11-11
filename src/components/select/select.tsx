import { CSSProperties, useMemo } from 'react';
import { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form';
import styled from 'styled-components';

export interface SelectProps<TFieldValues extends Record<string, string>, TFieldName extends FieldPath<TFieldValues>> {
  fieldName: TFieldName;
  label?: string;
  options: Record<string, string>;
  form: UseFormReturn<TFieldValues>;
  style?: CSSProperties;
}

export function Select<TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues>>({
  fieldName,
  label,
  options,
  form,
  style,
}: SelectProps<TFieldValues, TFieldName>) {
  const registerProps = useMemo(() => form.register(fieldName), [fieldName, form.register]);

  return (
    <StyledSelect style={style} {...registerProps} defaultValue="">
      {label && (
        <option value="" disabled>
          {label}
        </option>
      )}
      {Object.entries(options).map(([key, text]) => (
        <option key={key} value={key}>
          {text}
        </option>
      ))}
    </StyledSelect>
  );
}

const StyledSelect = styled.select`
  border: 1px solid #cccccc;
  margin: 0.5rem 0;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 1.25rem 0.75rem;
  font-size: 1.15rem;
  background: white;
  font-weight: normal;
`;
