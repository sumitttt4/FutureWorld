import React from 'react';

const Hero = () => {
  const scrollToNext = () => {
    const timelineSection = document.getElementById('timeline');
    if (timelineSection) {
      timelineSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const goToDestiny = () => {
    // Play the audio first
    const audio = new Audio('/fix-me-voice.mp3');
    audio.volume = 0.8;
    
    // Add visual feedback
    const button = document.querySelector('.fix-me-button');
    if (button) {
      button.classList.add('speaking');
    }
    
    // Play audio and then scroll
    audio.play().then(() => {
      console.log('Audio playback started successfully');
      
      // Scroll to destiny section after a short delay
      setTimeout(() => {
        const destinySection = document.getElementById('destiny');
        if (destinySection) {
          destinySection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 1000); // Wait 1 second before scrolling
      
    }).catch(error => {
      console.error('Audio playback failed:', error);
      // Still scroll even if audio fails
      const destinySection = document.getElementById('destiny');
      if (destinySection) {
        destinySection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
    
    // Remove visual feedback when audio ends
    audio.addEventListener('ended', () => {
      if (button) {
        button.classList.remove('speaking');
      }
    });
    
    // Backup timeout to remove visual feedback
    setTimeout(() => {
      if (button) {
        button.classList.remove('speaking');
      }
    }, 4000);
  };

  return (
    <section className="hero" id="hero">
      <div className="cityscape">
        <div className="building"></div>
        <div className="building"></div>
        <div className="building"></div>
        <div className="building"></div>
        <div className="building"></div>
        <div className="building"></div>
      </div>
      <div className="hologram-figure">
        <div className="holo-woman">
          <div className="pointing-hand"></div>
          <div className="holo-scanlines"></div>
        </div>
      </div>
      <h1 className="hero-title">STEP INTO THE FUTURE WITH Me</h1>
      <div className="hero-buttons">
        <button className="cta-button" onClick={scrollToNext}>
          ENTER FUTURE
        </button>
        <button className="fix-me-button" onClick={goToDestiny}>
          I Can Fix You
        </button>
      </div>
    </section>
  );
};

export default Hero;