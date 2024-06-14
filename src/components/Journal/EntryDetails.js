import React from 'react';
import './entryDetails.css';
import { formatDateTime } from '../utils/dateUtils';

const EntryDetails = ({ entry, onBackClick }) => {
  return (
    <div className="entry-details">
      <h3 className="entry-details-title">{formatDateTime(entry.createdAt)}</h3>
      <p className="entry-details-content">{entry.content}</p>
      {entry.notes && <p className="entry-details-notes">Notes: {entry.notes}</p>}
      <button className="back-button" onClick={onBackClick}>
        Back to Entries
      </button>
    </div>
  );
};

export default EntryDetails;