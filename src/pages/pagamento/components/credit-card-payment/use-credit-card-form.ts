import { z } from 'zod';

import { useZodForm } from 'app/hooks';

export function useCreditCardForm() {
  return useZodForm(CreditCardInfoSchema);
}

const CreditCardInfoSchema = z.object({
  cardNumber: z
    .string({ required_error: 'Número do cartão deve ser informado' })
    .length(16, 'Número do cartão deve ser válido'),
  cardHolderName: z
    .string({ required_error: 'Nome do titular deve ser informado' })
    .min(1, { message: 'Nome do titular deve ser informado' }),
  numberOfInstallments: z.string(),
  expirationDate: z
    .string()
    .regex(/^\d{2}\/\d{2}$/, { message: 'Data de expiração deve ser válida e no formato dd/yy' })
    .transform((value) => {
      const [month, year] = value.split('/');
      return `${month}/20${year}`;
    }),
  cvv: z.string(),
});

export type CreditCardInfo = z.infer<typeof CreditCardInfoSchema>;
