import * as Yup from 'yup';

export const loginSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email!')
    .required('Email address is required!'),
  password: Yup.string().required('Password is required!'),
});

export const registerSchema = Yup.object({
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