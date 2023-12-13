import { FC, ReactNode } from 'react';

import css from './Button.module.scss';

interface ButtonProps {
  className?: string;
  children?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: FC<ButtonProps> = ({
  className = '',
  children,
  type = 'button',
}) => (
  <button
    className={`${className} ${css.button}`}
    type={type}
  >
    {children}
  </button>
);
