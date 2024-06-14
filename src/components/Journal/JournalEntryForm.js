import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { useUserContext } from '../UserContext';
import './journalEntryForm.css';

const JournalEntryForm = ({ onSave }) => {
  const { user } = useUserContext();
  const [journalEntry, setJournalEntry] = useState('');
  const [notes, setNotes] = useState('');

  const handleEntryChange = (e) => setJournalEntry(e.target.value);
  const handleNotesChange = (e) => setNotes(e.target.value);

  const saveEntry = async () => {
    if (!journalEntry) return;

    const entry = {
      content: journalEntry,
      createdAt: serverTimestamp(),
      userId: user.uid,
      notes: notes,
    };

    const entriesRef = collection(db, 'journalEntries');
    await addDoc(entriesRef, entry);

    console.log('Journal Entry saved:', entry);
    setJournalEntry('');
    setNotes('');
    onSave();
  };

  return (
    <div className="journal-entry-form">
      <h3 className="entry-form-title">Write your journal entry</h3>
      <textarea
        value={journalEntry}
        onChange={handleEntryChange}
        placeholder="Write about your day, thoughts, or feelings"
        className="journal-entry-textarea"
      />
      <textarea
        value={notes}
        onChange={handleNotesChange}
        placeholder="Add notes or annotations (optional)"
        className="notes-textarea"
      />
      <button onClick={saveEntry} disabled={!journalEntry} className="save-entry-button">
        Save Entry
      </button>
    </div>
  );
};

export default JournalEntryForm;