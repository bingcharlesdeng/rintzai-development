import { signOut } from 'firebase/auth';

export const handleLogout = async (auth) => {
  try {
    await signOut(auth);
    console.log('Logged out successfully!');

    // Optionally redirect to login page (assuming no react-router-dom)
    window.location.href = '/login'; // Replace '/login' with your actual login route

  } catch (error) {
    console.error('Logout failed:', error);
    // Handle logout errors (e.g., display error message to user)
  }
};