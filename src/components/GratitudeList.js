import React, { useState } from 'react';

const GratitudeList = ({ gratitudes, onAddGratitude }) => {
  const [newGratitude, setNewGratitude] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newGratitude) return;

    onAddGratitude(newGratitude);
    setNewGratitude('');
  };

  return (
    <div className="gratitude-list-container">
      <h3>Gratitude List</h3>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          value={newGratitude}
          onChange={(e) => setNewGratitude(e.target.value)}
          placeholder="Write something you're grateful for..."
        />
        <button type="submit">Add</button>
      </form>
      {gratitudes.length > 0 && (
        <ul>
          {gratitudes.map((gratitude, index) => (
            <li key={index}>{gratitude}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GratitudeList;