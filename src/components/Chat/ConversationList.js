import React, { useState, useEffect } from 'react';
import './conversationList.css';
import { formatDistanceToNow } from 'date-fns'; // Import date-fns for time formatting
import Fuse from 'fuse.js';

const ConversationList = ({ conversations, onSelectConversation, selectedConversation }) => {
  const [filteredConversations, setFilteredConversations] = useState(conversations);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredConversations(conversations); // If search term is empty, show all conversations
    } else {
      const fuse = new Fuse(conversations, {
        keys: ['participantNames'],
        threshold: 0.3, // Adjust this threshold as needed
      });
      const results = fuse.search(searchTerm);
      setFilteredConversations(results.map(result => result.item));
    }
  }, [searchTerm, conversations]);

  return (
    <div className="conversation-list-container">
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
        />
      </div>
      <ul>
        {filteredConversations.map((conversation) => (
          <li
            key={conversation.id}
            onClick={() => onSelectConversation(conversation)}
            className={`conversation-item ${selectedConversation?.id === conversation.id ? 'active' : ''}`}
          >
            <div className="avatar">{conversation.avatarUrl ? (
              <img src={conversation.avatarUrl} alt="Avatar" />
            ) : (
              conversation.participantNames.map(name => name.charAt(0)).join('')
            )}</div>
            <div className="conversation-details">
              <div className="name">{conversation.participantNames.join(', ')}</div>
              <div className="last-message">
                {conversation.lastMessage
                  ? `${conversation.lastMessage.slice(0, 20)}${conversation.lastMessage.length > 20 ? '...' : ''}`
                  : 'No messages yet'}
              </div>
              <div className="timestamp">
                {conversation.lastMessageTimestamp && formatDistanceToNow(conversation.lastMessageTimestamp.toDate(), { addSuffix: true })}
              </div>
            </div>
            {conversation.unreadCount > 0 && (
              <div className="unread-count">{conversation.unreadCount}</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationList;
