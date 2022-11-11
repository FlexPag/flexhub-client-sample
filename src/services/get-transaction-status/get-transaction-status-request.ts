import { z } from 'zod';

export const GetTransactionStatusRequestSchema = z.object({
  order_id: z.string(),
});

export type GetTransactionStatusRequest = z.input<typeof GetTransactionStatusRequestSchema>;
