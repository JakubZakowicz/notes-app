import React from 'react';
import { useLogout } from '../services/auth';
import { LayoutProps } from '../types';

const Layout: React.FC<LayoutProps> = ({
  children,
}) => {
  const logout = useLogout();
  return (
    <div className="container mx-auto relative">
      <div className=""></div>
      <button
        className="absolute right-0 bg-yellow-500 hover:bg-yellow-600 text-xl text-white rounded-xl py-2 px-4"
        onClick={logout}
      >
        Logout
      </button>
      <h1 className="text-5xl text-center font-bold my-10">Notes</h1>
      {children}
    </div>
  );
};

export default Layout;
