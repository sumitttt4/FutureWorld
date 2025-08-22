import React, { useState } from 'react';

const Quiz = () => {
  const [showResult, setShowResult] = useState(false);
  const [currentResult, setCurrentResult] = useState(null);

  const results = {
    architect: {
      title: "THE ARCHITECT",
      description: "You will design the neural frameworks that shape tomorrow's reality."
    },
    guardian: {
      title: "THE GUARDIAN", 
      description: "You will protect human values as we navigate the age of artificial minds."
    },
    explorer: {
      title: "THE EXPLORER",
      description: "You will venture into uncharted digital realms, discovering new possibilities."
    },
    connector: {
      title: "THE CONNECTOR",
      description: "You will bridge the gap between human emotion and artificial intelligence."
    }
  };

  const handleShowResult = (role) => {
    setCurrentResult(results[role]);
    setShowResult(true);
  };

  const quizOptions = [
    { id: 'architect', title: 'ARCHITECT', subtitle: 'Design the systems' },
    { id: 'guardian', title: 'GUARDIAN', subtitle: 'Protect humanity' },
    { id: 'explorer', title: 'EXPLORER', subtitle: 'Discover possibilities' },
    { id: 'connector', title: 'CONNECTOR', subtitle: 'Bridge worlds' }
  ];

  return (
    <section className="quiz" id="quiz">
      <div className="section-header">
        <h2 className="section-title">YOUR DESTINY</h2>
        <p className="section-subtitle">
          Discover your role in shaping the AI-powered future
        </p>
      </div>
      
      {!showResult && (
        <>
          <div className="quiz-question">What's your role in the AI Future?</div>
          <div className="quiz-options">
            {quizOptions.map((option) => (
              <div 
                key={option.id}
                className="quiz-option" 
                onClick={() => handleShowResult(option.id)}
              >
                {option.title}<br />
                <small>{option.subtitle}</small>
              </div>
            ))}
          </div>
        </>
      )}

      {showResult && currentResult && (
        <div className="quiz-result show">
          <h3>{currentResult.title}</h3>
          <p>{currentResult.description}</p>
          <button 
            className="cta-button"
            onClick={() => setShowResult(false)}
            style={{ marginTop: '1rem' }}
          >
            Try Again
          </button>
        </div>
      )}
    </section>
  );
};

export default Quiz;