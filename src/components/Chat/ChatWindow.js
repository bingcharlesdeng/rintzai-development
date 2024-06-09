import React from 'react';
import "./chatWindow.css";
const ChatWindow = ({ messages, selectedConversation }) => {
  const messageListRef = React.createRef();

  React.useEffect(() => {
    // Scroll to the bottom whenever new messages are received or on component mount
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="chat-window">
      <ul ref={messageListRef} className="message-list">
        {messages.length > 0 ? (
          messages.map((message) => (
            <li key={message.id} className={`message ${message.isSent ? 'sent' : 'received'}`}>
              {message.senderName && (
                <div className="message-sender">
                  {message.senderAvatar && <img src={message.senderAvatar} alt="Sender Avatar" />}
                  <span>{message.senderName}</span>
                </div>
              )}
              <div className="message-content">{message.content}</div>
              {message.timestamp && <span className="message-timestamp">{message.timestamp}</span>}
            </li>
          ))
        ) : (
          <div className="empty-chat-placeholder">
            {selectedConversation ? "No messages yet in this conversation. Start typing!" : "Select a conversation to start chatting."}
          </div>
        )}
      </ul>
    </div>
  );
};

export default ChatWindow;
