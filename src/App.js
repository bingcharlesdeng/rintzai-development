import React from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import Home from './components/Home';
import Journal from './components/Journal/Journal';
import MoodTracker from './components/MoodTracker';
import Chat from './components/Chat/Chat';
import DailyQuote from './components/Quotes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './components/UserContext';
import ProtectedRoute from './components/ProtectedRoute';

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
const auth = getAuth(app);
const database = getDatabase(app);
const db = getFirestore(app);

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="journal" element={<Journal />} />
            <Route path="mood-tracker" element={<MoodTracker />} />
            <Route path="chat" element={<Chat />} />
            <Route path="quotes" element={<DailyQuote />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;