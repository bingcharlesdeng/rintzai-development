import React from 'react';
import { formatRelativeTime } from './utils';

const ChatMessage = ({ message, loggedInUser }) => {
  const { content, senderId, timestamp } = message;
  const isSentByLoggedInUser = senderId === loggedInUser.uid;

  return (
    <div className={`message ${isSentByLoggedInUser ? 'sent' : 'received'}`}>
      <div className="message-content">{content}</div>
      <div className="message-timestamp">
        {timestamp ? formatRelativeTime(timestamp) : ''}
      </div>
    </div>
  );
};

export default ChatMessage;