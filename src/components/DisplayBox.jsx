// DisplayBox.jsx
import React from 'react';
import './DisplayBox.css'; // Optional, if you want to add custom styling



const DisplayBox = ({ text }) => {
  return (
    <div className="display-box">
      {text}
    </div>
  );
};

export default DisplayBox;
