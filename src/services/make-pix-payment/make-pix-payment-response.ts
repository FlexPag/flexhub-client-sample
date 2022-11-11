import { z } from 'zod';

export const MakePixPaymentResponseSchema = z.object({
  QrCodeText: z.string(),
  QrCodeImage64: z.string(),
});

export type MakePixPaymentResponse = z.output<typeof MakePixPaymentResponseSchema>;
