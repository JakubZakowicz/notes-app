import api from '../api/api';

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
