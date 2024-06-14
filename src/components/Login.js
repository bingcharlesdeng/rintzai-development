import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { useUserContext } from './UserContext';
import { createUserInDB } from './userService';
import './login.css';

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

      await createUserInDB(user);
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

      await createUserInDB(user);
      login({ uid: user.uid, displayName: user.displayName, email: user.email });
      navigate('/home');
    } catch (error) {
      console.error('Email/Password Login error:', error);
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Mental Wellness App</h1>
        <button onClick={handleGoogleSignIn} className="login-button">
          Sign in with Google
        </button>
        <form onSubmit={handleEmailLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>
          <button type="submit" className="login-button">
            Login with Email/Password
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <p className="signup-text">
          Don't have an account? <Link to="/signup" className="signup-link">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;