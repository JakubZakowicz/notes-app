import api from './api';
import { AxiosResponse } from 'axios';
import { LoginInputs, RegisterInputs } from '../types';

export const login = async (data: LoginInputs): Promise<AxiosResponse> => {
  const { email, password } = data;
  return await api.post('/auth/local', {
    identifier: email,
    password,
  });
};

export const register = async (data: RegisterInputs): Promise<AxiosResponse> =>
  await api.post('/auth/local/register', data);