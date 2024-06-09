import React from 'react';
import { Link } from 'react-router-dom';
import "./FeatureSection.css";

const FeatureSection = () => {
  return (
    <div className="feature-buttons">
      <Link to="/mood-tracker">Mood Tracker</Link>
      <Link to="/journal">Journal</Link>
      <Link to="/chat">Chat</Link>
      <Link to="/quotes">Quotes</Link>
    </div>
  );
};

export default FeatureSection;
