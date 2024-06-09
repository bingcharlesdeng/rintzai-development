import React, { useState } from 'react';
import Layout from './Layout';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Navigate } from 'react-router-dom';

const MoodTracker = () => {
    const isLoggedIn = !!localStorage.getItem('user');
    console.log("user in moodtracker",localStorage.getItem('user') );

    // Move useState hooks outside the conditional block
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
            userId: JSON.parse(localStorage.getItem('user')).uid
        };
    
        const moodRef = collection(db, 'moodEntries');
        await addDoc(moodRef, moodData);
    
        console.log('Mood submitted:', moodData);
        setSelectedMood(null);
        setMoodNotes('');
    };
    
    if (!isLoggedIn) {
        // Redirect to login if not logged in
        return <Navigate to="/login" />;
    }

    // If logged in, render the MoodTracker content
    return (
        <Layout>
            <div className="mood-tracker-container">
                <h2>Track your mood</h2>
                <div className="mood-selection">
                    {/* ... your mood selection buttons ... */}
                </div>
                <textarea
                    value={moodNotes}
                    onChange={handleNotesChange}
                    placeholder="Optional: Add notes about your mood"
                />
                <button onClick={submitMood} disabled={!selectedMood}>
                    Submit Mood
                </button>
            </div>
        </Layout>
    );
};

export default MoodTracker;
