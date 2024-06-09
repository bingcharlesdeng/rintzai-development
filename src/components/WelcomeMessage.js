import React from 'react';
import "./WelcomeMessage.css";
const WelcomeMessage = ({ user }) => {
  const userName = user.displayName || user.email || 'Guest';

  return (
    <h1>Welcome back, {userName}</h1>
  );
};

export default WelcomeMessage;