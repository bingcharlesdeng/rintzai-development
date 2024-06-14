import React from 'react';
import './pastEntryList.css';
import { formatDateTime } from '../utils/dateUtils';

const PastEntryList = ({ entries, onEntryClick }) => {
  return (
    <div className="past-entries">
      <h3 className="past-entries-title">Past Entries</h3>
      {entries.length > 0 ? (
        <ul className="entry-list">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="past-entry"
              onClick={() => onEntryClick(entry)}
            >
              <div className="entry-date">{formatDateTime(entry.createdAt)}</div>
              <div className="entry-content">{entry.content}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-entries">No past entries found.</p>
      )}
    </div>
  );
};

export default PastEntryList;