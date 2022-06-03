import React from 'react';
import { ErrorMessageProps } from '../types';

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  status,
  name,
  message,
}) => (
  <div className="w-full h-full flex justify-center mt-52">
    <div className="bg-white w-[500px] px-5 py-10 flex flex-col justify-center items-center rounded-xl">
      {status && <p className="text-9xl text-red-500 font-thin">{status}</p>}
      {name && <p className="text-2xl text-red-500">{name}</p>}
      {message && (
        <p className="text-1xl text-red-500 mt-2 text-center">{message}</p>
      )}
    </div>
  </div>
);
export default ErrorMessage;
