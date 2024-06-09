import React, { useState, useEffect } from 'react';

const quotes = [ // Replace with API integration if needed
  { quote: 'The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.', author: 'Helen Keller' },
  { quote: 'Hold onto the dreams that make your heart smile.', author: "cd" },
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
      <h2>Daily Inspiration</h2>
      {currentQuote && (
        <div>
          <p>{currentQuote.quote}</p>
          <p className="quote-author">- {currentQuote.author}</p>
        </div>
      )}
    </div>
  );
};

export default DailyQuote;
