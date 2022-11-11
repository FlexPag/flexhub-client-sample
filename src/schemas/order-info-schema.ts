import { z } from 'zod';

export const OrderInfoSchema = z.object({
  orderId: z.string(),
  installments: z.record(z.string(), z.number()),
  fees: z.record(z.string(), z.number()),
  amount: z.number(),
});

export type OrderInfo = z.infer<typeof OrderInfoSchema>;
