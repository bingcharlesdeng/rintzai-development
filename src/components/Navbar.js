import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './UserContext'; // Import useUserContext hook
import LogoutButton from './LogoutButton'; // Import LogoutButton component

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUserContext(); // Get user from context

  const handleGoBack = () => {
    navigate(-1); // Go back one page in history
  };

  return (
    <nav>
      <div className="nav-container">
        <h1 className="logo">Rintzai</h1>
        <div className="nav-buttons">
          <button onClick={handleGoBack} disabled={window.location.pathname === '/'}>
            Go Back
          </button>
          {user && <LogoutButton />} {/* Render LogoutButton if user is logged in */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;