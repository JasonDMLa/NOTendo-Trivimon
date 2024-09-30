import React from 'react';

const StartScene = ({ onStart }) => {
  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Welcome to the Game!</h1>
      <button onClick={onStart} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Click to Start
      </button>
    </div>
  );
};

export default StartScene;
