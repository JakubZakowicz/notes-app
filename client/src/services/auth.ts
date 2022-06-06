import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, UseMutationResult } from 'react-query';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { login, register } from '../api/auth';
import { LoginInputs, RegisterInputs } from '../types';

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

export const isAuthenticated = (): boolean =>
  getToken() && getToken() !== '' && getToken() !== undefined ? true : false;

export const addAuthHeader = (): void => {
  api.defaults.headers.common['Authorization'] = 'Bearer ' + getToken();
};

export const removeAuthHeader = (): void => {
  delete api.defaults.headers.common['Authorization'];
};

export const setToken = (token: string): void =>
  localStorage.setItem('jwt', token);

export const getToken = (): string => localStorage.getItem('jwt') ?? '';

export const removeToken = (): void => localStorage.removeItem('jwt');
