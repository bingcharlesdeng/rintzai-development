import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import  UserContext from './UserContext'; // Import the user context

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(UserContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />; // Redirect to login on unauthorized access
  }

  return children || <Outlet />; // Render wrapped component or Outlet for nested routes
};

export default ProtectedRoute;