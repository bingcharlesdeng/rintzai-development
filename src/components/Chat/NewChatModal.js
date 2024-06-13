import React, { useState } from 'react';
import { searchUsers } from './userChatService';
import './newChatModal.css';

const NewChatModal = ({ onClose, onStartChat }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const results = await searchUsers(searchTerm);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching users:', error);
      // Handle error (e.g., display error message to user)
    }
  };

  const handleSelectUser = (user) => {
    onStartChat(user);
    onClose(); // Close the modal after selecting a user
  };

  return (
    <div className="new-chat-modal-overlay">
      <div className="new-chat-modal">
        <h2>New Chat</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name, email, or handle"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <ul className="search-results">
          {searchResults.map((user) => (
            <li key={user.id} onClick={() => handleSelectUser(user)}>
              <div className="user-avatar">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt="User Avatar" />
                ) : (
                  <div className="default-avatar">{user.name.charAt(0).toUpperCase()}</div>
                )}
              </div>
              <div className="user-name">{user.name}</div>
            </li>
          ))}
        </ul>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default NewChatModal;