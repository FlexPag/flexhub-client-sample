import zod from 'zod';

export const DebtSchema = zod.object({
  id: zod.string(),
  description: zod.string().optional(),
  due_date: zod.string().transform((value) => new Date(value)),
  value: zod.number(),
});

export type Debt = zod.output<typeof DebtSchema>;

export const GetDebtsResponseSchema = zod.array(DebtSchema);

export type GetDebtsResponse = zod.output<typeof GetDebtsResponseSchema>;
