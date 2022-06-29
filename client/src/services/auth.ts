import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, UseMutationResult } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, register } from '../api/auth';
import { LoginInputs, RegisterInputs } from '../types';
import {
  setUserData,
  addAuthHeader,
  removeUserData,
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
      onSuccess: (res: AxiosResponse) => {
        setUserData(res.data);
        addAuthHeader();
        navigate('/');
        toast.success('You are successfully logged!');
      },
    }
  );
};

export const useRegister = (): UseMutationResult<
  AxiosResponse,
  AxiosError<any>,
  RegisterInputs
> => {
  const navigate = useNavigate();
  return useMutation<AxiosResponse, AxiosError<any>, RegisterInputs>(
    async data => register(data),
    {
      onSuccess: () => {
        navigate('/auth/login');
        toast.success('You are successfully registered!');
      },
    }
  );
};

export const useLogout = () => {
  const navigate = useNavigate();
  return () => {
    removeUserData();
    removeAuthHeader();
    navigate('/auth/login');
    toast.success('You are successfully logged out!');
  };
};
