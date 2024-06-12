import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { useUserContext } from './UserContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useUserContext();

  const auth = getAuth();

  const handleGoogleSignIn = async () => {
    setError(null);

    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      login({ uid: user.uid, displayName: user.displayName, email: user.email });
      navigate('/home');
    } catch (error) {
      console.error('Google Sign-In error:', error);
      setError('An error occurred during Google Sign-In. Please try again.');
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      login({ uid: user.uid, displayName: user.displayName, email: user.email });
      navigate('/home');
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
      <p>
        Don't have an account? <Link to="/signup">Register</Link>
      </p>
    </div>
  );
};

export default Login;