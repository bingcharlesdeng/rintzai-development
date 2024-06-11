import React from 'react';

const ConversationItem = ({ conversation, onSelectConversation, isSelected, getParticipantNames, loggedInUser }) => {
  const handleClick = () => onSelectConversation(conversation);

  // Extract conversation details
  const { avatarUrl, lastMessage, unreadCount } = conversation;
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
        <div className="conversation-last-message">{lastMessage}</div>
      </div>
      <div className="conversation-meta">
        {unreadCount > 0 && <div className="unread-count">{unreadCount}</div>}
      </div>
    </li>
  );
};

export default ConversationItem;