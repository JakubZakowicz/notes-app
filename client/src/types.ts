import { RouteProps } from 'react-router-dom'

export interface LoginInputs {
  email: string;
  password: string;
}

export interface RegisterInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface PrivateRouteProps extends RouteProps {}