import zod from 'zod';

export const AuthenticationFormSchema = zod.object({
  username: zod.string().min(1, { message: 'Usuário deve ser informado' }),
  password: zod.string().min(1, { message: 'Senha deve ser informada' }),
});

export type AuthenticationForm = zod.infer<typeof AuthenticationFormSchema>;
