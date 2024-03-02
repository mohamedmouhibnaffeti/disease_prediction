"use client"
import { useState } from 'react';

const Test = () => {
  const [isStarted, setIsStarted] = useState(false);

  const handleStartClick = () => {
    setIsStarted(true);
  };

  const handleStopClick = () => {
    setIsStarted(false);
    // Add any additional logic for the "Stop" button click event
  };

  return (
    <div>
      <button className='bg-gray-700' onClick={handleStartClick} disabled={isStarted}>
        Start
      </button>
      <button className='bg-gray-700' onClick={handleStopClick} disabled={!isStarted}>
        Stop
      </button>
    </div>
  );
};

export default Test;
