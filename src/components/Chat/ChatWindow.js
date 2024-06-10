import React, { useEffect, useRef } from 'react';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import './chatWindow.css';

const ChatWindow = ({ selectedConversation, loggedInUser }) => {
  const [messages, setMessages] = React.useState([]);
  const messageListRef = useRef(null);

  useEffect(() => {
    if (selectedConversation) {
      console.log(selectedConversation, "selected Conversation");
      const messagesQuery = query(
        collection(db, 'messages'),
        where('conversationId', '==', selectedConversation.id),
        orderBy('timestamp', 'asc')
      );
      console.log(messagesQuery, "messageQuery");
      

      const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(fetchedMessages, "fetchedMessages");
        setMessages(fetchedMessages);
      });

      return () => {
        unsubscribe();
      };
    } else {
      console.log("or else");
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
        {console.log("messages", messages)}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.senderId === loggedInUser.id ? 'sent' : 'received'}`}
          >
            <div className="message-content">{message.content}</div>
            <div className="message-timestamp">
              {message.timestamp ? new Date(message.timestamp.toDate()).toLocaleString() : ''}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;