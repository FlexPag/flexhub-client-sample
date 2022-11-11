import { z } from 'zod';

export const PendingCreditCardPaymentSchema = z.object({
  type: z.literal('credit-card'),
});

export const PendingPixPaymentSchema = z.object({
  type: z.literal('pix'),
  pixCode: z.string(),
  pixImageBase64: z.string(),
});

export const PendingPaymentSchema = z.discriminatedUnion('type', [
  PendingCreditCardPaymentSchema,
  PendingPixPaymentSchema,
]);

export type PendingCreditCardPayment = z.infer<typeof PendingCreditCardPaymentSchema>;
export type PendingPixPayment = z.infer<typeof PendingPixPaymentSchema>;
export type PendingPayment = z.infer<typeof PendingPaymentSchema>;
