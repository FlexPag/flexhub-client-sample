import InputMask from 'inputmask';
import { useEffect, useMemo } from 'react';

const masks = {
  'credit-card-number': { mask: '9999 9999 9999 9999' } as InputMask.Options,
  'credit-card-expiration-date': { mask: '99/99' } as InputMask.Options,
  'credit-card-cvv': { mask: '999' } as InputMask.Options,
  'cep': { mask: '99999-999' } as InputMask.Options,
  'placa-veicular': { mask: '(AAA 9999)|(AAA 9A99)', keepStatic: false } as InputMask.Options,
  'cpf-or-cnpj': {
    mask: '(999.999.999-99)|(99.999.999/9999-99)',
  } as InputMask.Options,
} as const;

export type InputMaskType = keyof typeof masks;

export interface UseInputMaskOptions {
  autoUnmask: boolean;
}

const defaultOptions: UseInputMaskOptions = {
  autoUnmask: true,
};

export function useInputMask(
  mask: InputMaskType | undefined,
  inputRef: React.RefObject<HTMLInputElement>,
  options?: Partial<UseInputMaskOptions>
) {
  const finalOptions = useMemo(() => ({ ...defaultOptions, ...options }), [options]);
  useEffect(() => {
    if (!inputRef.current || !mask) {
      return;
    }

    const maskOptions = masks[mask];
    const inputMask = new InputMask({
      autoUnmask: finalOptions.autoUnmask,
      showMaskOnFocus: false,
      showMaskOnHover: false,
      keepStatic: true,
      jitMasking: true,
      ...maskOptions,
    });

    const maskInstance = inputMask.mask(inputRef.current);

    return () => {
      maskInstance.remove();
      inputMask.remove();
    };
  }, [mask, inputRef.current]);
}
