import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useUserContext } from './UserContext'; // Import useUserContext hook
import { Navigate } from 'react-router-dom';

const Journal = () => {
  const { user } = useUserContext(); // Get user from context
  const [journalEntry, setJournalEntry] = useState('');
  const [pastEntries, setPastEntries] = useState([]);

  const handleEntryChange = (e) => setJournalEntry(e.target.value);

  const saveEntry = async () => {
    if (!journalEntry) return; // Don't save empty entries

    const entry = {
      content: journalEntry,
      date: new Date().toLocaleDateString(),
      userId: user.uid,
    };

    const entriesRef = collection(db, 'journalEntries');
    await addDoc(entriesRef, entry);

    console.log('Journal Entry saved:', entry);
    setJournalEntry('');
  };

  const getJournalEntries = async () => {
    const entriesRef = collection(db, 'journalEntries');
    const q = query(entriesRef, where('userId', '==', user.uid));

    const querySnapshot = await getDocs(q);
    const entries = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setPastEntries(entries);
  };

  useEffect(() => {
    getJournalEntries();
  }, [user.uid]);

  if (!user) {
    // Redirect to login if not logged in
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="journal-container">
      <h2>Write your journal entry</h2>
      <textarea
        value={journalEntry}
        onChange={handleEntryChange}
        placeholder="Write about your day, thoughts, or feelings"
      />
      <button onClick={saveEntry} disabled={!journalEntry}>
        Save Entry
      </button>
      {/* Display past entries if any */}
      {pastEntries.length > 0 && (
        <div className="past-entries">
          <h3>Past Entries</h3>
          <ul>
            {pastEntries.map((entry) => (
              <li key={entry.id}>
                {entry.date} - {entry.content.slice(0, 30)}...
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Journal;