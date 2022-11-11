import { useCallback, useRef, FocusEvent as ReactFocusEvent, useState, useImperativeHandle, useMemo } from 'react';
import { FieldPath, FieldValues } from 'react-hook-form';
import styled, { css } from 'styled-components';

import { InputMaskType, useInputMask, UseInputMaskOptions, UseZodFormReturn } from 'app/hooks';

export interface TextFieldProps<TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues>> {
  fieldName: TFieldName;
  mask?: InputMaskType | ({ type: InputMaskType } & Partial<UseInputMaskOptions>);
  label: string;
  form: UseZodFormReturn<TFieldValues>;
  icon?: React.ReactNode;
}

export function TextField<TFieldValues extends FieldValues, TFieldName extends FieldPath<TFieldValues>>({
  fieldName,
  mask,
  form,
  label,
  icon,
}: TextFieldProps<TFieldValues, TFieldName>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);
  const { onBlur, ref, ...registerProps } = useMemo(() => form.register(fieldName), [form.register, fieldName]);

  useInputMask(typeof mask === 'string' ? mask : mask?.type, inputRef, typeof mask === 'object' ? mask : undefined);
  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

  const handleBlur = useCallback(
    (event_: ReactFocusEvent<HTMLInputElement, Element>) => {
      setFocused(false);
      onBlur(event_);
    },
    [onBlur]
  );

  const handleFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const isLabelActive = focused || Boolean(form.watch(fieldName));
  const isDisabled = form.isFormDisabled || form.isFieldDisabled(fieldName);
  const error = form.getFieldState(fieldName).error?.message;

  return (
    <Container disabled={isDisabled}>
      <Input
        {...registerProps}
        ref={inputRef}
        onBlur={handleBlur}
        onFocus={handleFocus}
        error={!!error}
        disabled={isDisabled}
      />
      <Label active={isLabelActive}>{label}</Label>
      {error && <Error>{error}</Error>}
      {icon}
    </Container>
  );
}

const Container = styled.div<{ disabled?: boolean }>`
  position: relative;

  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
`;

const Label = styled.span<{ active: boolean }>`
  position: absolute;
  top: calc(0.5rem + 1px);
  height: calc(3.4rem - 1px);
  left: 0.75rem;

  pointer-events: none;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  font-size: 1.25rem;

  transition: transform 100ms ease-in-out;
  transform-origin: left center;

  ${({ active }) =>
    active &&
    css`
      transform: translateY(-1.15rem) scale(0.65);
      color: #555;
    `}
`;

const Input = styled.input<{ error: boolean; disabled: boolean }>`
  border: 1px solid ${({ theme, error }) => (error ? theme.colors.error : '#ccc')};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 1.25rem 0.75rem;
  padding-bottom: 0.25rem;
  font-size: 1.5rem;
  box-sizing: border-box;

  ${({ disabled }) =>
    disabled &&
    css`
      user-select: none;
    `}

  &:focus {
    outline: none;
  }
`;

const Error = styled.span`
  margin-top: 0.25rem;
  margin-left: 0.25rem;
  color: red;
`;
