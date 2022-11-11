import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { Button, TextField } from 'app/components';
import { KEYCLOAK_CLIENT_ID } from 'app/environment';
import { useAuthentication } from 'app/hooks';
import { getTokens } from 'app/services';

import { AuthenticationForm, AuthenticationFormSchema } from './authentication-schema';

export function AuthenticationPage() {
  const authentication = useAuthentication();

  if (authentication.status !== 'unauthenticated') {
    // eslint-disable-next-line unicorn/no-null
    return null;
  }

  const form = useForm<AuthenticationForm>({
    resolver: zodResolver(AuthenticationFormSchema),
  });

  const authenticationMutation = useMutation(['authenticate'], getTokens, {
    onSuccess: (data) => {
      authentication.authenticate(data.access_token, data.refresh_token);
    },
  });

  const onSubmit = useCallback((data: AuthenticationForm) => {
    authenticationMutation.mutate({
      ...data,
      client_id: KEYCLOAK_CLIENT_ID,
    });
  }, []);

  const { isLoading } = authenticationMutation;

  return (
    <Wrapper>
      <Container>
        <Title>
          Entre com sua conta <b>FlexHub</b>
        </Title>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <TextField form={form} fieldName="username" label="Usuário" />
          <TextField form={form} fieldName="password" label="Senha " />
          <Button type="submit" fullWidth disabled={isLoading}>
            LOGIN
          </Button>
        </form>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;

  background: ${({ theme }) => theme.colors.gray5};
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray1};
  text-align: left;

  margin-bottom: 2rem;

  b {
    color: ${({ theme }) => theme.colors.secondary};
    font-weight: bold;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius};

  background: ${({ theme }) => theme.colors.white};
`;
