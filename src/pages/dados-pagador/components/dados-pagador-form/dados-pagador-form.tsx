import { Col, Row } from 'react-grid-system';
import styled from 'styled-components';

import { Button, Collapse, TextField } from 'app/components';
import { useZodForm } from 'app/hooks';
import { PayerInfo, PayerInfoSchema } from 'app/schemas';

import { useCepQuery } from './use-cep-query';

export interface DadosPagadorFormProps {
  onSubmit: (data: PayerInfo) => void;
  isLoading: boolean;
}

export function DadosPagadorForm({ onSubmit, isLoading }: DadosPagadorFormProps) {
  const form = useZodForm(PayerInfoSchema, { isDisabled: isLoading });
  const cepQuery = useCepQuery(form);

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <TextField form={form} fieldName="nome" label="Nome" />
      <TextField form={form} fieldName="email" label="Email" />
      <TextField form={form} fieldName="document" label="Documento" mask="cpf-or-cnpj" />
      <AddressContainer>
        <AddressTitle>Endereço</AddressTitle>
        <TextField form={form} fieldName="address.cep" label="CEP" mask="cep" />

        <Collapse isOpen={!!cepQuery.data}>
          <Row>
            <Col md={8}>
              <TextField form={form} fieldName="address.logradouro" label="Endereço" />
            </Col>
            <Col md={4}>
              <TextField form={form} fieldName="address.numero" label="Número" />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <TextField form={form} fieldName="address.bairro" label="Bairro" />
            </Col>
            <Col md={6}>
              <TextField form={form} fieldName="address.cidade" label="Cidade" />
            </Col>
          </Row>
        </Collapse>
      </AddressContainer>

      <ButtonContainer>
        <Button type="submit">IR PARA PAGAMENTO</Button>
      </ButtonContainer>
    </form>
  );
}

const AddressContainer = styled.div`
  margin-top: 1rem;
`;

const AddressTitle = styled.div`
  font-size: 1.5rem;
  margin-left: ${({ theme }) => theme.borderRadius};
`;

const ButtonContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
`;
