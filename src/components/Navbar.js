import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Navbar = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Go back one page in history
  };

  return (
    <nav>
      <div className="nav-container">
        <h1 className="logo">Rintzai</h1>
        <button onClick={handleGoBack} disabled={window.location.pathname === '/'}>Go Back</button>
      </div>
    </nav>
  );
};

export default Navbar;
