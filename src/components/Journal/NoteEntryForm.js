import React, { useState } from 'react';
import './noteEntryForm.css';

const NoteEntryForm = () => {
  const [notes, setNotes] = useState('');

  const handleNotesChange = (e) => setNotes(e.target.value);

  return (
    <div className="note-entry-form">
      <h3 className="note-form-title">Add notes or annotations</h3>
      <textarea
        value={notes}
        onChange={handleNotesChange}
        placeholder="Add notes or annotations (optional)"
        className="notes-textarea"
      />
    </div>
  );
};

export default NoteEntryForm;