import { db, collection, getDocs, query, where, orderBy } from '../../firebase';

const fetchConversations = async (userId) => {
  const conversationsRef = collection(db, 'conversations');
  const q = query(
    conversationsRef,
    where('participants', 'array-contains', userId),
    orderBy('lastMessageTimestamp', 'desc')
  );
  const snapshot = await getDocs(q);
  const conversations = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return conversations;
};
export { fetchConversations };