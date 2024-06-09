import React, {useState} from 'react';
import ChatWindow from './ChatWindow';
import ConversationList from './ConversationList';
import ChatInput from './ChatInput';
import "./chat.css";

const messages = [
  // Sample message data
  { id: 1, content: 'Hello!', senderName: 'John Doe', isSent: true },
  { id: 2, content: 'Hi there!', senderName: 'Jane Smith', isSent: false },
];

const conversations = [
  // Sample conversation data
  { id: 1, participantNames: ['John Doe'], avatarUrl: 'https://.../avatar.png', lastMessage: 'Hi!', unreadCount: 1 },
  { id: 2, participantNames: ['Jane Smith', 'Alice Lee'], lastMessage: 'See you tomorrow!', unreadCount: 0 },
];

const Chat = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  const handleSendMessage = (message) => {
    // Handle sending message logic (update messages state, etc.)
    console.log('Sending message:', message);
  };

  return (
    <div className="chat-app">
      <div className="sidebar">
        <ConversationList 
          conversations={conversations} 
          onSelectConversation={handleSelectConversation}
          selectedConversation={selectedConversation}
        />
      </div>
      <div className="chat-area">
        {selectedConversation ? ( // Conditional rendering
          <>
            <ChatWindow messages={messages} selectedConversation={selectedConversation} />
            <ChatInput onSendMessage={handleSendMessage} />
          </>
        ) : (
          <div className="no-chat-selected">Select a conversation to start chatting</div>
        )}
      </div>
    </div>
  );
};

export default Chat;
