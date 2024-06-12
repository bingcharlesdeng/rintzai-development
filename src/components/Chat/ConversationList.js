import React, { useState, useEffect } from 'react';
import './conversationList.css';
import Fuse from 'fuse.js';
import { formatRelativeTime } from './utils';
import { db, collection, getDocs, query, where } from '../../firebase';
import ConversationItem from './ConversationItem';

const ConversationList = ({ conversations, onSelectConversation, selectedConversation, loggedInUser }) => {
  const [filteredConversations, setFilteredConversations] = useState(conversations);
  const [searchTerm, setSearchTerm] = useState('');
  const [participantNames, setParticipantNames] = useState({});

  useEffect(() => {
    const fetchParticipantNames = async () => {
      const participantIds = conversations.reduce((ids, conversation) => [...ids, ...conversation.participants], []);
      const uniqueParticipantIds = [...new Set(participantIds)];

      const usersRef = collection(db, 'users');
      const userDocs = await Promise.all(
        uniqueParticipantIds.map((userId) => getDocs(query(usersRef, where('userId', '==', userId))))
      );

      const names = {};
      userDocs.forEach((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          names[doc.data().userId] = doc.data().name;
        });
      });

      setParticipantNames(names);
    };

    fetchParticipantNames();
  }, [conversations]);

  useEffect(() => {
    console.log('Conversations changed:', conversations);
    if (searchTerm.trim() === '') {
      setFilteredConversations(conversations);
    } else {
      const fuse = new Fuse(conversations, {
        keys: ['lastMessage'],
        threshold: 0.1,
      });
      const results = fuse.search(searchTerm);
      console.log('Fuse search results:', results);
      setFilteredConversations(results.map(result => result.item));
    }
  }, [searchTerm, conversations]);

  const getParticipantNames = (conversation) => {
    const names = conversation.participants
      .map((participantId) => participantNames[participantId])
      .filter((name) => name !== loggedInUser.name);
    return names.join(', ');
  };

  return (
    <div className="conversation-list-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search conversations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <ul className="conversation-list">
        {filteredConversations.map((conversation) => (
          <ConversationItem
            key={conversation.id}
            conversation={conversation}
            onSelectConversation={onSelectConversation}
            isSelected={selectedConversation?.id === conversation.id}
            getParticipantNames={getParticipantNames}
            loggedInUser={loggedInUser}
          />
        ))}
      </ul>
    </div>
  );
};

export default ConversationList;