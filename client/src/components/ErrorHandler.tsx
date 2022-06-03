import React from 'react';
import ErrorMessage from './ErrorMessage';
import { ErrorHandlerProps } from '../types';

const ErrorHandler: React.FC<ErrorHandlerProps> = ({ error }) => {
  if (error.message === 'Network Error')
    return <ErrorMessage message={error?.message} />;

  var response = error?.response;
  var responseError = response?.data.error;
  if (responseError)
    return (
      <ErrorMessage
        status={responseError?.status}
        name={responseError?.name}
        message={responseError?.message}
      />
    );

  return (
    <ErrorMessage status={response?.status.toString()} name={response?.data} />
  );
};

export default ErrorHandler;
