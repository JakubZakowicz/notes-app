import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { PrivateRouteProps } from '../types'
import { isAuthenticated } from '../utils/auth';

const PrivateRoute: React.FC<PrivateRouteProps> = () => {
  return isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" />
  );
};

export default PrivateRoute;
