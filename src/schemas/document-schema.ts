import { cnpj, cpf } from 'cpf-cnpj-validator';
import zod from 'zod';

export const DocumentSchema = zod
  .string({ required_error: 'Documento deve ser informado' })
  .regex(/^\d{11}|\d{13}/, 'Documento deve ser um CPF ou CNPJ válido')
  .refine(
    (value) => (value.length === 11 && cpf.isValid(value)) || cnpj.isValid(value),
    'Documento deve ser um CPF ou CNPJ válido'
  );
