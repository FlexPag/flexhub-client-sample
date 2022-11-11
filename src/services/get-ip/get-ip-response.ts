import { z } from 'zod';

export const GetIpResponseSchema = z.object({
  ip: z.string(),
});

export type GetIpResponse = z.infer<typeof GetIpResponseSchema>;
