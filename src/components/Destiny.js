import React, { useState, useEffect } from 'react';

const Destiny = () => {
  const [selectedPath, setSelectedPath] = useState(null);
  const [userChoices, setUserChoices] = useState({});
  const [currentStep, setCurrentStep] = useState('intro');
  const [destinyRevealed, setDestinyRevealed] = useState(false);

  const destinyPaths = [
    {
      id: 'cyber_warrior',
      title: 'Cyber Warrior',
      icon: '⚔️',
      description: 'Master the digital battlefield and protect the innocent',
      color: '#ff0000',
      traits: ['Courage', 'Justice', 'Strength'],
      outcome: 'You become a legendary defender of the digital realm, feared by hackers and loved by the people.',
      rarity: 'Epic'
    },
    {
      id: 'neural_architect',
      title: 'Neural Architect',
      icon: '🧠',
      description: 'Design the minds of tomorrow and reshape reality',
      color: '#00ffff',
      traits: ['Intelligence', 'Creativity', 'Innovation'],
      outcome: 'You architect the future of human consciousness, bridging the gap between mind and machine.',
      rarity: 'Legendary'
    },
    {
      id: 'quantum_mystic',
      title: 'Quantum Mystic',
      icon: '🔮',
      description: 'Unlock the secrets of the universe and transcend dimensions',
      color: '#ff00ff',
      traits: ['Wisdom', 'Intuition', 'Transcendence'],
      outcome: 'You become a bridge between realities, wielding powers beyond mortal comprehension.',
      rarity: 'Mythic'
    },
    {
      id: 'bio_hacker',
      title: 'Bio-Hacker',
      icon: '🧬',
      description: 'Merge flesh with machine and evolve beyond human limits',
      color: '#00ff00',
      traits: ['Adaptation', 'Evolution', 'Transformation'],
      outcome: 'You transcend human limitations, becoming the perfect fusion of organic and synthetic life.',
      rarity: 'Epic'
    },
    {
      id: 'data_phantom',
      title: 'Data Phantom',
      icon: '👻',
      description: 'Become one with the digital void, master of information shadows',
      color: '#9d4edd',
      traits: ['Stealth', 'Knowledge', 'Infiltration'],
      outcome: 'You slip through data streams like a ghost, controlling information flow across the digital universe.',
      rarity: 'Rare'
    },
    {
      id: 'time_weaver',
      title: 'Time Weaver',
      icon: '⏳',
      description: 'Manipulate temporal streams and rewrite the timeline itself',
      color: '#ffd60a',
      traits: ['Temporal Control', 'Foresight', 'Paradox Master'],
      outcome: 'You become master of time itself, weaving through past and future to shape destiny.',
      rarity: 'Legendary'
    }
  ];

  const questions = [
    {
      id: 'motivation',
      question: 'What drives you in this digital age?',
      options: [
        { text: 'Protecting others from digital threats', path: 'cyber_warrior' },
        { text: 'Creating new forms of consciousness', path: 'neural_architect' },
        { text: 'Discovering hidden truths of reality', path: 'quantum_mystic' },
        { text: 'Pushing the boundaries of human potential', path: 'bio_hacker' },
        { text: 'Moving unseen through digital shadows', path: 'data_phantom' },
        { text: 'Understanding the flow of time itself', path: 'time_weaver' }
      ]
    },
    {
      id: 'power',
      question: 'You discover a powerful artifact. What do you do?',
      options: [
        { text: 'Use it to defend the weak', path: 'cyber_warrior' },
        { text: 'Study its design principles', path: 'neural_architect' },
        { text: 'Meditate on its deeper meaning', path: 'quantum_mystic' },
        { text: 'Integrate it into your being', path: 'bio_hacker' },
        { text: 'Hide it from those who would misuse it', path: 'data_phantom' },
        { text: 'Examine its temporal properties', path: 'time_weaver' }
      ]
    },
    {
      id: 'challenge',
      question: 'Facing an impossible challenge, you...',
      options: [
        { text: 'Fight with honor and determination', path: 'cyber_warrior' },
        { text: 'Engineer a creative solution', path: 'neural_architect' },
        { text: 'Seek wisdom from ancient sources', path: 'quantum_mystic' },
        { text: 'Adapt and evolve to overcome it', path: 'bio_hacker' },
        { text: 'Find an alternative path in the shadows', path: 'data_phantom' },
        { text: 'Step back in time to prevent it', path: 'time_weaver' }
      ]
    },
    {
      id: 'preference',
      question: 'Your ideal digital environment is...',
      options: [
        { text: 'A fortress protecting the innocent', path: 'cyber_warrior' },
        { text: 'A workshop of infinite possibilities', path: 'neural_architect' },
        { text: 'A temple of universal knowledge', path: 'quantum_mystic' },
        { text: 'A laboratory of evolution', path: 'bio_hacker' },
        { text: 'A hidden network of secret passages', path: 'data_phantom' },
        { text: 'A nexus between past and future', path: 'time_weaver' }
      ]
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handlePathSelection = (pathId) => {
    setSelectedPath(pathId);
    setCurrentStep('questions');
  };

  const handleAnswer = (answer) => {
    const newChoices = { ...userChoices };
    newChoices[questions[currentQuestion].id] = answer;
    setUserChoices(newChoices);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate final destiny based on answers
      const pathCounts = {};
      Object.values(newChoices).forEach(choice => {
        pathCounts[choice.path] = (pathCounts[choice.path] || 0) + 1;
      });
      
      const finalPath = Object.entries(pathCounts).reduce((a, b) => 
        pathCounts[a[0]] > pathCounts[b[0]] ? a : b
      )[0];
      
      setSelectedPath(finalPath);
      setCurrentStep('result');
      setDestinyRevealed(true);
    }
  };

  const resetDestiny = () => {
    setSelectedPath(null);
    setUserChoices({});
    setCurrentStep('intro');
    setCurrentQuestion(0);
    setDestinyRevealed(false);
  };

  const playDestinyAudio = () => {
    const audio = new Audio('/fix-me-voice.mp3');
    audio.volume = 0.7;
    audio.play().catch(console.error);
  };

  useEffect(() => {
    if (destinyRevealed) {
      playDestinyAudio();
    }
  }, [destinyRevealed]);

  return (
    <section className="destiny-section" id="destiny">
      <div className="destiny-container">
        
        {/* Intro Step */}
        {currentStep === 'intro' && (
          <div className="destiny-intro">
            <h2 className="destiny-title">
              <span className="title-cyber">DISCOVER YOUR</span>
              <span className="title-destiny">DIGITAL DESTINY</span>
            </h2>
            <p className="destiny-subtitle">
              In the year 2049, every soul finds their true calling in the digital realm.
              What path will you choose to reshape reality?
            </p>
            
            <div className="destiny-paths">
              {destinyPaths.map(path => (
                <div 
                  key={path.id}
                  className={`destiny-path-card rarity-${path.rarity.toLowerCase()}`}
                  onClick={() => handlePathSelection(path.id)}
                  style={{ '--path-color': path.color }}
                >
                  <div className="card-header">
                    <div className="rarity-indicator">
                      <span className="rarity-badge">{path.rarity}</span>
                      <div className="rarity-stars">
                        {Array.from({ length: path.rarity === 'Mythic' ? 5 : path.rarity === 'Legendary' ? 4 : path.rarity === 'Epic' ? 3 : 2 }, (_, i) => (
                          <span key={i} className="star">★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="path-content">
                    <div className="path-icon-container">
                      <div className="path-icon">{path.icon}</div>
                      <div className="icon-glow"></div>
                    </div>
                    
                    <h3 className="path-title">{path.title}</h3>
                    <p className="path-description">{path.description}</p>
                    
                    <div className="path-traits">
                      {path.traits.map(trait => (
                        <span key={trait} className="trait-tag">{trait}</span>
                      ))}
                    </div>
                    
                    <div className="card-footer">
                      <button className="select-path-btn">
                        <span>Choose Path</span>
                        <span className="btn-arrow">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Questions Step */}
        {currentStep === 'questions' && (
          <div className="destiny-questions">
            <div className="question-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
              <span className="progress-text">
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>

            <div className="question-card">
              <h3 className="question-title">{questions[currentQuestion].question}</h3>
              <div className="question-options">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className="option-button"
                    onClick={() => handleAnswer(option)}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Result Step */}
        {currentStep === 'result' && selectedPath && (
          <div className="destiny-result">
            <div className="result-card">
              <div className="result-header">
                <div 
                  className="result-icon"
                  style={{ color: destinyPaths.find(p => p.id === selectedPath)?.color }}
                >
                  {destinyPaths.find(p => p.id === selectedPath)?.icon}
                </div>
                <h2 className="result-title">
                  Your Destiny: {destinyPaths.find(p => p.id === selectedPath)?.title}
                </h2>
              </div>
              
              <div className="result-content">
                <p className="result-description">
                  {destinyPaths.find(p => p.id === selectedPath)?.description}
                </p>
                <div className="result-outcome">
                  <h4>Your Future:</h4>
                  <p>{destinyPaths.find(p => p.id === selectedPath)?.outcome}</p>
                </div>
                
                <div className="result-traits">
                  <h4>Your Core Traits:</h4>
                  <div className="traits-list">
                    {destinyPaths.find(p => p.id === selectedPath)?.traits.map(trait => (
                      <span key={trait} className="result-trait">{trait}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="result-actions">
                <button className="discover-again-btn" onClick={resetDestiny}>
                  Discover Another Path
                </button>
                <button 
                  className="embrace-destiny-btn"
                  onClick={() => {
                    // Scroll to next section
                    document.dispatchEvent(new CustomEvent('destinyChosen', { 
                      detail: { path: selectedPath } 
                    }));
                  }}
                >
                  Embrace Your Destiny
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Background Effects */}
      <div className="destiny-bg-effects">
        <div className="floating-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              '--delay': `${i * 0.5}s`,
              '--duration': `${8 + i % 4}s`
            }}></div>
          ))}
        </div>
        <div className="neural-network">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="neural-line" style={{
              '--angle': `${i * 60}deg`,
              '--delay': `${i * 0.8}s`
            }}></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Destiny;
