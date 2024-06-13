import { db, collection, getDocs, query, where } from '../../firebase';

const searchUsers = async (searchTerm) => {
  const usersRef = collection(db, 'users');
  const q = query(
    usersRef,
    where('name', '>=', searchTerm),
    where('name', '<=', searchTerm + '\uf8ff')
  );
  const querySnapshot = await getDocs(q);
  const users = [];
  querySnapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() });
  });
  return users;
};

export { searchUsers };