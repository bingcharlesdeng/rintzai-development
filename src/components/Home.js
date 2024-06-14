import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './UserContext';
import Layout from './Layout';
import WelcomeMessage from './WelcomeMessage';
import FeatureSection from './FeatureSection';
import QuoteSection from './QuoteSection';
import AnimatedArt from './AnimatedArt';
import './home.css';

const Home = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useUserContext();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const handleLogoutClick = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
      <div className="home-container">
        <header className="header">
          <img src="logo.png" alt="Logo" className="logo" />
          <div className="nav-buttons">
            <button className="nav-button" onClick={() => navigate(-1)} disabled={window.location.pathname === '/'}>
              Go Back
            </button>
            {isLoggedIn && (
              <button className="nav-button" onClick={handleLogoutClick}>
                Logout
              </button>
            )}
          </div>
        </header>
        <main className="content">
          <WelcomeMessage user={user} />
          <FeatureSection />
          <QuoteSection />
        </main>
      </div>
  );
};

export default Home;