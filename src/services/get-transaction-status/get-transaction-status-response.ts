import { z } from 'zod';

export const GetTransactionStatusResponseSchema = z.object({
  status: z.number(),
  message: z.string().nullish(),
  has_errors: z.boolean(),

  client: z.object({
    name: z.string().nullish(),
    document_type: z.string().nullish(),
    ni: z.string().nullish(),
    email: z.string().nullish(),
    phone: z.string().nullish(),
    birth_date: z.string().nullish(),
    address: z.any().nullish(),
    id: z.string().nullish(),
    uuid: z.string().nullish(),
  }),

  purchase: z.object({
    id: z.string(),
    purchase_channel: z.string().nullish(),
    payment_type: z.string().nullish(),
  }),

  transaction: z.nullable(
    z.object({
      id: z.string(),
      payment_date: z.string().nullish(),
      amount: z.number().nullish(),
      status: z.string(),
      name: z.string().nullish(),
    })
  ),

  paymentReferenceId: z.string().nullish(),
});

export type GetTransactionStatusResponse = z.output<typeof GetTransactionStatusResponseSchema>;
