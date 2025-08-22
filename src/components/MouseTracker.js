import React, { useEffect } from 'react';

const MouseTracker = () => {
  useEffect(() => {
    const createTrail = (x, y) => {
      const trail = document.createElement('div');
      trail.className = 'mouse-trail';
      trail.style.left = x + 'px';
      trail.style.top = y + 'px';
      document.body.appendChild(trail);

      setTimeout(() => {
        if (trail.parentNode) {
          trail.parentNode.removeChild(trail);
        }
      }, 1000);
    };

    const createSpark = (x, y) => {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const spark = document.createElement('div');
          spark.className = 'mouse-spark';
          spark.style.left = (x + Math.random() * 20 - 10) + 'px';
          spark.style.top = (y + Math.random() * 20 - 10) + 'px';
          spark.style.backgroundColor = Math.random() > 0.5 ? '#00ffff' : '#ff00ff';
          document.body.appendChild(spark);

          setTimeout(() => {
            if (spark.parentNode) {
              spark.parentNode.removeChild(spark);
            }
          }, 800);
        }, i * 50);
      }
    };

    let isMoving = false;
    let moveTimeout;

    const handleMouseMove = (e) => {
      createTrail(e.clientX, e.clientY);
      
      if (!isMoving) {
        isMoving = true;
        createSpark(e.clientX, e.clientY);
      }

      clearTimeout(moveTimeout);
      moveTimeout = setTimeout(() => {
        isMoving = false;
      }, 100);
    };

    const handleClick = (e) => {
      // Create explosion effect on click
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          const explosion = document.createElement('div');
          explosion.className = 'mouse-explosion';
          const angle = (i / 8) * Math.PI * 2;
          const distance = 30;
          explosion.style.left = (e.clientX + Math.cos(angle) * distance) + 'px';
          explosion.style.top = (e.clientY + Math.sin(angle) * distance) + 'px';
          explosion.style.backgroundColor = Math.random() > 0.5 ? '#00ffff' : '#ff00ff';
          document.body.appendChild(explosion);

          setTimeout(() => {
            if (explosion.parentNode) {
              explosion.parentNode.removeChild(explosion);
            }
          }, 600);
        }, i * 20);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
      clearTimeout(moveTimeout);
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default MouseTracker;
