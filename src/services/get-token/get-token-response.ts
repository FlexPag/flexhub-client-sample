import zod from 'zod';

export const GetTokenResponseSchema = zod.object({
  access_token: zod.string(),
  expires_in: zod.number(),
  refresh_expires_in: zod.number(),
  refresh_token: zod.string(),
  token_type: zod.string(),
});

export type GetTokenResponse = zod.infer<typeof GetTokenResponseSchema>;
