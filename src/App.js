import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Destiny from './components/Destiny';
import Timeline from './components/Timeline';
import Portals from './components/Portals';
import WorldToggle from './components/WorldToggle';
import Quiz from './components/Quiz';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Auth from './components/Auth';
import LoadingScreen from './components/LoadingScreen';
import Fog from './components/Fog';
import Rain from './components/Rain';
import VoiceWelcome from './components/VoiceWelcome';
import SoundEffects from './components/SoundEffects';
import ParticleBackground from './components/ParticleBackground';
import AIChatAssistant from './components/AIChatAssistant';
import MouseTracker from './components/MouseTracker';
import AchievementSystem from './components/AchievementSystem';

function App() {
  const [loading, setLoading] = useState(true);
  const [dystopianMode, setDystopianMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMessage, setAuthMessage] = useState('');

  // Check for existing user session on app load
  useEffect(() => {
    const savedUser = localStorage.getItem('cyberpunk_current_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setCurrentUser(user);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('cyberpunk_current_user');
      }
    }
  }, []);

  // Create demo user if none exists
  useEffect(() => {
    const existingUsers = JSON.parse(localStorage.getItem('cyberpunk_users') || '[]');
    const demoUser = existingUsers.find(u => u.username === 'demo');
    
    if (!demoUser) {
      const demoUserData = {
        id: 999,
        username: 'demo',
        email: 'demo@cyberpunk.net',
        password: 'demo123',
        createdAt: new Date().toISOString(),
        level: 5,
        xp: 1250,
        achievements: ['first_game', 'explorer', 'character_select']
      };
      
      const updatedUsers = [...existingUsers, demoUserData];
      localStorage.setItem('cyberpunk_users', JSON.stringify(updatedUsers));
    }
  }, []);

  const handleAchievement = (achievementId) => {
    console.log('Achievement unlocked:', achievementId);
    
    // Update user's achievements if logged in
    if (currentUser) {
      const updatedUser = { 
        ...currentUser, 
        xp: (currentUser.xp || 0) + 50,
        level: Math.floor(((currentUser.xp || 0) + 50) / 100) + 1
      };
      
      setCurrentUser(updatedUser);
      localStorage.setItem('cyberpunk_current_user', JSON.stringify(updatedUser));
      
      // Update stored user data
      const users = JSON.parse(localStorage.getItem('cyberpunk_users') || '[]');
      const userIndex = users.findIndex(u => u.id === currentUser.id);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], ...updatedUser };
        localStorage.setItem('cyberpunk_users', JSON.stringify(users));
      }
    }
  };

  const handleAuthSuccess = (authData) => {
    setCurrentUser({
      id: authData.user.id,
      username: authData.user.username,
      email: authData.user.email,
      level: authData.user.level || 1,
      xp: authData.user.xp || 0
    });
    setAuthMessage(authData.message);
    setIsAuthOpen(false);
    
    // Show success message briefly
    setTimeout(() => setAuthMessage(''), 4000);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
    setAuthMessage('Neural connection terminated. See you in the digital realm!');
    setTimeout(() => setAuthMessage(''), 3000);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className={`App ${dystopianMode ? 'dystopian' : ''}`}>
      {/* Background Effects */}
      <ParticleBackground />
      <Fog />
      <Rain />
      
      {/* Interactive Systems */}
      <MouseTracker />
      <AchievementSystem onAchievement={handleAchievement} />
      <AIChatAssistant />
      
      {/* Audio Controls */}
      <VoiceWelcome />
      <SoundEffects />
      
      {/* Auth Message */}
      {authMessage && (
        <div className="auth-message-overlay">
          <div className="auth-message">
            <span className="message-icon">⚡</span>
            {authMessage}
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <Navbar 
        onAuthClick={() => setIsAuthOpen(true)}
        currentUser={currentUser}
        onSignOut={handleSignOut}
      />
      <Hero currentUser={currentUser} />
      <Destiny onAchievement={handleAchievement} />
      <Timeline onAchievement={handleAchievement} />
      <Portals />
      <WorldToggle 
        dystopianMode={dystopianMode} 
        setDystopianMode={setDystopianMode}
        onAchievement={handleAchievement}
      />
      <Quiz />
      <Contact />
      <Footer />
      
      {/* Authentication Modal */}
      <Auth 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}

export default App;