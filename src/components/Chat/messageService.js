import { db, collection, getDocs, query, where, addDoc, serverTimestamp, orderBy, doc, updateDoc, arrayUnion } from '../../firebase';

// Fetch messages for a conversation
const fetchMessages = async (conversationId) => {
  const messagesRef = collection(db, 'messages');
  const q = query(messagesRef, where('conversationId', '==', conversationId), orderBy('timestamp', 'asc'));
  const querySnapshot = await getDocs(q);
  const fetchedMessages = [];
  querySnapshot.forEach((doc) => {
    fetchedMessages.push({ id: doc.id, ...doc.data() });
  });
  return fetchedMessages;
};

// Send a new message
const sendMessage = async (message, conversationId, senderId, timestamp) => {
  try {
    const messagesRef = collection(db, 'messages');
    const newMessage = {
      conversationId,
      senderId,
      content: message,
      timestamp: timestamp,
    };
    const docRef = await addDoc(messagesRef, newMessage);
    const messageId = docRef.id;

    const conversationRef = doc(db, 'conversations', conversationId);
    await updateDoc(conversationRef, {
      messageIds: arrayUnion(messageId),
      lastMessage: message,
      lastMessageTimestamp: timestamp,
    });

    console.log('Message sent!');
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

const fetchConversationsForUser = async (userId) => {
  const conversationsRef = collection(db, 'conversations');
  const q = query(conversationsRef, where('participants', 'array-contains', userId));
  const querySnapshot = await getDocs(q);
  const fetchedConversations = [];
  querySnapshot.forEach((doc) => {
    fetchedConversations.push({ id: doc.id, ...doc.data() });
  });
  return fetchedConversations;
};

const createNewConversation = async (userId1, userId2) => {
  try {
    const conversationsRef = collection(db, 'conversations');
    const newConversation = {
      participants: [userId1, userId2],
      lastMessage: '',
      lastMessageTimestamp: null,
    };
    const docRef = await addDoc(conversationsRef, newConversation);
    return { id: docRef.id, ...newConversation };
  } catch (error) {
    console.error('Error creating new conversation:', error);
    throw error;
  }
};

export { fetchMessages, sendMessage, fetchConversationsForUser, createNewConversation };