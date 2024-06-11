// Chat.js
import React, { useState, useEffect, useContext } from 'react';
import ChatWindow from './ChatWindow';
import ConversationList from './ConversationList';
import ChatInput from './ChatInput';
import UserSearch from './UserSearch';
import NewChatModal from './NewChatModal';
import { sendMessage, fetchConversationsForUser, createNewConversation } from './messageService';
import { db, collection, onSnapshot, query, where } from '../../firebase';
import './chat.css';
import UserContext from '../UserContext';

const Chat = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchUserConversations = async () => {
      if (user) {
        const conversationsRef = collection(db, 'conversations');
        const q = query(conversationsRef, where('participants', 'array-contains', user.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const updatedConversations = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setConversations(updatedConversations);
        });

        return () => {
          unsubscribe();
        };
      }
    };

    fetchUserConversations();
  }, [user]);

  const handleNewChat = () => {
    setIsNewChatModalOpen(true);
  };

  const handleCloseNewChatModal = () => {
    setIsNewChatModalOpen(false);
  };

  const handleStartChat = async (selectedUser) => {
    try {
      const newConversation = await createNewConversation(user.uid, selectedUser.id);
      setSelectedConversation(newConversation);
      handleCloseNewChatModal();
    } catch (error) {
      console.error('Error creating new conversation:', error);
      // Handle error (e.g., display error message to user)
    }
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  const handleSendMessage = (message) => {
    if (selectedConversation) {
      sendMessage(message, selectedConversation.id, user.uid)
        .catch((error) => {
          console.error('Error sending message:', error);
          // Handle error (e.g., display error message to user)
        });
    }
  };

  const handleSelectUser = async (user) => {
    const existingConversation = conversations.find((conversation) =>
      conversation.participants.includes(user.id) && conversation.participants.includes(user.uid)
    );

    if (existingConversation) {
      setSelectedConversation(existingConversation);
    } else {
      try {
        const newConversation = await createNewConversation(user.id, user.uid);
        setSelectedConversation(newConversation);
      } catch (error) {
        console.error('Error creating new conversation:', error);
        // Handle error (e.g., display error message to user)
      }
    }
  };

  return (
    <div className="chat-app">
      <div className="sidebar">
        <div className="header">
          <h1>Chats</h1>
          <button className="new-chat-button" onClick={handleNewChat}>
            New Chat
          </button>
        </div>
        {isNewChatModalOpen && (
          <NewChatModal onClose={handleCloseNewChatModal} onStartChat={handleStartChat} />
        )}
        <UserSearch onSelectUser={handleSelectUser} />
        <ConversationList
          conversations={conversations}
          onSelectConversation={handleSelectConversation}
          selectedConversation={selectedConversation}
          loggedInUser={user}
        />
      </div>
      <div className="chat-area">
        {selectedConversation ? (
          <>
            <ChatWindow selectedConversation={selectedConversation} loggedInUser={user} />
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