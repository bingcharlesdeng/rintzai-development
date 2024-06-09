import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize user data
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initialize login state

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', true); // Store login state in localStorage
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn', false); // Remove login state from localStorage
  };

  const value = { user, isLoggedIn, login, logout }; // Context API values

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  
  return context;
};

export default UserContext;
