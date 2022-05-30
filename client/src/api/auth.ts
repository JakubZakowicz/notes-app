import api from './api';
import { LoginInputs, RegisterInputs } from '../types';

export const login = async (data: LoginInputs): Promise<Response> => {
  const { email, password } = data;
  return await api.post('/auth/local', {
    identifier: email,
    password,
  });
};

export const register = async (data: RegisterInputs): Promise<Response> =>
  await api.post('/auth/local/register', data);