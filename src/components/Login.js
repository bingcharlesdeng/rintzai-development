import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth'; // Import Firebase Auth

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Removed from state (handled in useEffect)
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const auth = getAuth(); // Initialize Firebase Auth instance

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user); // Update login state based on user object
    });

    return unsubscribe; // Cleanup function to prevent memory leaks
  }, [auth]); // Dependency array to run effect only on auth change

  const handleGoogleSignIn = async () => {
    setError(null); // Clear any previous errors

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Handle successful login (optional backend interaction)
      console.log('Logged in with Google:', user);
      sessionStorage.setItem('isLoggedIn', true); // Store login state
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/home'); // Redirect to home page
    } catch (error) {
      console.error('Google Sign-In error:', error);
      setError('An error occurred during Google Sign-In. Please try again.');
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(null); // Clear any previous errors

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Handle successful login (optional backend interaction)
      console.log('Logged in with email/password:', user);
      sessionStorage.setItem('isLoggedIn', 'true'); // Store login state
      navigate('/home'); // Redirect to home page
      localStorage.setItem('user', JSON.stringify(user)); // Store user data
    } catch (error) {
      console.error('Email/Password Login error:', error);
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h1>Mental Wellness App</h1>
      <button onClick={handleGoogleSignIn} className="login-button animate__animated animate__bounce">
        Sign in with Google
      </button>
      <form onSubmit={handleEmailLogin}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-button animate__animated animate__bounce">
          Login with Email/Password
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <p>Don't have an account? <Link to="/signup">Register</Link> </p>
    </div>
  );
};

export default Login;
