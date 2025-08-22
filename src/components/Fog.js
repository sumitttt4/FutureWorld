import React, { useEffect } from 'react';

const Fog = () => {
  useEffect(() => {
    // Ambient fog effect
    const fog = document.querySelector('.fog');
    
    const ambientEffect = () => {
      setInterval(() => {
        if (fog) {
          fog.style.opacity = Math.random() * 0.3 + 0.7;
        }
      }, 3000);
    };

    ambientEffect();
  }, []);

  return <div className="fog"></div>;
};

export default Fog;