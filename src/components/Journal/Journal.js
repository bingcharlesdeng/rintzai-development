import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import { useUserContext } from '../UserContext';
import { Navigate } from 'react-router-dom';
import './journal.css';
import JournalEntryForm from './JournalEntryForm';
import PastEntryList from './PastEntryList';
import EntryDetails from './EntryDetails';

const Journal = () => {
  const { user } = useUserContext();
  const [pastEntries, setPastEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const getJournalEntries = async () => {
    const entriesRef = collection(db, 'journalEntries');
    const q = query(entriesRef, where('userId', '==', user.uid), orderBy('createdAt', 'desc'));

    const querySnapshot = await getDocs(q);
    const entries = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setPastEntries(entries);
  };

  const handleEntryClick = (entry) => {
    setSelectedEntry(entry);
  };

  const handleBackClick = () => {
    setSelectedEntry(null);
  };

  useEffect(() => {
    getJournalEntries();
  }, [user.uid]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="journal-container">
      <h2 className="journal-title">My Journal</h2>
      {selectedEntry ? (
        <EntryDetails entry={selectedEntry} onBackClick={handleBackClick} />
      ) : (
        <>
          <JournalEntryForm onSave={getJournalEntries} />
          <PastEntryList entries={pastEntries} onEntryClick={handleEntryClick} />
        </>
      )}
    </div>
  );
};

export default Journal;