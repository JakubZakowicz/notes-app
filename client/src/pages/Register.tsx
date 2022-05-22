import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import axios from 'axios';
import * as Yup from 'yup';

interface RegisterInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = Yup.object({
  username: Yup.string().required('Username is required!').min(3).max(48),
  email: Yup.string()
    .email('Invalid email!')
    .required('Email address is required!'),
  password: Yup.string().required('Password is required!').min(8),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match!'
  ),
});

const Register: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { mutate, isLoading, isError, error } = useMutation<
    Response,
    Error,
    RegisterInputs
  >(
    async data =>
      await axios.post('http://localhost:1337/api/auth/local/register', data),
    {
      onSuccess: () => navigate('/auth/login'),
      onError: error => console.log(error),
    }
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInputs>({
    reValidateMode: 'onSubmit',
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<RegisterInputs> = data => {
    mutate(data);
  };

  if (isError) return <h1>{error?.message}</h1>;

  return (
    <div className="container mx-auto">
      <div className="flex justify-center h-screen items-center">
        <div className="bg-white border w-96 rounded-xl px-10 py-5 shadow-lg">
          <h1 className="text-3xl font-semibold text-center">Register</h1>
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
              Register
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
