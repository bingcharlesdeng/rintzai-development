import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import WelcomeMessage from './WelcomeMessage';
import FeatureSection from './FeatureSection';
import QuoteSection from './QuoteSection';
import LogoutButton from './LogoutButton';
import AnimatedArt from './AnimatedArt';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './UserContext'; // Import useUserContext hook

import './home.css';

const Home = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useUserContext(); // Get user, isLoggedIn, and logout from context

  useEffect(() => {
    const handleLogoutIfNeeded = () => {
      if (!isLoggedIn) {
        navigate('/login');
      }
    };

    handleLogoutIfNeeded();
  }, [isLoggedIn, navigate]);

  const handleLogoutClick = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle logout errors (e.g., display error message to user)
    }
  };

  return (
    <Layout>
      <div className="home-container">
        <WelcomeMessage user={user} />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <FeatureSection />
          <QuoteSection />
          <LogoutButton isLoggedIn={isLoggedIn} onLogout={handleLogoutClick} />
        </div>
        <AnimatedArt />
      </div>
    </Layout>
  );
};

export default Home;