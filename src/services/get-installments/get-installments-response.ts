import { z } from 'zod';

export const GetInstallmentsResponseSchema = z.object({
  status: z.literal(200),
  message: z.string().optional(),
  has_errors: z.literal(false),
  installments: z.record(z.string(), z.number()),
  fees: z.record(z.string(), z.number()),
  order_id: z.string(),
});

export type GetInstallmentsResponse = z.infer<typeof GetInstallmentsResponseSchema>;
