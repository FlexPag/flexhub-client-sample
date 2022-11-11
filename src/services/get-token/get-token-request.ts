import zod from 'zod';

export const GetTokenRequestSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  client_id: zod.string(),
  grant_type: zod.string(),
});

export type GetTokenRequest = zod.infer<typeof GetTokenRequestSchema>;
