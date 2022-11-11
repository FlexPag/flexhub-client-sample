import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from 'app/components';

export function NoDebtsFound() {
  const navigate = useNavigate();
  const handleGoBack = useCallback(() => {
    navigate('/buscar-faturas');
  }, [navigate]);

  return (
    <Wrapper>
      <Container>
        <Message>Nenhuma fatura foi encontrada</Message>
        <Button onClick={handleGoBack}>VOLTAR PARA BUSCA DE FATURAS</Button>
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
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 1rem;
`;

const Message = styled.h1`
  color: ${({ theme }) => theme.colors.gray1};
  font-size: 2rem;
  margin-bottom: 2rem;
`;
