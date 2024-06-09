import React from 'react';

const ConversationItem = ({ conversation, onSelectConversation }) => {
  const handleClick = () => onSelectConversation(conversation);

  // Extract conversation details
  const { participantNames, avatarUrl, lastMessage, unreadCount } = conversation;

  // Format participant names (optional)
  const formattedParticipantNames = participantNames ? participantNames.join(', ') : 'Unnamed Conversation';

  return (
    <li className="conversation-item" onClick={handleClick}>
      <div className="conversation-participant">
        {avatarUrl && <img src={avatarUrl} alt="Participant Avatar" />}
        <span>{formattedParticipantNames}</span>
      </div>
      <div className="conversation-preview">
        {lastMessage && <p>{lastMessage}</p>}
        {unreadCount && <span className="unread-count">{unreadCount}</span>}
      </div>
    </li>
  );
};

export default ConversationItem;
