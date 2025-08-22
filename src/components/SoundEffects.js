import React, { useEffect, useState } from 'react';

const SoundEffects = () => {
  const [audioContext, setAudioContext] = useState(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Initialize Web Audio API
    if (typeof window !== 'undefined' && window.AudioContext) {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      setAudioContext(context);
    }
  }, []);

  const playBeep = (frequency = 800, duration = 200, type = 'sine') => {
    if (!audioContext || !isEnabled) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration / 1000);
  };

  const playHoverSound = () => {
    playBeep(1200, 100, 'square');
  };

  const playClickSound = () => {
    playBeep(800, 150, 'sawtooth');
  };

  const playGlitchSound = () => {
    // Create a glitch-like sound effect
    const frequencies = [400, 600, 800, 1000, 1200];
    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        playBeep(freq, 50, 'square');
      }, index * 30);
    });
  };

  useEffect(() => {
    if (!isEnabled) return;

    // Add event listeners for UI sounds
    const buttons = document.querySelectorAll('button, .portal, .quiz-option, .nav-link');
    const links = document.querySelectorAll('a, .clickable');

    const handleMouseEnter = () => playHoverSound();
    const handleClick = () => playClickSound();

    buttons.forEach(button => {
      button.addEventListener('mouseenter', handleMouseEnter);
      button.addEventListener('click', handleClick);
    });

    links.forEach(link => {
      link.addEventListener('mouseenter', handleMouseEnter);
      link.addEventListener('click', handleClick);
    });

    // Cleanup
    return () => {
      buttons.forEach(button => {
        button.removeEventListener('mouseenter', handleMouseEnter);
        button.removeEventListener('click', handleClick);
      });
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleMouseEnter);
        link.removeEventListener('click', handleClick);
      });
    };
  }, [isEnabled, audioContext]);

  const toggleSounds = () => {
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume();
    }
    setIsEnabled(!isEnabled);
    
    if (!isEnabled) {
      playGlitchSound(); // Play a confirmation sound
    }
  };

  return (
    <div className="sound-control">
      <button 
        className={`sound-btn ${isEnabled ? 'enabled' : 'disabled'}`}
        onClick={toggleSounds}
        title={isEnabled ? "Disable Sound Effects" : "Enable Sound Effects"}
      >
        <div className="sound-icon">
          {isEnabled ? '🔊' : '🔇'}
        </div>
        <span className="sound-text">
          {isEnabled ? 'AUDIO ON' : ''}
        </span>
      </button>
    </div>
  );
};

export default SoundEffects;
