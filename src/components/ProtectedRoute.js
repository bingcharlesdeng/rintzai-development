import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from './UserContext';

const ProtectedRoute = () => {
  const { isLoggedIn, isLoading } = useUserContext();

  if (isLoading) {
    return;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;