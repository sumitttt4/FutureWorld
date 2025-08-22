import React, { useEffect } from 'react';

const Rain = () => {
  useEffect(() => {
    const rainContainer = document.querySelector('.rain');
    
    // Create raindrops
    for (let i = 0; i < 50; i++) {
      const drop = document.createElement('div');
      drop.className = 'raindrop';
      drop.style.left = Math.random() * 100 + '%';
      drop.style.animationDuration = (Math.random() * 1.5 + 1) + 's';
      drop.style.animationDelay = Math.random() * 2 + 's';
      rainContainer.appendChild(drop);
    }

    // Cleanup function
    return () => {
      if (rainContainer) {
        rainContainer.innerHTML = '';
      }
    };
  }, []);

  return <div className="rain"></div>;
};

export default Rain;