import React, { useState } from 'react';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!email) {
      alert('Neural signature required for transmission!');
      return;
    }
    
    // Dramatic finale effect
    document.body.style.animation = 'hologramFlicker 2s ease-out';
    
    setTimeout(() => {
      alert(`Neural profile registered for ${email}. Welcome to the future, digital citizen.`);
      document.body.style.animation = 'none';
      
      // Clear form
      setEmail('');
      setMessage('');
    }, 2000);
  };

  return (
    <section className="finale" id="contact">
      <div className="finale-billboard">
        <div className="finale-text">
          The future isn't written yet — will you shape it?
        </div>
      </div>
      
      <div className="contact-form">
        <h3>Join the Future</h3>
        <div className="form-group">
          <input 
            type="email" 
            placeholder="Enter your neural signature (email)" 
            className="cyber-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <textarea 
            placeholder="What's your vision for AI's future?" 
            className="cyber-textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <button className="subscribe-btn" onClick={handleSubmit}>
          TRANSMIT TO FUTURE
        </button>
      </div>
    </section>
  );
};

export default Contact;