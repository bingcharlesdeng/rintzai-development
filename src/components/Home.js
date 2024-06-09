import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Layout from './Layout';
import WelcomeMessage from './WelcomeMessage'; // New component
import FeatureSection from './FeatureSection'; // New component
import QuoteSection from './QuoteSection'; // New component (replace with DailyQuote if integrated)
import LogoutButton from './LogoutButton'; // New compon
import AnimatedArt from './AnimatedArt'; // Import the component
import { useNavigate } from 'react-router-dom';

import './home.css';
const Home =  ({ user }) =>  {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initialize to false
  const storedValue = sessionStorage.getItem('isLoggedIn');

  function handleLogoutIfNeeded() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
     
      window.location.href = '/login'; 
    }
  }
  handleLogoutIfNeeded();
  console.log("Handle Logout", isLoggedIn);
  const userData = JSON.parse(localStorage.getItem("user"));
  
 

  useEffect(() => {
    const storedValue = sessionStorage.getItem('isLoggedIn');
    setIsLoggedIn(storedValue === 'true');
    handleLogoutIfNeeded();
    }

  , []);

  const handleLogoutClick = async () => {
    window.location.href = '/login';
    sessionStorage.removeItem('isLoggedIn');
    localStorage.clear(); 
     // Update local state for immediate UI update

    // Optionally redirect to login page (replace with your actual login route)

   
  };

  return (
    
    <Layout>
    <div className="home-container">
      <WelcomeMessage user={userData} />
      <div style={{ position: 'relative', zIndex: 2 }}> {/* Content container with higher z-index */}
        <FeatureSection />
        <QuoteSection />
        <LogoutButton isLoggedIn={isLoggedIn} onLogout={handleLogoutClick} />
      </div>
    </div>
  </Layout>
  );
};

export default Home;
