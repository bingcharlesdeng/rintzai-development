import React from 'react';

const ChatMessage = ({ message }) => {
  // Extract message content, sender, timestamp (replace with your data structure)
  const { content, sender, timestamp } = message;

  return (
    <div className="chat-message">
      <p>{content}</p>
      {/* Optionally display sender and timestamp */}
      {/* <p>Sent by: {sender} at {timestamp}</p> */}
    </div>
  );
};

export default ChatMessage;
