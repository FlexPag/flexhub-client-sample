export type PaymentOptionType = 'credit-card' | 'pix';

export interface PaymentOption {
  key: string;
  title: string;
  description: string;
  type: PaymentOptionType;
}

export const paymentOptions: PaymentOption[] = [
  {
    key: 'credit-card',
    title: 'Cartão de crédito',
    description: 'Parcele suas faturas em ate 24 vezes',
    type: 'credit-card',
  },

  {
    key: 'pix',
    title: 'Pix',
    description: 'Pague suas faturas à vista com Pix',
    type: 'pix',
  },
];
