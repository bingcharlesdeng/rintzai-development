import { db, collection, getDocs, query, where, addDoc, serverTimestamp, orderBy, doc, updateDoc } from '../../firebase';


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

const sendMessage = async (message, conversationId, senderId) => {
  try {
    const messagesRef = collection(db, 'messages');
    const newMessage = {
      conversationId,
      senderId,
      content: message,
      timestamp: serverTimestamp(),
    };
    await addDoc(messagesRef, newMessage);

    const conversationRef = doc(db, 'conversations', conversationId);
    await updateDoc(conversationRef, {
      lastMessage: message,
      lastMessageTimestamp: serverTimestamp(),
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


export { fetchMessages, sendMessage, fetchConversationsForUser };