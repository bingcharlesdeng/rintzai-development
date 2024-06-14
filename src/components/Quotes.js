import React, { useState, useEffect } from 'react';
import './quotes.css';

const quotes = [
  { quote: 'The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.', author: 'Helen Keller' },
  { quote: 'Hold onto the dreams that make your heart smile.', author: 'Unknown' },
  // Add more quotes here
  ];
  const DailyQuote = () => {
  const [currentQuote, setCurrentQuote] = useState(null);
  useEffect(() => {
  // Pick a random quote on component mount
  const randomIndex = Math.floor(Math.random() * quotes.length);
  setCurrentQuote(quotes[randomIndex]);
  }, []);
  return (
  <div className="daily-quote-container">
  <h2 className="daily-quote-title">Daily Inspiration</h2>
  {currentQuote && (
  <div>
  <p className="quote">{currentQuote.quote}</p>
  <p className="quote-author">- {currentQuote.author}</p>
  </div>
  )}
  </div>
  );
  };
  export default DailyQuote;