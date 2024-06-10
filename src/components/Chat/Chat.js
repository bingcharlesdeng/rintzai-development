// Chat.js
import React, { useState, useEffect } from 'react';
import ChatWindow from './ChatWindow';
import ConversationList from './ConversationList';
import ChatInput from './ChatInput';
import UserSearch from './UserSearch';
import NewChatModal from './NewChatModal';
import { sendMessage, fetchConversationsForUser, createNewConversation } from './messageService';
import { db, collection, query, where, orderBy, onSnapshot } from '../../firebase';
import './chat.css';

const Chat = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);


  const loggedInUser = {
    id: 'charles',
    name: 'Charles',
    // Add other user properties if needed
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'conversations'), (snapshot) => {
      const updatedConversations = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setConversations(updatedConversations);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleNewChat = () => {
    setIsNewChatModalOpen(true);
  };

  const handleCloseNewChatModal = () => {
    setIsNewChatModalOpen(false);
  };
  
  const handleStartChat = async (selectedUser) => {
    // ... (create a new conversation with the selected user)
    setIsNewChatModalOpen(false);
    // ... (navigate back to the main chat screen and select the new conversation)
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  const handleSendMessage = (message) => {
    if (selectedConversation) {
      sendMessage(message, selectedConversation.id, loggedInUser.id)
        .catch((error) => {
          console.error('Error sending message:', error);
        });
    }
  };

  const handleSelectUser = async (user) => {
    const existingConversation = conversations.find((conversation) =>
      conversation.participants.includes(user.id) && conversation.participants.includes(loggedInUser.id)
    );

    if (existingConversation) {
      setSelectedConversation(existingConversation);
    } else {
      try {
        const newConversation = await createNewConversation(user.id, loggedInUser.id);
        setSelectedConversation(newConversation);
      } catch (error) {
        console.error('Error creating new conversation:', error);
      }
    }
  };

  return (
    <div className="chat-app">
      <div className="sidebar">
      <button className="new-chat-button" onClick={handleNewChat}>New Chat</button>
      {isNewChatModalOpen && (
      <NewChatModal onClose={handleCloseNewChatModal} onStartChat={handleStartChat} />
    )}

        <UserSearch onSelectUser={handleSelectUser} />
        <ConversationList
          conversations={conversations}
          onSelectConversation={handleSelectConversation}
          selectedConversation={selectedConversation}
          loggedInUser={loggedInUser}
        />
      </div>
      <div className="chat-area">
        {selectedConversation ? (
          <>
            <ChatWindow selectedConversation={selectedConversation} loggedInUser={loggedInUser} />
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