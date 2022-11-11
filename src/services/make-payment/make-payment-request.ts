import { z } from 'zod';

export const MakePaymentRequestSchema = z.object({
  amount: z.number(),
  order_id: z.string(),
  installments: z.number().transform(String),
  payment_module: z.number(),
  fraud_analysis: z.object({
    ip: z.string(),
    fingerprint: z.string(),
    extra_fields: z.object({
      restriction_type: z.string(),
      value: z.string(),
    }),
  }),
  card_request: z.object({
    card_number: z.string(),
    holder: z.string().optional(),
    expiration_date: z.string().optional(),
    security_code: z.string().optional(),
    brand: z.string(),
  }),
});

export type MakePaymentRequest = z.input<typeof MakePaymentRequestSchema>;
