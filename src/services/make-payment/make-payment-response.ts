import { z } from 'zod';

export const MakePaymentResponseSchema = z.object({
  status: z.number(),
  message: z.string().optional(),
  has_errors: z.literal(false),
  order_id: z.string(),
});

export type MakePaymentResponse = z.infer<typeof MakePaymentResponseSchema>;
