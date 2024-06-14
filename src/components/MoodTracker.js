import React, { useState } from 'react';
import Layout from './Layout';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Navigate } from 'react-router-dom';
import { useUserContext } from './UserContext'; // Import useUserContext hook
import './moodTracker.css';

const MoodTracker = () => {
  const { user } = useUserContext(); // Get user from context
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodNotes, setMoodNotes] = useState('');

  const handleMoodSelect = (mood) => setSelectedMood(mood);
  const handleNotesChange = (e) => setMoodNotes(e.target.value);

  const submitMood = async () => {
    if (!selectedMood) return;

    const moodData = {
      mood: selectedMood,
      notes: moodNotes,
      date: new Date().toLocaleDateString(),
      userId: user.uid,
    };

    const moodRef = collection(db, 'moodEntries');
    await addDoc(moodRef, moodData);

    console.log('Mood submitted:', moodData);
    setSelectedMood(null);
    setMoodNotes('');
  };

  if (!user) {
    // Redirect to login if not logged in
    return <Navigate to="/login" replace />;
  }

  // If logged in, render the MoodTracker content
  return (
    <Layout>
      <div className="mood-tracker-container">
        <h2 className="mood-tracker-title">Track your mood</h2>
        <div className="mood-selection">
          <button
            className={`mood-button ${selectedMood === 'happy' ? 'selected' : ''}`}
            onClick={() => handleMoodSelect('happy')}
          >
            Happy
          </button>
          <button
            className={`mood-button ${selectedMood === 'neutral' ? 'selected' : ''}`}
            onClick={() => handleMoodSelect('neutral')}
          >
            Neutral
          </button>
          <button
            className={`mood-button ${selectedMood === 'sad' ? 'selected' : ''}`}
            onClick={() => handleMoodSelect('sad')}
          >
            Sad
          </button>
          <button
            className={`mood-button ${selectedMood === 'angry' ? 'selected' : ''}`}
            onClick={() => handleMoodSelect('angry')}
          >
            Angry
          </button>
          <button
            className={`mood-button ${selectedMood === 'anxious' ? 'selected' : ''}`}
            onClick={() => handleMoodSelect('anxious')}
          >
            Anxious
          </button>
        </div>
        <textarea
          value={moodNotes}
          onChange={handleNotesChange}
          placeholder="Optional: Add notes about your mood"
          className="mood-notes"
        />
        <button onClick={submitMood} disabled={!selectedMood} className="submit-mood-button">
          Submit Mood
        </button>
      </div>
    </Layout>
  );
};

export default MoodTracker;