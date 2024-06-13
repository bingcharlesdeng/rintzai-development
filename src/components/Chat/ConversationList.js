import React, { useState, useEffect } from 'react';
import './conversationList.css';
import Fuse from 'fuse.js';
import { formatRelativeTime } from './utils';
import { db, collection, getDocs, query, where, orderBy } from '../../firebase';
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
    if (searchTerm.trim() === '') {
      setFilteredConversations(conversations);
    } else {
      const fuse = new Fuse(conversations, {
        keys: ['lastMessage'],
        threshold: 0.1,
      });
      const results = fuse.search(searchTerm);
      setFilteredConversations(results.map(result => result.item));
    }
  }, [searchTerm, conversations]);

  const getParticipantNames = (conversation) => {
    const names = conversation.participants
      .map((participantId) => participantNames[participantId])
      .filter((name) => name !== loggedInUser.name);
    console.log(names, "names");
    console.log(participantNames, "participant object");
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
      <div className="conversation-list-wrapper">
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
    </div>
  );
};

export default ConversationList;