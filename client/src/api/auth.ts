import axios from 'axios';
import { LoginInputs, RegisterInputs } from '../types';

export const login = async (data: LoginInputs): Promise<Response> => {
  const { email, password } = data;
  return await axios.post('http://localhost:1337/api/auth/local', {
    identifier: email,
    password,
  });
};

export const register = async (data: RegisterInputs): Promise<Response> =>
  await axios.post('http://localhost:1337/api/auth/local/register', data);
