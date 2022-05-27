import React from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../schemas';
import { LoginInputs } from '../types';
import { useLogin } from '../services/auth';

const Login: React.FC<{}> = () => {
  const { mutate, isLoading, isError, error } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginInputs> = data => mutate(data);

  if (isError && error?.name !== 'ValidationError')
    return <p>{error?.message}</p>;

  return (
    <div className="container mx-auto">
      <div className="flex justify-center h-screen items-center">
        <div className="bg-white border w-96 rounded-xl px-10 py-5 shadow-lg">
          <h1 className="text-3xl font-semibold text-center">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
            <p>{error?.message}</p>
            <div className="flex flex-col gap-8">
              <div className="relative">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="h-10 border rounded-lg w-full pl-2"
                />
                <p className="text-red-500 absolute">{errors.email?.message}</p>
              </div>
              <div className="relative">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  {...register('password')}
                  className="h-10 border rounded-lg w-full pl-2"
                />
                <p className="text-red-500 absolute">
                  {errors.password?.message}
                </p>
              </div>
            </div>
            <div className="flex justify-between mt-7">
              <div className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <p>Remember me</p>
              </div>
              <p>Forgot Password?</p>
            </div>
            <button
              className="bg-yellow-500 w-full mt-5 py-2 rounded-lg text-white hover:bg-yellow-600"
              disabled={isLoading}
            >
              Login
            </button>
          </form>
          <p className="text-center mt-5">
            Don't have an account?
            <Link to="/auth/register" className="text-yellow-600 ml-1">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
