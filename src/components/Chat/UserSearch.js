import React, { useState } from 'react';
import { searchUsers } from './userService';

const UserSearch = ({ onSelectUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const results = await searchUsers(searchTerm);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  return (
    <div className="user-search">
      <input
        type="text"
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul className="search-results">
        {searchResults.map((user) => (
          <li key={user.id} onClick={() => onSelectUser(user)}>
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSearch;