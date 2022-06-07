import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, UseMutationResult } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../api/auth';
import { LoginInputs, RegisterInputs } from '../types';
import {
  setToken,
  addAuthHeader,
  removeToken,
  removeAuthHeader,
} from '../utils/auth';

export const useLogin = (): UseMutationResult<
  AxiosResponse,
  AxiosError<any>,
  LoginInputs
> => {
  const navigate = useNavigate();
  return useMutation<AxiosResponse, AxiosError<any>, LoginInputs>(
    async data => login(data),
    {
      onSuccess: (response: AxiosResponse) => {
        setToken(response.data.jwt);
        addAuthHeader();
        navigate('/');
      },
    }
  );
};

export const useRegister = (): UseMutationResult<
  AxiosResponse,
  AxiosError,
  RegisterInputs
> => {
  const navigate = useNavigate();
  return useMutation<AxiosResponse, AxiosError, RegisterInputs>(
    async data => register(data),
    {
      onSuccess: () => navigate('/auth/login'),
    }
  );
};

export const useLogout = () => {
  const navigate = useNavigate();
  return () => {
    removeToken();
    removeAuthHeader();
    navigate('/auth/login');
  };
};
