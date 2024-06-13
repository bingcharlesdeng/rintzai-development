import { db, doc, setDoc } from '../firebase';

const createUserInDB = async (user) => {
  try {
    const userRef = doc(db, 'users', user.uid);
    const userData = {
      userId: user.uid,
      email: user.email,
      name: user.displayName || '', // Use an empty string if displayName is not available
    };

    await setDoc(userRef, userData, { merge: true });
    console.log('User created in database:', userData);
  } catch (error) {
    console.error('Error creating user in database:', error);
  }
};

export { createUserInDB };