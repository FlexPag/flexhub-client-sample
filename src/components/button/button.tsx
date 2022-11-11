import Color from 'color';
import styled, { css } from 'styled-components';

export interface ButtonProps {
  children: string;
  onClick?: () => void;
  isLoading?: boolean;
  color?: 'primary' | 'secondary' | 'white';
  type?: 'button' | 'submit';
  variant?: 'filled' | 'outlined';
  disabled?: boolean;
  fullWidth?: boolean;
}

export function Button({
  children,
  onClick,
  isLoading,
  type = 'button',
  disabled = false,
  variant = 'filled',
  color = 'secondary',
  fullWidth = false,
}: ButtonProps) {
  return (
    <StyledButton
      type={type}
      onClick={disabled ? undefined : onClick}
      color={color}
      variant={variant}
      disabled={disabled}
      fullWidth={fullWidth}
    >
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button<{
  variant: 'filled' | 'outlined';
  color: 'primary' | 'secondary' | 'white';
  disabled: boolean;
  fullWidth: boolean;
}>`
  padding: 1rem;
  background: transparent;
  border: none;
  outline: none;

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}

  ${({ variant, color, disabled, theme }) =>
    variant === 'filled'
      ? css`
          background-color: ${Color(theme.colors[color])
            .desaturate(disabled ? 1 : 0)
            .hex()};
          color: white;
        `
      : css`
          border: 1px solid
            ${Color(theme.colors[color])
              .desaturate(disabled ? 1 : 0)
              .hex()};
          color: ${Color(theme.colors[color])
            .desaturate(disabled ? 1 : 0)
            .hex()};
        `}

  border-radius: ${({ theme }) => theme.borderRadius};

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  }
`;
