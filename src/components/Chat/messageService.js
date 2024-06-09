import { db, collection, getDocs, query, where, writeBatch } from '../../firebase'; // Assuming relative path

const fetchMessages = async (conversationId) => {
  const messagesRef = collection(db, 'messages');
  const q = query(messagesRef, where('conversationId', '==', conversationId));
  const querySnapshot = await getDocs(q);
  const fetchedMessages = [];
  querySnapshot.forEach((doc) => {
    fetchedMessages.push({ id: doc.id, ...doc.data() });
  });
  return fetchedMessages;
};

const sendMessage = async (message, conversationId) => {
  try {
    const batch = writeBatch(db);
    const messagesRef = collection(db, 'messages');

    const newMessage = {
      content: message,
      conversationId,
      timestamp: Date.now(), // Use server timestamp
      // Add other message properties if needed (e.g., sender)
    };

    batch.set(messagesRef.doc(), newMessage);
    await batch.commit();
    console.log('Message sent!'); 
    return true;// Consider returning a success message or promise
  } catch (error) {
    console.error('Error sending message:', error);
    return false;
  }
};

export { fetchMessages, sendMessage };
