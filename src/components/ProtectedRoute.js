import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import UserContext from './UserContext';

const ProtectedRoute = () => {
  const { isLoggedIn } = useContext(UserContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;