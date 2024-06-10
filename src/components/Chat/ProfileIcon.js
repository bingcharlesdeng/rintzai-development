import React from 'react';
// import "./ProfileIcon.css"

const ProfileIcon = ({ name }) => {
  // Logic to determine initials (e.g., first letter of first and last name)
  const initials = name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('');

  return (
    <div className="profile-icon">
      {initials} 
    </div>
  );
};

export default ProfileIcon;