import React, { useEffect, useState } from 'react';

const LoadingScreen = () => {
  const [loadingText, setLoadingText] = useState('INITIALIZING NEURAL INTERFACE...');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const loadingMessages = [
      'INITIALIZING NEURAL INTERFACE...',
      'CONNECTING TO AI MAINFRAME...',
      'SCANNING DIGITAL HORIZONS...',
      'LOADING FUTURE PROTOCOLS...',
      'WELCOME TO TOMORROW...'
    ];

    let messageIndex = 0;
    let progressValue = 0;

    const messageInterval = setInterval(() => {
      if (messageIndex < loadingMessages.length - 1) {
        messageIndex++;
        setLoadingText(loadingMessages[messageIndex]);
      }
    }, 400);

    const progressInterval = setInterval(() => {
      progressValue += Math.random() * 15 + 5;
      if (progressValue >= 100) {
        progressValue = 100;
        clearInterval(progressInterval);
        clearInterval(messageInterval);
      }
      setProgress(progressValue);
    }, 100);

    // Optional: Add voice announcement
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance('Neural interface initializing');
      utterance.rate = 0.7;
      utterance.pitch = 1.2; // Higher pitch for female voice
      utterance.volume = 0.5;
      
      // Try to use a female voice
      const setVoice = () => {
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
      };

      if (speechSynthesis.getVoices().length === 0) {
        speechSynthesis.addEventListener('voiceschanged', setVoice);
      } else {
        setVoice();
      }
      
      setTimeout(() => {
        speechSynthesis.speak(utterance);
      }, 500);
    }

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="loading-logo">
          <span className="logo-text">FUTURE</span>
          <span className="logo-ai">AI</span>
        </div>
        
        <div className="loading-progress-container">
          <div className="loading-progress-bar">
            <div 
              className="loading-progress-fill" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="loading-percentage">{Math.round(progress)}%</div>
        </div>
        
        <div className="loading-text">{loadingText}</div>
        
        <div className="loading-scanner">
          <div className="scanner-line"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;