import React, { useState, useEffect, useCallback } from 'react';

const VoiceWelcome = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  const playWelcomeMessage = useCallback(() => {
    if (!speechSupported || isPlaying) return;

    setIsPlaying(true);
    setHasPlayed(true);

    const welcomeTexts = [
      "Welcome to the future world, digital explorer.",
      "Entering cyberpunk reality matrix.",
      "AI companion systems online and ready.",
      "Your journey into tomorrow's world begins now.",
      "Welcome, future architect. Your destiny awaits.",
      "Neural pathways activated. Prepare for digital transcendence."
    ];

    const randomText = welcomeTexts[Math.floor(Math.random() * welcomeTexts.length)];

    const utterance = new SpeechSynthesisUtterance(randomText);
    
    // Configure voice settings for cyberpunk feel
    utterance.rate = 0.8;
    utterance.pitch = 0.7;
    utterance.volume = 0.8;

    // Try to use a female voice if available
    const voices = speechSynthesis.getVoices();
    const femaleVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('female') || 
      voice.name.toLowerCase().includes('samantha') ||
      voice.name.toLowerCase().includes('zira') ||
      voice.name.toLowerCase().includes('susan') ||
      voice.name.toLowerCase().includes('aria') ||
      voice.gender === 'female'
    );
    
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    utterance.onend = () => {
      setIsPlaying(false);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    speechSynthesis.speak(utterance);

    // Add visual glitch effect
    document.body.style.filter = 'hue-rotate(180deg) brightness(1.2)';
    setTimeout(() => {
      document.body.style.filter = 'none';
    }, 500);
  }, [speechSupported, isPlaying]);

  useEffect(() => {
    // Check if speech synthesis is supported
    if ('speechSynthesis' in window) {
      setSpeechSupported(true);
      
      // Load voices
      const loadVoices = () => {
        const voices = speechSynthesis.getVoices();
        console.log('Available voices:', voices.map(v => v.name));
      };
      
      if (speechSynthesis.getVoices().length === 0) {
        speechSynthesis.addEventListener('voiceschanged', loadVoices);
      } else {
        loadVoices();
      }
    }

    // Auto-play welcome message after a short delay
    const timer = setTimeout(() => {
      if (!hasPlayed) {
        playWelcomeMessage();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [hasPlayed, playWelcomeMessage]);

  const stopSpeech = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
  };

  if (!speechSupported) {
    return null;
  }

  return (
    <div className="voice-control">
      <button 
        className={`voice-btn ${isPlaying ? 'speaking' : ''}`}
        onClick={isPlaying ? stopSpeech : playWelcomeMessage}
        title={isPlaying ? "Stop Voice" : "Play Welcome Message"}
      >
        <div className="voice-icon">
          {isPlaying ? (
            <div className="speaking-animation">
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
            </div>
          ) : (
            <div className="speaker-icon">🔊</div>
          )}
        </div>
        <span className="voice-text">
          {isPlaying ? 'TRANSMITTING...' : ''}
        </span>
      </button>
    </div>
  );
};

export default VoiceWelcome;
