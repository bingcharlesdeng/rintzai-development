// ConversationList.js
import React, { useState, useEffect } from 'react';
import './conversationList.css';
import Fuse from 'fuse.js';
import { formatRelativeTime } from './utils';

const ConversationList = ({ conversations, onSelectConversation, selectedConversation, loggedInUser }) => {
  const [filteredConversations, setFilteredConversations] = useState(conversations);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredConversations(conversations);
    } else {
      const fuse = new Fuse(conversations, {
        keys: ['participants'],
        threshold: 0.3,
      });
      const results = fuse.search(searchTerm);
      setFilteredConversations(results.map(result => result.item));
    }
  }, [searchTerm, conversations]);

  const renderParticipantNames = (participantNames) => {
    if (!participantNames || !Array.isArray(participantNames)) {
      return 'No participants';
    }

    const otherParticipants = participantNames.filter(name => name !== loggedInUser.name);
    return otherParticipants.join(', ');
  };

  return (
    <div className="conversation-list-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search conversations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul className="conversation-list">
        {filteredConversations.map((conversation) => (
          <li
            key={conversation.id}
            onClick={() => onSelectConversation(conversation)}
            className={`conversation-item ${selectedConversation?.id === conversation.id ? 'active' : ''}`}
          >
            <div className="conversation-avatar">
              {conversation.avatarUrl ? (
                <img src={conversation.avatarUrl} alt="Avatar" />
              ) : (
                <div className="default-avatar">
                  {renderParticipantNames(conversation.participants).charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="conversation-details">
              <div className="conversation-name">{renderParticipantNames(conversation.participants)}</div>
              <div className="conversation-last-message">
                {conversation.lastMessage}
              </div>
            </div>
            <div className="conversation-meta">
              <div className="conversation-timestamp">
                {conversation.lastMessageTimestamp ? formatRelativeTime(conversation.lastMessageTimestamp) : ''}
              </div>
              {conversation.unreadCount > 0 && (
                <div className="unread-count">{conversation.unreadCount}</div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationList;