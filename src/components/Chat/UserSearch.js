import React, { useState } from 'react';
import { searchUsers } from './userChatService';
import './userSearch.css';

const UserSearch = ({ onSelectUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const results = await searchUsers(searchTerm);
      setSearchResults(results);
      console.log('Search results:', results);
    } catch (error) {
      console.error('Error searching users:', error);
      // Handle error (e.g., display error message to user)
    }
  };

  return (
    <div className="user-search">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="user-list-container">
        <ul className="search-results">
          {searchResults.map((user) => (
            <li key={user.id} onClick={() => onSelectUser(user)}>
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
      </div>
    </div>
  );
};

export default UserSearch;