import zod from 'zod';

import { DocumentSchema } from 'app/schemas';

const ContractAccountSchema = zod
  .string({ required_error: 'Conta contrato deve ser informada' })
  .min(1, { message: 'Conta contrato deve ser informada' })
  .refine((value) => Number.isInteger(Number.parseInt(value, 10)), {
    message: 'Conta contrato só pode conter números',
  });

const LicensePlateSchema = zod
  .string({ required_error: 'Placa deve ser informada' })
  .regex(/^[A-Z]{3}\d[\dA-Z]\d{2}$/, 'A placa informada deve ser válida');

export const GetDebtsRequestSchema = zod.discriminatedUnion('debt_source', [
  zod.object({
    debt_source: zod.literal('CELPE'),
    document: DocumentSchema,
    contract_account: ContractAccountSchema,
  }),
  zod.object({
    debt_source: zod.literal('DETRAN_PE'),
    document: DocumentSchema,
    license_plate: LicensePlateSchema,
  }),
  zod.object({
    debt_source: zod.literal('ALGAS'),
    contract_account: ContractAccountSchema,
  }),
  zod.object({
    debt_source: zod.literal('BAHIAGAS'),
    document: DocumentSchema,
  }),
]);

export const DebtSourceRequiredFields = {
  CELPE: ['document', 'contract_account'] as const,
  DETRAN_PE: ['document', 'license_plate'] as const,
  ALGAS: ['contract_account'] as const,
  BAHIAGAS: ['document'] as const,
} as const;

export type GetDebtsRequest = zod.infer<typeof GetDebtsRequestSchema>;
