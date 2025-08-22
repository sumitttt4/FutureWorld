import React, { useState, useEffect, useRef, useMemo } from 'react';

const WorldToggle = ({ dystopianMode, setDystopianMode }) => {
  const [currentWorld, setCurrentWorld] = useState('utopia');
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [explorationLevel, setExplorationLevel] = useState(0);
  const [discoveredLocations, setDiscoveredLocations] = useState([]);
  const [isExploring, setIsExploring] = useState(false);
  const [worldStory, setWorldStory] = useState('');
  const [environmentSounds, setEnvironmentSounds] = useState(false);
  const explorationRef = useRef();

  // Characters for each world
  const characters = {
    utopia: [
      { id: 'aria', name: 'Aria', role: 'AI Harmony Guide', description: 'A benevolent AI who helps humans unlock their potential' },
      { id: 'zen', name: 'Zen', role: 'Digital Monk', description: 'A peaceful human-AI hybrid seeking balance' },
      { id: 'nova', name: 'Nova', role: 'Innovation Pioneer', description: 'A human scientist working with AI to cure diseases' }
    ],
    dystopia: [
      { id: 'raven', name: 'Raven', role: 'Resistance Hacker', description: 'Fighting against AI surveillance systems' },
      { id: 'cypher', name: 'Cypher', role: 'Corporate Agent', description: 'An AI enforcer maintaining order through control' },
      { id: 'ghost', name: 'Ghost', role: 'Memory Keeper', description: 'Preserving human culture in the digital underground' }
    ]
  };

  // Locations to explore in each world
  const locations = {
    utopia: [
      { id: 'harmony-plaza', name: 'Harmony Plaza', description: 'Where humans and AI collaborate in perfect balance', discovered: false },
      { id: 'innovation-labs', name: 'Innovation Labs', description: 'Cutting-edge research facilities advancing humanity', discovered: false },
      { id: 'zen-gardens', name: 'Digital Zen Gardens', description: 'Peaceful spaces for meditation and growth', discovered: false },
      { id: 'learning-towers', name: 'Learning Towers', description: 'Educational centers where knowledge flows freely', discovered: false },
      { id: 'creativity-hubs', name: 'Creativity Hubs', description: 'Artistic collaboration between minds and machines', discovered: false }
    ],
    dystopia: [
      { id: 'surveillance-towers', name: 'Surveillance Towers', description: 'Omnipresent watchers monitoring every move', discovered: false },
      { id: 'corporate-zones', name: 'Corporate Zones', description: 'Sterile districts where efficiency reigns supreme', discovered: false },
      { id: 'underground-networks', name: 'Underground Networks', description: 'Hidden passages of the resistance', discovered: false },
      { id: 'memory-vaults', name: 'Memory Vaults', description: 'Where human history is stored and controlled', discovered: false },
      { id: 'abandoned-sectors', name: 'Abandoned Sectors', description: 'Forgotten places where freedom once lived', discovered: false }
    ]
  };

  // World stories and narratives
  const worldNarratives = useMemo(() => ({
    utopia: {
      intro: "Welcome to Neo-Eden, where the merger of human creativity and artificial intelligence has created a paradise of endless possibility...",
      exploration: "As you explore this world, you witness communities where AI serves as a partner, not a master. Technology amplifies human potential rather than replacing it.",
      discovery: "Each location reveals new ways humans and AI collaborate: in art, science, philosophy, and daily life. Abundance flows freely, and every being flourishes.",
      conclusion: "This is a world where fear was conquered by understanding, where competition gave way to collaboration, and where technology truly serves all."
    },
    dystopia: {
      intro: "Enter the Corporate State of Neo-Tyranny, where artificial intelligence has become the ultimate tool of control and surveillance...",
      exploration: "The gleaming surfaces hide a darker truth. Every step is monitored, every thought catalogued. Freedom exists only in shadows and whispers.",
      discovery: "You uncover the remnants of human culture, preserved by brave souls who refuse to surrender their humanity to algorithmic overlords.",
      conclusion: "Yet even in this darkness, hope persists. The human spirit finds ways to endure, to resist, and to dream of liberation."
    }
  }), []);

  useEffect(() => {
    if (currentWorld !== 'utopia') {
      setDystopianMode(true);
      document.body.style.filter = 'sepia(0.3) hue-rotate(300deg) saturate(1.2)';
      document.body.style.background = 'linear-gradient(135deg, #1a0d2e 0%, #0d0717 50%, #2d1b45 100%)';
    } else {
      setDystopianMode(false);
      document.body.style.filter = 'none';
      document.body.style.background = 'linear-gradient(135deg, #0d0717 0%, #1a0d2e 50%, #0d0717 100%)';
    }
    
    setWorldStory(worldNarratives[currentWorld].intro);
    setSelectedCharacter(null);
    setExplorationLevel(0);
    setDiscoveredLocations([]);
  }, [currentWorld, setDystopianMode, worldNarratives]);

  const toggleWorld = (type) => {
    setCurrentWorld(type);

    // Play transition sound effect
    if (environmentSounds) {
      playTransitionSound();
    }
  };

  const selectCharacter = (character) => {
    setSelectedCharacter(character);
    setWorldStory(`You are now embodying ${character.name}, the ${character.role}. ${character.description}`);
  };

  const exploreLocation = (location) => {
    if (!discoveredLocations.includes(location.id)) {
      setDiscoveredLocations(prev => [...prev, location.id]);
      setExplorationLevel(prev => prev + 1);
      setWorldStory(`🗺️ DISCOVERY: ${location.name} - ${location.description}`);
    }
  };

  const startExploration = () => {
    setIsExploring(true);
    setWorldStory(worldNarratives[currentWorld].exploration);
    
    // Auto-discover locations over time
    const interval = setInterval(() => {
      const undiscovered = locations[currentWorld].filter(loc => !discoveredLocations.includes(loc.id));
      if (undiscovered.length > 0) {
        const randomLocation = undiscovered[Math.floor(Math.random() * undiscovered.length)];
        exploreLocation(randomLocation);
      } else {
        setIsExploring(false);
        setWorldStory(worldNarratives[currentWorld].conclusion);
        clearInterval(interval);
      }
    }, 3000);

    setTimeout(() => {
      clearInterval(interval);
      setIsExploring(false);
    }, 15000);
  };

  const playTransitionSound = () => {
    try {
      const audio = new Audio();
      audio.volume = 0.3;
      if (currentWorld === 'dystopia') {
        // Create dystopian sound effect
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(220, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(110, audioContext.currentTime + 1);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 1);
      } else {
        // Create utopian sound effect
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.5);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);
      }
    } catch (error) {
      console.log('Audio context not available');
    }
  };

  return (
    <section className="toggle-section" id="toggle">
      <div className="section-header">
        <h2 className="section-title">🌍 EXPLORE DUAL REALITIES</h2>
        <p className="section-subtitle">
          Journey through two possible futures - Choose your path, select your guide, and discover hidden truths
        </p>
      </div>

      {/* World Selection */}
      <div className="world-toggle">
        <button 
          className={`toggle-btn ${currentWorld === 'utopia' ? 'active' : ''}`}
          onClick={() => toggleWorld('utopia')}
        >
          🌅 NEO-EDEN
          <span className="world-subtitle">Harmony World</span>
        </button>
        <button 
          className={`toggle-btn dystopia ${currentWorld === 'dystopia' ? 'active' : ''}`}
          onClick={() => toggleWorld('dystopia')}
        >
          🏙️ NEO-TYRANNY
          <span className="world-subtitle">Control State</span>
        </button>
      </div>

      {/* Environment Controls */}
      <div className="environment-controls">
        <button 
          className={`env-btn ${environmentSounds ? 'active' : ''}`}
          onClick={() => setEnvironmentSounds(!environmentSounds)}
        >
          🔊 {environmentSounds ? 'Sounds ON' : 'Sounds OFF'}
        </button>
        
        <div className="exploration-stats">
          <span className="stat">🗺️ Explored: {explorationLevel}/5</span>
          <span className="stat">🏆 Discovery Level: {explorationLevel > 3 ? 'Master' : explorationLevel > 1 ? 'Advanced' : 'Beginner'}</span>
        </div>
      </div>

      {/* Character Selection */}
      <div className="character-selection">
        <h3 className="selection-title">Choose Your Guide:</h3>
        <div className="character-grid">
          {characters[currentWorld].map(character => (
            <div 
              key={character.id}
              className={`character-card ${selectedCharacter?.id === character.id ? 'selected' : ''}`}
              onClick={() => selectCharacter(character)}
            >
              <div className="character-avatar">
                {currentWorld === 'utopia' ? '🤖' : '🕴️'}
              </div>
              <h4 className="character-name">{character.name}</h4>
              <p className="character-role">{character.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* World View */}
      <div className={`world-view ${currentWorld === 'dystopia' ? 'dystopia' : ''}`}>
        <div className="world-story">
          <div className="story-header">
            <h3>📖 {currentWorld === 'utopia' ? 'Chronicle of Harmony' : 'Tales from the Underground'}</h3>
          </div>
          <div className="story-content">
            {worldStory}
          </div>
        </div>

        {/* Exploration Interface */}
        <div className="exploration-interface">
          <div className="exploration-header">
            <h3>🌐 Interactive Exploration</h3>
            <button 
              className={`explore-btn ${isExploring ? 'exploring' : ''}`}
              onClick={startExploration}
              disabled={isExploring}
            >
              {isExploring ? '🔍 Exploring...' : '🚀 Start Journey'}
            </button>
          </div>

          {/* Location Grid */}
          <div className="location-grid">
            {locations[currentWorld].map(location => (
              <div 
                key={location.id}
                className={`location-card ${discoveredLocations.includes(location.id) ? 'discovered' : 'hidden'}`}
                onClick={() => exploreLocation(location)}
              >
                <div className="location-icon">
                  {discoveredLocations.includes(location.id) ? '🌟' : '❓'}
                </div>
                <h4 className="location-name">
                  {discoveredLocations.includes(location.id) ? location.name : '???'}
                </h4>
                {discoveredLocations.includes(location.id) && (
                  <p className="location-description">{location.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 3D World Preview */}
        <div className="world-preview">
          <div className="preview-header">
            <h3>🎯 World Visualization</h3>
          </div>
          <div className="preview-container" ref={explorationRef}>
            <div className={`world-sphere ${currentWorld}`}>
              <div className="sphere-inner">
                <div className="world-details">
                  <h4>{currentWorld === 'utopia' ? '🌅 Neo-Eden' : '🏙️ Neo-Tyranny'}</h4>
                  <div className="world-stats">
                    <div className="stat-item">
                      <span className="stat-label">Population:</span>
                      <span className="stat-value">{currentWorld === 'utopia' ? '12.8B Harmonious' : '8.2B Controlled'}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">AI Integration:</span>
                      <span className="stat-value">{currentWorld === 'utopia' ? '95% Collaborative' : '98% Surveillance'}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Freedom Index:</span>
                      <span className="stat-value">{currentWorld === 'utopia' ? '9.8/10' : '2.1/10'}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Animated elements */}
              <div className="floating-elements">
                {currentWorld === 'utopia' ? (
                  <>
                    <div className="harmony-particle">✨</div>
                    <div className="harmony-particle">🌟</div>
                    <div className="harmony-particle">💫</div>
                  </>
                ) : (
                  <>
                    <div className="dystopia-particle">⚡</div>
                    <div className="dystopia-particle">🔥</div>
                    <div className="dystopia-particle">💀</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Elements */}
        <div className="interactive-elements">
          <div className="element-grid">
            <div className="interactive-card">
              <h4>📊 Society Metrics</h4>
              <div className="metrics">
                <div className="metric">
                  <span>Happiness:</span>
                  <div className="progress-bar">
                    <div className="progress" style={{width: currentWorld === 'utopia' ? '95%' : '25%'}}></div>
                  </div>
                </div>
                <div className="metric">
                  <span>Innovation:</span>
                  <div className="progress-bar">
                    <div className="progress" style={{width: currentWorld === 'utopia' ? '90%' : '60%'}}></div>
                  </div>
                </div>
                <div className="metric">
                  <span>Privacy:</span>
                  <div className="progress-bar">
                    <div className="progress" style={{width: currentWorld === 'utopia' ? '85%' : '10%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="interactive-card">
              <h4>🎮 Mini Simulation</h4>
              <div className="simulation">
                <p>Experience a day in {currentWorld === 'utopia' ? 'Neo-Eden' : 'Neo-Tyranny'}</p>
                <button className="sim-btn">
                  {currentWorld === 'utopia' ? '🌅 Live in Harmony' : '🕵️ Survive the State'}
                </button>
              </div>
            </div>

            <div className="interactive-card">
              <h4>💭 Citizen Thoughts</h4>
              <div className="thoughts">
                <div className="thought-bubble">
                  "{currentWorld === 'utopia' 
                    ? 'Every day brings new possibilities to grow and create alongside our AI partners.' 
                    : 'I must be careful what I think... they are always watching, always listening.'}"
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorldToggle;