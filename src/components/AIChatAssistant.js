import React, { useState, useRef, useEffect } from 'react';

const AIChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'ai', text: 'Hello! I\'m your AI guide. Ask me about the future of artificial intelligence!' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const aiResponses = {
    'hello': 'Greetings, digital traveler! Welcome to the neural network.',
    'ai': 'Artificial Intelligence is evolving rapidly. By 2030, we\'ll see autonomous cities!',
    'future': 'The future holds incredible possibilities - from neural interfaces to space exploration.',
    '2025': 'In 2025, AI assistants will become truly intuitive, understanding emotions and context.',
    '2030': 'Smart cities with drone networks and AI governance will emerge by 2030.',
    '2040': 'Human-AI collaboration will reach new heights, creating unprecedented innovations.',
    '2050': 'Interstellar exploration guided by AI will open infinite cosmic possibilities.',
    'games': 'Try the timeline games! Test your neural reflexes and hack the mainframe.',
    'voice': 'I use advanced speech synthesis. Click the cyberpunk girl to hear her voice!',
    'technology': 'Quantum computing, neural networks, and biotech will reshape reality.',
    'default': 'That\'s fascinating! The future of AI holds endless mysteries to explore.'
  };

  const getAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(aiResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return aiResponses.default;
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue;
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = getAIResponse(userMessage);
      setMessages(prev => [...prev, { type: 'ai', text: aiResponse }]);
      setIsTyping(false);

      // Add voice response
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(aiResponse);
        utterance.rate = 0.8;
        utterance.pitch = 1.2;
        
        const voices = speechSynthesis.getVoices();
        const femaleVoice = voices.find(voice => 
          voice.name.toLowerCase().includes('female') || 
          voice.name.toLowerCase().includes('samantha') ||
          voice.name.toLowerCase().includes('zira')
        );
        
        if (femaleVoice) {
          utterance.voice = femaleVoice;
        }
        
        speechSynthesis.speak(utterance);
      }
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const quickQuestions = [
    "Tell me about AI in 2030",
    "What games can I play?",
    "How does the voice work?",
    "What's the future like?"
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="ai-chat-toggle">
        <button 
          className={`chat-toggle-btn ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          title="Chat with AI Assistant"
        >
          🤖
          <span className="chat-indicator">AI</span>
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="ai-chat-window">
          <div className="chat-header">
            <h3>🤖 AI Assistant</h3>
            <button className="chat-close" onClick={() => setIsOpen(false)}>×</button>
          </div>
          
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.type}`}>
                <div className="message-content">
                  {message.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message ai typing">
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="quick-questions">
            {quickQuestions.map((question, index) => (
              <button 
                key={index}
                className="quick-question"
                onClick={() => {
                  setInputValue(question);
                  setTimeout(handleSend, 100);
                }}
              >
                {question}
              </button>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about the future..."
              className="chat-input-field"
            />
            <button onClick={handleSend} className="chat-send-btn">
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatAssistant;
