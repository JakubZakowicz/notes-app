import { LoginInputs, RegisterInputs } from '../types';
import { useMutation, UseMutationResult } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../api/auth';

export const useLogin = (): UseMutationResult<Response, Error, LoginInputs> => {
  const navigate = useNavigate();
  return useMutation<Response, Error, LoginInputs>(async data => login(data), {
    onSuccess: (response: any) => {
      navigate('/');
      setToken(response.data.jwt);
    },
  });
};

export const useRegister = (): UseMutationResult<
  Response,
  Error,
  RegisterInputs
> => {
  const navigate = useNavigate();
  return useMutation<Response, Error, RegisterInputs>(
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

export const logout = (): void => localStorage.removeItem('jwt');