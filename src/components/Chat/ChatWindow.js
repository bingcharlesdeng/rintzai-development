// ChatWindow.js
import React, { useEffect, useRef, useState } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import './chatWindow.css';
import ChatMessage from './ChatMessage';

const ChatWindow = ({ selectedConversation, loggedInUser }) => {
  const [messages, setMessages] = useState([]);
  const messageListRef = useRef(null);

  useEffect(() => {
    if (selectedConversation) {
      const messagesQuery = query(
        collection(db, 'messages'),
        where('conversationId', '==', selectedConversation.id),
        orderBy('timestamp', 'asc')
      );

      const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(fetchedMessages);
      });

      return () => {
        unsubscribe();
      };
    } else {
      setMessages([]);
    }
  }, [selectedConversation]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-window">
      <div className="message-list" ref={messageListRef}>
        {messages.length > 0 ? (
          messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              loggedInUser={loggedInUser}
            />
          ))
        ) : (
          <div className="empty-chat-placeholder">No messages yet</div>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;