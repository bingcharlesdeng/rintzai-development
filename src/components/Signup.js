import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './UserContext';
import './signup.css';

const Signup = () => {
  const auth = getAuth();
  const { login } = useUserContext();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: name });

      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setError(null);

      login({ uid: user.uid, displayName: user.displayName, email: user.email });
      navigate('/home');
    } catch (error) {
      console.error("error is logged when trying to login to home", error);
      setError(error.message || 'Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup-container">
    <div className="signup-card">
    <img src="logo.png" alt="Logo" className="logo" />
    <h2 className="signup-title">Sign Up</h2>
    <form onSubmit={handleSubmit} className="signup-form">
    <div className="form-group">
    <label htmlFor="name" className="form-label">Name:</label>
    <input
    type="text"
    id="name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    className="form-input"
    />
    </div>
    <div className="form-group">
    <label htmlFor="email" className="form-label">Email:</label>
    <input
    type="email"
    id="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className="form-input"
    />
    </div>
    <div className="form-group">
    <label htmlFor="password" className="form-label">Password:</label>
    <input
    type="password"
    id="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="form-input"
    />
    </div>
    <div className="form-group">
    <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
    <input
    type="password"
    id="confirmPassword"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    className="form-input"
    />
    </div>
    <button type="submit" className="signup-button">Sign Up</button>
    {error && <p className="error">{error}</p>}
    </form>
    </div>
    </div>
    );
    };
    export default Signup;
    