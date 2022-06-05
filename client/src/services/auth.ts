import { LoginInputs, RegisterInputs } from '../types';
import { useMutation, UseMutationResult } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../api/auth';
import { AxiosError, AxiosResponse } from 'axios';

export const useLogin = (): UseMutationResult<
  AxiosResponse,
  AxiosError<any>,
  LoginInputs
> => {
  const navigate = useNavigate();
  return useMutation<AxiosResponse, AxiosError<any>, LoginInputs>(
    async data => login(data),
    {
      onSuccess: (response: any) => {
        setToken(response.data.jwt);
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

export const isAuthenticated = (): boolean =>
  getToken() && getToken() !== '' && getToken() !== undefined ? true : false;

export const setToken = (token: string): void =>
  localStorage.setItem('jwt', token);

export const getToken = (): string => localStorage.getItem('jwt') ?? '';

export const removeToken = (): void => localStorage.removeItem('jwt');
