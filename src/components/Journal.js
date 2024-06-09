import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, query } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../firebase'; // Assuming firebaseConfig is defined elsewhere

const Journal = () => {
  const [journalEntry, setJournalEntry] = useState('');
  const [pastEntries, setPastEntries] = useState([]);

  const handleEntryChange = (e) => setJournalEntry(e.target.value);

  const saveEntry = async () => {
    if (!journalEntry) return; // Don't save empty entries

    const entry = {
      content: journalEntry,
      date: new Date().toLocaleDateString(), // Example date format
    };

    const entriesRef = collection(db, 'journalEntries'); // Reference to journal entries collection
    await addDoc(entriesRef, entry); // Add entry to Firestore

    console.log('Journal Entry saved:', entry); // Confirmation message
    setJournalEntry('');
  };

  const getJournalEntries = async () => {
    const entriesRef = collection(db, 'journalEntries'); // Reference to journal entries collection
    const q = query(entriesRef); // Create a query to retrieve all entries

    const querySnapshot = await getDocs(q); // Get the query results
    const entries = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setPastEntries(entries);
  };

  useEffect(() => {
    getJournalEntries();
  }, []); // Fetch entries on component mount

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



 
 