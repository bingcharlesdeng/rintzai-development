import React, { useState } from 'react';
import { db, collection, getDocs, query, where, orderBy } from '../../firebase';

const ConversationSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (e) => {
    const term = e.target.value;
    console.log('Search term:', term);
    setSearchTerm(term);

    try {
      const messagesRef = collection(db, 'messages');
      const q = query(
        messagesRef,
        where('content', '>=', term),
        where('content', '<=', `${term}\uf8ff`),
        orderBy('timestamp', 'asc')
      );
      const querySnapshot = await getDocs(q);
      const matchingMessages = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log('Matching messages:', matchingMessages);

      const conversationIds = matchingMessages.map((message) => message.conversationId);
      console.log('Conversation IDs:', conversationIds);
      onSearch(conversationIds);
    } catch (error) {
      console.error('Error searching messages:', error);
      // Handle error (e.g., display error message to user)
    }
  };

  return (
    <div className="conversation-search">
      <input
        type="text"
        placeholder="Search conversations..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default ConversationSearch;