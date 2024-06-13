import React, { useState, useEffect } from 'react';
import { formatRelativeTime } from './utils';
import './conversationItem.css';
import { db, collection, doc, getDoc } from '../../firebase';

const ConversationItem = ({ conversation, onSelectConversation, isSelected, loggedInUser }) => {
  const [participantName, setParticipantName] = useState('');

  useEffect(() => {
    const fetchParticipantName = async () => {
      // Get the participant that is not the logged-in user
      const otherParticipant = conversation.participants.find((participantId) => participantId !== loggedInUser.uid);

      if (otherParticipant) {
        // Fetch the user document with the matching ID
        const userDoc = await getDoc(doc(db, 'users', otherParticipant));

        if (userDoc.exists()) {
          // Get the name of the other participant
          const userData = userDoc.data();
          
          setParticipantName(userData.name);
        }
        
      }

      else{
        console.log(loggedInUser.name, "else loggedInUser");
        setParticipantName(loggedInUser.displayName);
      }
    };

    fetchParticipantName();
  }, [conversation.participants, loggedInUser.uid]);

  const handleClick = () => onSelectConversation(conversation);

  // Extract conversation details
  const { avatarUrl, lastMessage, unreadCount, lastMessageTimestamp } = conversation;

  return (
    <li className={`conversation-item ${isSelected ? 'active' : ''}`} onClick={handleClick}>
      <div className="conversation-avatar">
        {avatarUrl ? (
          <img src={avatarUrl} alt="Participant Avatar" />
        ) : (
          <div className="default-avatar">{participantName?.charAt(0).toUpperCase()}</div>
        )}
      </div>
      <div className="conversation-details">
        <div className="conversation-name">{participantName}</div>
        <div className="conversation-last-message">
          <span className="last-message-text">{lastMessage}</span>
          <span className="last-message-timestamp">{formatRelativeTime(lastMessageTimestamp)}</span>
        </div>
      </div>
      {unreadCount > 0 && <div className="unread-count">{unreadCount}</div>}
    </li>
  );
};

export default ConversationItem;