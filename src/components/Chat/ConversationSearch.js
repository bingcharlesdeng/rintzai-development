import React, { useState } from 'react';

const ConversationSearch = ({ onSearch, onNewChat }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <div className="conversation-search">
      <input
        type="text"
        placeholder="Search conversations..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <button onClick={onNewChat}>New Chat</button>
    </div>
  );
};

export default ConversationSearch;