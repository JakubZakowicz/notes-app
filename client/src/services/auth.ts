import axios from 'axios';
import { LoginInputs, RegisterInputs } from '../types';

export const login = async (data: LoginInputs): Promise<Response> => {
  const { email, password } = data;
  return await axios.post('http://localhost:1337/api/auth/local', {
    identifier: email,
    password,
  });
};

export const signup = async (data: RegisterInputs): Promise<Response> =>
  await axios.post('http://localhost:1337/api/auth/local/register', data);

export const isAuthenticated = (): boolean =>
  localStorage.getItem('jwt') && localStorage.getItem('jwt') != undefined
    ? true
    : false;

export const setToken = (token: string): void =>
  localStorage.setItem('jwt', token);

export const getToken = () => localStorage.getItem('jwt');

export const logout = () => localStorage.removeItem('jwt');
