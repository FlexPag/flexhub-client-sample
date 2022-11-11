/* eslint-disable sonarjs/no-duplicate-string */
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Select, TextField } from 'app/components';
import { useZodForm } from 'app/hooks';
import { GetDebtsRequest, DebtSourceOptionsMap, GetDebtsRequestSchema } from 'app/services';

const debtSources = Object.fromEntries(Object.entries(DebtSourceOptionsMap).map(([key, value]) => [key, value.name]));

export function BuscarFaturasPage() {
  const form = useZodForm(GetDebtsRequestSchema);

  const navigate = useNavigate();
  const onSubmit = useCallback((data: GetDebtsRequest) => {
    navigate(`/selecionar-faturas?${new URLSearchParams(data)}`);
  }, []);

  const debtSource = form.watch('debt_source');
  const requiredFields = debtSource ? DebtSourceOptionsMap[debtSource].requiredFields : [];

  return (
    <Wrapper>
      <Container>
        <Header>
          <Title>Buscar faturas</Title>
        </Header>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Select
            form={form}
            fieldName="debt_source"
            options={debtSources}
            label="Tipo de fatura"
            style={{ marginBottom: '1rem' }}
          />
          {requiredFields.includes('document') && (
            <TextField form={form} fieldName="document" label="Documento" mask="cpf-or-cnpj" />
          )}

          {requiredFields.includes('contract_account') && (
            <TextField form={form} fieldName="contract_account" label="Conta Contrato" />
          )}

          {requiredFields.includes('license_plate') && (
            <TextField form={form} fieldName="license_plate" label="Placa" mask="placa-veicular" />
          )}
          <Button type="submit">BUSCAR FATURAS</Button>
        </form>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const Container = styled.div`
  background: white;
  padding: 1rem;
  border-radius: ${({ theme }) => theme.borderRadius};
`;

const Header = styled.div`
  background: ${({ theme }) => theme.colors.white};
  padding: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
`;
