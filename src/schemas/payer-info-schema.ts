import { z } from 'zod';

import { DocumentSchema } from './document-schema';

export const PayerInfoSchema = z.object({
  nome: z.string({ required_error: 'Nome é obrigatório' }).min(1, { message: 'Nome é obrigatório' }),
  document: DocumentSchema,
  email: z.string({ required_error: 'Email é obrigatório' }).email({ message: 'Email inválido' }),
  address: z.object({
    cep: z.string({ required_error: 'CEP é obrigatório' }).length(8, { message: 'CEP inválido' }),
    logradouro: z
      .string({ required_error: 'Logradouro é obrigatório' })
      .min(1, { message: 'Logradouro é obrigatório' }),
    complemento: z.string().optional(),
    uf: z.string({ required_error: 'UF é obrigatório' }).length(2, { message: 'UF inválido' }),
    cidade: z.string({ required_error: 'Cidade é obrigatória' }).min(1, { message: 'Cidade é obrigatória' }),
    estado: z.string({ required_error: 'Estado é obrigatório' }).min(1, { message: 'Estado é obrigatório' }),
    bairro: z.string({ required_error: 'Bairro é obrigatório' }).min(1, { message: 'Bairro é obrigatório' }),
    numero: z.string({ required_error: 'Número é obrigatório' }).min(1, { message: 'Número é obrigatório' }),
  }),
});

export type PayerInfo = z.infer<typeof PayerInfoSchema>;
