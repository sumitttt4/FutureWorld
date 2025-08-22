import React, { useEffect, useState } from 'react';

const Timeline = ({ onAchievement }) => {
  const [activeGame, setActiveGame] = useState(null);
  const [gameScores, setGameScores] = useState({});

  useEffect(() => {
    const panels = document.querySelectorAll('.timeline-panel');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.3 });

    panels.forEach(panel => {
      observer.observe(panel);
    });

    return () => {
      panels.forEach(panel => {
        observer.unobserve(panel);
      });
    };
  }, []);

  // Game: Memory Pattern (2025)
  const MemoryGame = ({ onScore }) => {
    const [sequence, setSequence] = useState([]);
    const [playerSequence, setPlayerSequence] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [level, setLevel] = useState(1);
    const [showSequence, setShowSequence] = useState(false);

    const colors = ['#00ffff', '#ff00ff', '#00ff00', '#ffff00'];

    const startGame = () => {
      const newSequence = [Math.floor(Math.random() * 4)];
      setSequence(newSequence);
      setPlayerSequence([]);
      setIsPlaying(true);
      setShowSequence(true);
      setTimeout(() => setShowSequence(false), 1000);
    };

    const handleClick = (index) => {
      if (!isPlaying || showSequence) return;
      
      const newPlayerSequence = [...playerSequence, index];
      setPlayerSequence(newPlayerSequence);

      if (newPlayerSequence[newPlayerSequence.length - 1] !== sequence[newPlayerSequence.length - 1]) {
        setIsPlaying(false);
        onScore(level - 1);
        return;
      }

      if (newPlayerSequence.length === sequence.length) {
        const newLevel = level + 1;
        setLevel(newLevel);
        onScore(newLevel);
        setPlayerSequence([]);
        setTimeout(() => {
          const nextSequence = [...sequence, Math.floor(Math.random() * 4)];
          setSequence(nextSequence);
          setShowSequence(true);
          setTimeout(() => setShowSequence(false), 1000);
        }, 500);
      }
    };

    return (
      <div className="mini-game memory-game">
        <h4>Neural Memory Test</h4>
        <p>Level: {level} | Score: {level - 1}</p>
        <div className="memory-grid">
          {colors.map((color, index) => (
            <div
              key={index}
              className={`memory-button ${showSequence && sequence.includes(index) ? 'active' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
        {!isPlaying && (
          <button className="game-start-btn" onClick={startGame}>
            Start Neural Sync
          </button>
        )}
      </div>
    );
  };

  // Game: Reaction Test (2030)
  const ReactionGame = ({ onScore }) => {
    const [isWaiting, setIsWaiting] = useState(false);
    const [canClick, setCanClick] = useState(false);
    const [reactionTime, setReactionTime] = useState(null);
    const [startTime, setStartTime] = useState(null);

    const startReaction = () => {
      setIsWaiting(true);
      setCanClick(false);
      setReactionTime(null);
      
      const delay = Math.random() * 3000 + 1000;
      setTimeout(() => {
        setCanClick(true);
        setStartTime(Date.now());
      }, delay);
    };

    const handleClick = () => {
      if (!canClick) {
        setIsWaiting(false);
        setReactionTime("Too early!");
        return;
      }
      
      const time = Date.now() - startTime;
      setReactionTime(time);
      setCanClick(false);
      setIsWaiting(false);
      onScore(Math.max(1000 - time, 0));
    };

    return (
      <div className="mini-game reaction-game">
        <h4>Cyber Reflexes</h4>
        <div 
          className={`reaction-zone ${canClick ? 'active' : ''} ${isWaiting ? 'waiting' : ''}`}
          onClick={handleClick}
        >
          {!isWaiting && !canClick && "Click to Start"}
          {isWaiting && !canClick && "Wait for green..."}
          {canClick && "CLICK NOW!"}
        </div>
        {reactionTime && (
          <p>Reaction: {typeof reactionTime === 'number' ? `${reactionTime}ms` : reactionTime}</p>
        )}
        {!isWaiting && !canClick && reactionTime === null && (
          <button className="game-start-btn" onClick={startReaction}>
            Test Reflexes
          </button>
        )}
      </div>
    );
  };

  // Game: Code Breaker (2040)
  const CodeBreakerGame = ({ onScore }) => {
    const [code, setCode] = useState('');
    const [playerInput, setPlayerInput] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [isWon, setIsWon] = useState(false);

    const generateCode = () => {
      const newCode = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      setCode(newCode);
      setPlayerInput('');
      setAttempts(0);
      setIsWon(false);
    };

    const checkCode = () => {
      setAttempts(attempts + 1);
      if (playerInput === code) {
        setIsWon(true);
        onScore(Math.max(100 - attempts * 10, 10));
      }
    };

    const getHint = () => {
      let hint = '';
      for (let i = 0; i < 4; i++) {
        if (playerInput[i] === code[i]) {
          hint += '✓ ';
        } else if (code.includes(playerInput[i])) {
          hint += '? ';
        } else {
          hint += '✗ ';
        }
      }
      return hint;
    };

    return (
      <div className="mini-game code-breaker">
        <h4>Hack the Mainframe</h4>
        <p>Attempts: {attempts}</p>
        <input
          type="text"
          maxLength="4"
          value={playerInput}
          onChange={(e) => setPlayerInput(e.target.value.replace(/\D/g, ''))}
          placeholder="Enter 4-digit code"
          className="code-input"
        />
        <button onClick={checkCode} disabled={playerInput.length !== 4 || isWon}>
          Hack
        </button>
        {playerInput.length === 4 && attempts > 0 && !isWon && (
          <p>Hint: {getHint()}</p>
        )}
        {isWon && <p>Access Granted!</p>}
        <button className="game-start-btn" onClick={generateCode}>
          New Target
        </button>
      </div>
    );
  };

  // Game: Space Navigation (2050)
  const SpaceGame = ({ onScore }) => {
    const [ship, setShip] = useState({ x: 50, y: 50 });
    const [targets, setTargets] = useState([]);
    const [score, setScore] = useState(0);
    const [gameActive, setGameActive] = useState(false);

    useEffect(() => {
      if (!gameActive) return;

      const interval = setInterval(() => {
        setTargets(prev => [
          ...prev.filter(t => Date.now() - t.time < 3000),
          {
            x: Math.random() * 90,
            y: Math.random() * 90,
            id: Date.now(),
            time: Date.now()
          }
        ].slice(-5));
      }, 1000);

      return () => clearInterval(interval);
    }, [gameActive]);

    const moveShip = (e) => {
      if (!gameActive) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setShip({ x, y });

      // Check for target hits
      targets.forEach(target => {
        const distance = Math.sqrt(
          Math.pow(target.x - x, 2) + Math.pow(target.y - y, 2)
        );
        if (distance < 5) {
          setScore(prev => prev + 10);
          setTargets(prev => prev.filter(t => t.id !== target.id));
        }
      });
    };

    const startGame = () => {
      setGameActive(true);
      setScore(0);
      setTargets([]);
      setTimeout(() => {
        setGameActive(false);
        onScore(score);
      }, 15000);
    };

    return (
      <div className="mini-game space-game">
        <h4>Stellar Navigation</h4>
        <p>Score: {score}</p>
        <div className="space-field" onMouseMove={moveShip}>
          <div 
            className="ship" 
            style={{ left: `${ship.x}%`, top: `${ship.y}%` }}
          />
          {targets.map(target => (
            <div
              key={target.id}
              className="target"
              style={{ left: `${target.x}%`, top: `${target.y}%` }}
            />
          ))}
        </div>
        {!gameActive && (
          <button className="game-start-btn" onClick={startGame}>
            Launch Mission
          </button>
        )}
      </div>
    );
  };

  const timelineData = [
    {
      year: "2025",
      description: "AI personal assistants become ubiquitous, seamlessly integrated into daily life, understanding context and emotion.",
      game: MemoryGame
    },
    {
      year: "2030", 
      description: "Smart cities emerge with autonomous drones and neural network infrastructure governing urban life.",
      game: ReactionGame
    },
    {
      year: "2040",
      description: "Human-AI collaboration reaches new heights as artificial minds become true partners in creativity and problem-solving.",
      game: CodeBreakerGame
    },
    {
      year: "2050",
      description: "Interstellar exploration begins as AI navigates humanity toward the stars, opening infinite possibilities.",
      game: SpaceGame
    }
  ];

  const handleGameScore = (year, score) => {
    setGameScores(prev => {
      const newScore = Math.max(prev[year] || 0, score);
      const oldScore = prev[year] || 0;
      
      // Trigger achievements based on scores
      if (newScore > oldScore && onAchievement) {
        if (score >= 100) {
          onAchievement('century_club');
        }
        if (score >= 500) {
          onAchievement('high_scorer');
        }
        if (score >= 1000) {
          onAchievement('legendary_gamer');
        }
        
        // First game completion
        if (oldScore === 0 && newScore > 0) {
          onAchievement('first_game');
        }
        
        // Year-specific achievements
        if (year === '2025' && newScore > 50) {
          onAchievement('time_traveler_2025');
        }
        if (year === '2030' && newScore > 50) {
          onAchievement('time_traveler_2030');
        }
        if (year === '2040' && newScore > 50) {
          onAchievement('time_traveler_2040');
        }
        if (year === '2050' && newScore > 50) {
          onAchievement('time_traveler_2050');
        }
      }
      
      return {
        ...prev,
        [year]: newScore
      };
    });
  };

  const toggleGame = (year) => {
    setActiveGame(activeGame === year ? null : year);
  };

  const handleImageClick = () => {
    // Play a voice message when clicking the cyberpunk girl
    if ('speechSynthesis' in window) {
      const messages = [
        "Welcome to my world, digital traveler.",
        "The future is now, are you ready?",
        "Neural pathways synchronized. Let's explore together.",
        "I am your guide through the cyber dimensions.",
        "The timeline of AI evolution awaits your discovery."
      ];
      
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      const utterance = new SpeechSynthesisUtterance(randomMessage);
      utterance.rate = 0.8;
      utterance.pitch = 1.3; // Higher pitch for female voice
      utterance.volume = 0.7;
      
      // Try to use a female voice
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
      
      speechSynthesis.speak(utterance);
      
      // Add visual effect
      const heroElement = document.querySelector('.timeline-hero');
      if (heroElement) {
        heroElement.style.filter = 'hue-rotate(90deg) brightness(1.3)';
        setTimeout(() => {
          heroElement.style.filter = 'none';
        }, 1000);
      }
    }
  };

  return (
    <section className="timeline" id="timeline">
      <div className="section-header">
        <h2 className="section-title">THE TIMELINE</h2>
        <p className="section-subtitle">
          Journey through the evolution of artificial intelligence and test your skills in each era
        </p>
      </div>
      
      {/* Cyberpunk Hero Image */}
      <div className="timeline-hero" onClick={handleImageClick}>
        <img 
          src="/cyberpunk-girl.png" 
          alt="Cyberpunk Future Girl" 
          className="cyberpunk-girl"
          onError={(e) => {
            e.target.src = '/cyberpunk-girl.svg';
            e.target.style.objectFit = 'contain';
          }}
        />
        <div className="hero-overlay">
          <h3 className="hero-text">Welcome to the Neural Age</h3>
          <p className="hero-subtitle">Where humanity and AI converge</p>
          <div className="click-hint">Click me to hear my voice</div>
        </div>
        <div className="scan-lines"></div>
      </div>
      
      {/* Timeline Grid */}
      <div className="timeline-grid">
        {timelineData.map((item, index) => (
          <div key={index} className="timeline-panel" data-year={item.year}>
            <div className="timeline-year">{item.year}</div>
            <div className="timeline-description">
              {item.description}
            </div>
            <button 
              className="game-toggle-btn"
              onClick={() => toggleGame(item.year)}
            >
              {activeGame === item.year ? 'Close Game' : 'Play Game'}
              {gameScores[item.year] && ` (Best: ${gameScores[item.year]})`}
            </button>
            {activeGame === item.year && (
              <div className="game-container">
                <item.game onScore={(score) => handleGameScore(item.year, score)} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;