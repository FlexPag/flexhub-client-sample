import z from 'zod';

export const PixPaymentInfoSchema = z.object({
  type: z.literal('pix'),
  pixKey: z.string(),
});
