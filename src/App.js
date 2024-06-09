import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import Home from './components/Home';
import Journal from './components/Journal'; // Import Journal component
import MoodTracker from './components/MoodTracker'; // Import MoodTracker component
import Chat from './components/Chat/Chat';
import DailyQuote from './components/Quotes';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Import components from React Router DOM
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJ01FLhx02bbSNDc9-9zzW1oI2paG1Bkw",
  authDomain: "rintzai.firebaseapp.com",
  projectId: "rintzai",
  storageBucket: "rintzai.appspot.com",
  messagingSenderId: "876261149307",
  appId: "1:876261149307:web:f5989c05cb26e7ce02b0de",
  measurementId: "G-QTYQMGGG0L"
};



const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get auth instance from the app
const database = getDatabase(app);
const db = getFirestore(app);


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Check authentication state on component mount and updates
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setIsLoggedIn(!!currentUser); // Set logged in state based on user object
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup function to prevent memory leaks
  }, [auth]); // Dependency array: re-run on auth changes

  const handleLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setIsLoggedIn(true);
      setUser(user);
      console.log("user at handlelogin",user);
    } catch (error) {
      console.error('Login error:', error);
      // Handle login errors (e.g., display error message to user)
    }
  };

  const handleLogout = () => {
    auth.signOut();
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <BrowserRouter>  {/* Wrap your app with BrowserRouter */}
        {/* Login/Signup displayed if not logged in */}
       
          <Routes>  {/* Use Routes instead of nested components */}
            <Route path="/" element={<Home />} />  {/* Route for Home */}
            <Route path="/journal" element={<Journal user={user}/>} />  {/* Route for Journal */}
            <Route path="/mood-tracker" element={<MoodTracker user={user} />} />  {/* Route for Mood Tracker */}
           <Route path="chat" element={<Chat user={user} />} />
           <Route path="/login" element={<Login />}/>
           <Route path="/home" element={<Home user={user} />} />
           <Route path="/signup" element={<Signup/>}></Route>
           <Route path="/quotes" element ={<DailyQuote/>} /> 
           <Route path="*" element={<Home user={user}/>}/> 

          </Routes>
  
    </BrowserRouter>
  );
};

export default App;
