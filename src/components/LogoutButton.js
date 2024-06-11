import React from 'react';
import { useUserContext } from './UserContext'; // Import useUserContext hook
import { handleLogout } from './Logout'; // Import handleLogout function
import { getAuth } from 'firebase/auth'; // Import getAuth from firebase/auth

const LogoutButton = () => {
  const { isLoggedIn, logout } = useUserContext(); // Get isLoggedIn and logout from context
  const auth = getAuth(); // Get Firebase Auth instance

  if (!isLoggedIn) return null; // Don't render if not logged in

  const handleLogoutClick = async () => {
    try {
      await handleLogout(auth); // Call handleLogout with auth instance
      logout(); // Call logout from context to update state
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle logout errors (e.g., display error message to user)
    }
  };

  return (
    <button className="logout-button" onClick={handleLogoutClick}>
      Logout
    </button>
  );
};

export default LogoutButton;