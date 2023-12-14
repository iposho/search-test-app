import { FC, ReactNode } from 'react';

import css from './Button.module.scss';

interface ButtonProps {
  className?: string;
  children?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({
  className = '',
  children,
  type = 'button',
  onClick,
}) => (
  <button
    className={`${className} ${css.button}`}
    type={type}
    onClick={onClick}
  >
    {children}
  </button>
);
