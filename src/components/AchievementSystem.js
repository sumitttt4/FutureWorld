import React, { useState, useEffect } from 'react';

const AchievementSystem = () => {
  const [achievements, setAchievements] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const [latestAchievement, setLatestAchievement] = useState(null);
  const [isVisible, setIsVisible] = useState(true); // New state for visibility

  const achievementsList = [
    { id: 'first_visit', name: 'Neural Pioneer', description: 'Welcome to the future!', points: 100, icon: '🚀' },
    { id: 'voice_click', name: 'Voice Activated', description: 'Clicked the cyberpunk girl', points: 50, icon: '🎙️' },
    { id: 'game_played', name: 'Digital Gladiator', description: 'Played your first game', points: 150, icon: '🎮' },
    { id: 'high_score', name: 'Neural Master', description: 'Achieved a high score', points: 200, icon: '🏆' },
    { id: 'all_games', name: 'Time Traveler', description: 'Played games in all eras', points: 500, icon: '⏰' },
    { id: 'chat_ai', name: 'AI Whisperer', description: 'Chatted with the AI assistant', points: 100, icon: '🤖' },
    { id: 'explorer', name: 'Digital Explorer', description: 'Explored all sections', points: 300, icon: '🗺️' },
    { id: 'sound_master', name: 'Audio Architect', description: 'Enabled sound effects', points: 75, icon: '🔊' }
  ];

  // Scroll detection effect
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 200) { // Hide after scrolling 200px
        if (currentScrollY > lastScrollY) {
          // Scrolling down
          setIsVisible(false);
        } else {
          // Scrolling up
          setIsVisible(true);
        }
      } else {
        // Always show when at top
        setIsVisible(true);
      }
      
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Award first visit achievement
    if (!achievements.find(a => a.id === 'first_visit')) {
      unlockAchievement('first_visit');
    }

    // Listen for custom events
    const handleVoiceClick = () => unlockAchievement('voice_click');
    const handleGamePlayed = () => unlockAchievement('game_played');
    const handleChatAI = () => unlockAchievement('chat_ai');
    const handleSoundEnabled = () => unlockAchievement('sound_master');

    document.addEventListener('voiceClicked', handleVoiceClick);
    document.addEventListener('gamePlayed', handleGamePlayed);
    document.addEventListener('chatAI', handleChatAI);
    document.addEventListener('soundEnabled', handleSoundEnabled);

    return () => {
      document.removeEventListener('voiceClicked', handleVoiceClick);
      document.removeEventListener('gamePlayed', handleGamePlayed);
      document.removeEventListener('chatAI', handleChatAI);
      document.removeEventListener('soundEnabled', handleSoundEnabled);
    };
  }, [achievements]);

  useEffect(() => {
    const newLevel = Math.floor(totalScore / 500) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      showAchievementNotification({
        name: `Level ${newLevel} Reached!`,
        description: 'Your neural network is evolving',
        icon: '⭐'
      });
    }
  }, [totalScore, level]);

  const unlockAchievement = (achievementId) => {
    const achievement = achievementsList.find(a => a.id === achievementId);
    if (achievement && !achievements.find(a => a.id === achievementId)) {
      setAchievements(prev => [...prev, achievement]);
      setTotalScore(prev => prev + achievement.points);
      showAchievementNotification(achievement);
    }
  };

  const showAchievementNotification = (achievement) => {
    setLatestAchievement(achievement);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
  };

  const progressPercentage = ((totalScore % 500) / 500) * 100;

  return (
    <>
      {/* Progress Bar - Now with visibility control */}
      <div className={`achievement-bar ${isVisible ? 'visible' : 'hidden'}`}>
        <div className="level-indicator">
          <span className="level-text">Level {level}</span>
          <div className="xp-text">{totalScore} XP</div>
        </div>
        <div className="progress-container">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="next-level">Next: {500 - (totalScore % 500)} XP</div>
        </div>
        <div className="achievement-count">
          🏆 {achievements.length}/{achievementsList.length}
        </div>
      </div>

      {/* Achievement Notification */}
      {showNotification && latestAchievement && (
        <div className="achievement-notification">
          <div className="achievement-icon">{latestAchievement.icon}</div>
          <div className="achievement-details">
            <div className="achievement-name">{latestAchievement.name}</div>
            <div className="achievement-desc">{latestAchievement.description}</div>
            {latestAchievement.points && (
              <div className="achievement-points">+{latestAchievement.points} XP</div>
            )}
          </div>
        </div>
      )}

      {/* Achievements Panel Toggle - Also with visibility control */}
      <button 
        className={`achievements-toggle ${isVisible ? 'visible' : 'hidden'}`}
        onClick={() => {
          const panel = document.querySelector('.achievements-panel');
          panel.classList.toggle('visible');
        }}
        title="View Achievements"
      >
        🏆
      </button>

      {/* Achievements Panel */}
      <div className="achievements-panel">
        <div className="achievements-header">
          <h3>Neural Achievements</h3>
          <button 
            className="achievements-close"
            onClick={() => {
              const panel = document.querySelector('.achievements-panel');
              panel.classList.remove('visible');
            }}
            title="Close Achievements"
          >
            ✕
          </button>
        </div>
        <div className="achievements-grid">
          {achievementsList.map(achievement => (
            <div 
              key={achievement.id} 
              className={`achievement-item ${
                achievements.find(a => a.id === achievement.id) ? 'unlocked' : 'locked'
              }`}
            >
              <div className="achievement-icon-large">{achievement.icon}</div>
              <div className="achievement-name">{achievement.name}</div>
              <div className="achievement-description">{achievement.description}</div>
              <div className="achievement-points">{achievement.points} XP</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AchievementSystem;
