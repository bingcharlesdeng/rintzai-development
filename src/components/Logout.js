import { signOut } from 'firebase/auth'; // Replace with your authentication library's logout function

export const handleLogout = async (auth) => {  // Pass 'auth' as a parameter
  try {
    await signOut(auth); // Use the provided 'auth' instance

    console.log('Logged out successfully!');

    // Optionally redirect to login page (assuming no react-router-dom)
    window.location.href = '/login'; // Replace '/login' with your actual login route

  } catch (error) {
    console.error('Logout failed:', error);
    // Handle logout errors (e.g., display error message to user)
  }
};
