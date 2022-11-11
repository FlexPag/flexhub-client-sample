import z from 'zod';

import { DebtSchema } from 'app/services';

import { OrderInfoSchema } from './order-info-schema';
import { PayerInfoSchema } from './payer-info-schema';
import { PendingPaymentSchema } from './pending-payment-schema';

export const DebtsSelectedCartSchema = z.object({
  stage: z.literal('debts-selected'),
  debts: z.array(DebtSchema),
});

export const PayerInfoEnteredCartSchema = DebtsSelectedCartSchema.extend({
  stage: z.literal('payer-info-entered'),
  payerInfo: PayerInfoSchema,
  orderInfo: OrderInfoSchema,
});

export const PaymentPendingCartSchema = PayerInfoEnteredCartSchema.extend({
  stage: z.literal('payment-pending'),
  pendingPayment: PendingPaymentSchema,
});

export const CartSchema = z.discriminatedUnion('stage', [
  DebtsSelectedCartSchema,
  PayerInfoEnteredCartSchema,
  PaymentPendingCartSchema,
]);

export type DebtsSelectedCart = z.infer<typeof DebtsSelectedCartSchema>;
export type PayerInfoEnteredCart = z.infer<typeof PayerInfoEnteredCartSchema>;
export type PaymentPendingCart = z.infer<typeof PaymentPendingCartSchema>;
export type Cart = z.infer<typeof CartSchema>;
