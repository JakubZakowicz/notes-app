import React from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ErrorHandler from '../components/ErrorHandler';
import Seo from '../components/Seo';
import { registerSchema } from '../schemas';
import { RegisterInputs } from '../types';
import { useRegister } from '../services/auth';

const Register: React.FC = () => {
  const { mutate, isLoading, isError, error } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>({
    reValidateMode: 'onSubmit',
    resolver: yupResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterInputs> = data => {
    mutate(data);
  };

  if (isError) {
    var { message } = error?.response?.data?.error;
    if (
      message !== 'Email is already taken' &&
      message !== 'An error occurred during account creation'
    )
      return <ErrorHandler error={error} />;
  }

  return (
    <div className="container mx-auto">
      <Seo title="Register" />
      <div className="flex justify-center h-screen items-center">
        <div className="bg-white bg-opacity-75 border w-96 rounded-xl px-10 py-5 shadow-xl">
          <h1 className="text-3xl font-semibold text-center">Register</h1>
          {isError && (
            <p className="text-red-500 text-center mt-2 -mb-4">
              {message === 'An error occurred during account creation'
                ? 'Username is already taken'
                : message}
            </p>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
            <div className="flex flex-col gap-8">
              <div className="relative">
                <label htmlFor="email">Username</label>
                <input
                  id="username"
                  {...register('username')}
                  className="h-10 border rounded-lg w-full pl-2"
                />
                <p className="text-red-500 absolute">
                  {errors?.username?.message}
                </p>
              </div>
              <div className="relative">
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="h-10 border rounded-lg w-full pl-2"
                />
                <p className="text-red-500 absolute">
                  {errors?.email?.message}
                </p>
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
                  {errors?.password?.message}
                </p>
              </div>
              <div className="relative">
                <label htmlFor="password">Confirm password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  {...register('confirmPassword')}
                  className="h-10 border rounded-lg w-full pl-2"
                />
                <p className="text-red-500 absolute">
                  {errors?.confirmPassword?.message}
                </p>
              </div>
            </div>
            <button
              className="bg-yellow-500 w-full mt-10 py-2 rounded-lg text-white hover:bg-yellow-600"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Register'}
            </button>
          </form>
          <p className="text-center mt-5">
            Already have an account?
            <Link to="/auth/login" className="text-yellow-600 ml-1">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
