import React, { FC } from 'react';
import { Navigate, RouteProps, Outlet } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {}

const PrivateRoute: FC<PrivateRouteProps> = () => {
  return localStorage.getItem('jwt') ? (
    <Outlet />
  ) : (
    <Navigate to="/auth/login" />
  );
};

export default PrivateRoute;
