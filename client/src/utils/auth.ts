import api from '../api/api';
import { User } from '../types';

export const isAuthenticated = (): boolean =>
  getToken() && getToken() !== '' && getToken() !== undefined ? true : false;

export const addAuthHeader = (): void => {
  api.defaults.headers.common['Authorization'] = 'Bearer ' + getToken();
};

export const removeAuthHeader = (): void => {
  delete api.defaults.headers.common['Authorization'];
};

export const setUserData = (data: string): void =>
  localStorage.setItem('userData', JSON.stringify(data));

export const getUserData = (): { jwt: string; user: User } | undefined => {
  const userData: string | null = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : undefined;
}
  
export const getToken = (): string => {
  const userData = getUserData();
  return userData ? userData.jwt : '';
};

export const getUser = (): User | undefined => {
  const userData = getUserData();
  return userData?.user;
};

export const removeUserData = (): void => localStorage.removeItem('userData');
