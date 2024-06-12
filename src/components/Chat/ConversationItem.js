import React from 'react';
import { formatRelativeTime } from './utils';
import './conversationItem.css';

const ConversationItem = ({ conversation, onSelectConversation, isSelected, getParticipantNames, loggedInUser }) => {
  const handleClick = () => onSelectConversation(conversation);

  // Extract conversation details
  const { avatarUrl, lastMessage, unreadCount, lastMessageTimestamp } = conversation;
  const participantNames = getParticipantNames(conversation);

  return (
    <li className={`conversation-item ${isSelected ? 'active' : ''}`} onClick={handleClick}>
      <div className="conversation-avatar">
        {avatarUrl ? (
          <img src={avatarUrl} alt="Participant Avatar" />
        ) : (
          <div className="default-avatar">{participantNames.charAt(0).toUpperCase()}</div>
        )}
      </div>
      <div className="conversation-details">
        <div className="conversation-name">{participantNames}</div>
        <div className="conversation-last-message">
          <span className="last-message-text">{lastMessage}</span>
          <span className="last-message-timestamp">{formatRelativeTime(lastMessageTimestamp)}</span>
        </div>
      </div>
      {unreadCount > 0 && <div className="unread-count">{unreadCount}</div>}
    </li>
  );
};

export default ConversationItem;