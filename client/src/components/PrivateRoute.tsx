import React, { FC } from 'react';
import { Navigate, RouteProps, Outlet } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {}

const PrivateRoute: FC<PrivateRouteProps> = () => {
  return localStorage.getItem('token') ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" />
  );
};

export default PrivateRoute;
