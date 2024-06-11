import React, { useState, useEffect } from 'react';
import './conversationList.css';
import Fuse from 'fuse.js';
import { formatRelativeTime } from './utils';
import { db, collection, getDocs, query, where } from '../../firebase';

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
        keys: ['participantNames'],
        threshold: 0.3,
      });
      const results = fuse.search(searchTerm);
      setFilteredConversations(results.map(result => result.item));
    }
  }, [searchTerm, conversations]);

  const getParticipantNames = (conversation) => {
    const names = conversation.participants
      .map((participantId) => participantNames[participantId])
      .filter((name) => name !== loggedInUser.name);
    return names.join(' ');
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
          <li
            key={conversation.id}
            onClick={() => onSelectConversation(conversation)}
            className={`conversation-item ${selectedConversation?.id === conversation.id ? 'active' : ''}`}
          >
            <div className="conversation-avatar">
              {conversation.avatarUrl ? (
                <img src={conversation.avatarUrl} alt="Avatar" />
              ) : (
                <div className="default-avatar">
                  {getParticipantNames(conversation).charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <div className="conversation-details">
              <div className="conversation-name">{getParticipantNames(conversation)}</div>
              <div className="conversation-last-message">
                {conversation.lastMessage}
              </div>
            </div>
            <div className="conversation-meta">
              <div className="conversation-timestamp">
                {conversation.lastMessageTimestamp ? formatRelativeTime(conversation.lastMessageTimestamp) : ''}
              </div>
              {conversation.unreadCount > 0 && (
                <div className="unread-count">{conversation.unreadCount}</div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConversationList;