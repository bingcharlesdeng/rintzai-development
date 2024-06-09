import React from 'react';

const LogoutButton = ({ isLoggedIn, onLogout }) => {
  if (!isLoggedIn) return null; // Don't render if not logged in

  return (
    <button className="logout-button" onClick={onLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
