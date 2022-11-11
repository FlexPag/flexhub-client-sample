import { useLayoutEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { Stepper } from 'app/components';

const steps = {
  'buscar-faturas': 'Buscar Faturas',
  'selecionar-faturas': 'Selecionar Faturas',
  'dados-pagador': 'Dados do pagador',
  'pagamento': 'Pagamento',
  'comprovante-pagamento': 'Comprovante de pagamento',
};

export function CheckoutTemplate() {
  const { pathname } = useLocation();
  const [stepperContainerWidth, setStepperContainerWidth] = useState<string>();
  const stepperContainerRef = useRef<HTMLDivElement>(null);

  const activeStep = Object.keys(steps).find((key) => pathname.includes(key))! as keyof typeof steps;

  useLayoutEffect(() => {
    if (!stepperContainerRef.current) {
      return;
    }

    const { width } = stepperContainerRef.current.getBoundingClientRect();
    setStepperContainerWidth(`${width}px`);
  }, [stepperContainerRef]);

  return (
    <Container>
      <StepperContainer ref={stepperContainerRef}>
        <Stepper steps={steps} activeStep={activeStep} />
      </StepperContainer>
      <ContentWrapper stepperContainerWidth={stepperContainerWidth}>
        <Outlet />
      </ContentWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  min-height: 100%;
`;

const StepperContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  padding: 0 4rem;
`;

const ContentWrapper = styled.div<{ stepperContainerWidth?: string }>`
  background: ${({ theme }) => theme.colors.gray5};
  flex: 1;
  ${({ stepperContainerWidth }) =>
    stepperContainerWidth &&
    css`
      margin-left: ${stepperContainerWidth};
    `}
`;
