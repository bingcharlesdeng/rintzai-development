import React, { useState, useEffect } from 'react';
import './conversationList.css';
import Fuse from 'fuse.js';

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
    if (otherParticipants.length === 0) {
      return 'No messages yet';
    } else if (otherParticipants.length === 1) {
      return otherParticipants[0];
    } else {
      return `${otherParticipants[0]}, ${otherParticipants.length - 1} others`;
    }
  };

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
            <div className="avatar">
              {conversation.avatarUrl ? (
                <img src={conversation.avatarUrl} alt="Avatar" />
              ) : (
                renderParticipantNames(conversation.participants).charAt(0).toUpperCase()
              )}
            </div>
            <div className="conversation-details">
              <div className="name">{renderParticipantNames(conversation.participants)}</div>
              <div className="last-message">
                {conversation.lastMessage
                  ? `${conversation.lastMessage.slice(0, 20)}${conversation.lastMessage.length > 20 ? '...' : ''}`
                  : 'No messages yet'}
              </div>
              <div className="timestamp">
                {conversation.lastMessageTimestamp && new Date(conversation.lastMessageTimestamp.toDate()).toLocaleString()}
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