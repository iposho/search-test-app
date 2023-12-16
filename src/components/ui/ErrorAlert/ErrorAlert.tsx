import { FC } from 'react';

import css from './ErrorAlert.module.scss';

interface IError {
  data?: unknown;
  status?: string | number;
}
interface IErrorAlertProps {
  error: IError | unknown;
}

export const ErrorAlert:FC<IErrorAlertProps> = ({ error }) => {
  // @ts-expect-error unknown props
  const { data, status } = error;

  return (
    <div className={css.errorAlert}>
      <div className={css.errorIcon}>
        <span>!</span>
      </div>
      <div className={css.message}>
        <div className={css.title}>Error</div>
        <div className={css.status}>{`Status: ${status}`}</div>
        <div className={css.info}>{JSON.stringify(data)}</div>
      </div>
    </div>
  );
};
