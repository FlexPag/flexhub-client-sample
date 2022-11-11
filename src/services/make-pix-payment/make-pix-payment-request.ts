import { z } from 'zod';

export const MakePixPaymentRequestSchema = z.object({
  paymentMopdule: z.literal(6),
  amount: z.number(),
  isCallCPFCNPJ: z.literal(false),
  isAuthenticated: z.literal(true),
  uc: z.object({
    uc: z.string(),
    invoices: z.array(
      z.object({
        invoiceId: z.string(),
        amount: z.number(),
        dueDate: z.string(),
        barCodeOne: z.literal('000000000000000000000000000000000000000000'),
      })
    ),
  }),

  cliente: z.object({
    ni: z.string(),
    email: z.string(),
    dataNascimento: z.string().optional(),
    nome: z.string(),
    telefone: z.string().optional(),
    tipoDocumento: z.enum(['CPF', 'CNPJ']),
    endereco: z.object({
      logradouro: z.string(),
      cep: z.string(),
      numero: z.string(),
      complemento: z.string().optional(),
      bairro: z.string(),
      municipio: z.string(),
      uf: z.string(),
    }),
  }),
});

export type MakePixPaymentRequest = z.input<typeof MakePixPaymentRequestSchema>;
