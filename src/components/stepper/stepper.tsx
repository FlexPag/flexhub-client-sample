import styled, { css } from 'styled-components';

export interface StepperProps<T extends Record<string, string>> {
  steps: T;
  activeStep: keyof T;
}

export function Stepper<T extends Record<string, string>>({ steps, activeStep }: StepperProps<T>) {
  const entries = Object.entries(steps);
  const activeIndex = entries.findIndex(([key]) => key === activeStep);

  return (
    <Container>
      {entries.map(([key, value], index) => (
        <Step current={activeIndex === index} active={index <= activeIndex} key={key}>
          <StepCircle current={index === activeIndex} active={index <= activeIndex}>
            {index + 1}
          </StepCircle>
          <StepLabel active={index <= activeIndex}>{value}</StepLabel>
          {index + 1 < entries.length && <StepLine active={index + 1 <= activeIndex} />}
        </Step>
      ))}
    </Container>
  );
}

const Container = styled.div``;

const Step = styled.div<{ active: boolean; current?: boolean }>`
  display: grid;
  grid-template-columns: min-content auto;

  align-items: center;
  justify-content: flex-start;
  opacity: ${({ active, current }) => (current ? 1 : active ? 0.9 : 0.5)};

  transition: opacity 300ms ease-in-out;
`;

const StepCircle = styled.div<{ current: boolean; active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 3rem;
  width: 3rem;

  color: ${({ theme, active, current }) => (current ? '#fff' : active ? theme.colors.secondary : theme.colors.primary)};
  border-color: ${({ theme, active }) => (active ? theme.colors.secondary : theme.colors.primary)};
  border-width: ${({ current }) => (current ? '1.5rem' : '3px')};
  border-style: solid;

  transition: border-width 300ms ease-in-out, color 300ms ease-in-out;

  box-sizing: border-box;
  font-size: 1.5rem;
  border-radius: 999px;
`;

const StepLabel = styled.span<{ active: boolean }>`
  margin-left: 1rem;
  font-weight: 700;
  font-size: 1.25rem;
  color: ${({ theme, active }) => (active ? theme.colors.secondary : theme.colors.primary)};
  transition: color 300ms ease-in-out;
`;

const StepLine = styled.div<{ active: boolean }>`
  width: 5px;
  border-radius: 5px;
  height: 3rem;
  background-color: ${({ theme, active }) => (active ? theme.colors.secondary : theme.colors.primary)};
  justify-self: center;
  margin: 1rem 0;
  opacity: ${({ active }) => (active ? 1 : 0.5)};

  transition: opacity 300ms ease-in-out, background-color 300ms ease-in-out;
`;
