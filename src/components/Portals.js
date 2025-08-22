import React from 'react';

const Portals = () => {
  const enterPortal = (type) => {
    const portals = {
      healthcare: "Entering Healthcare Dome... DNA sequences analyzing...",
      work: "Accessing Work Hub... Holographic colleagues materializing...",
      city: "Connecting to Smart City... Traffic algorithms optimizing...",
      creativity: "Opening Creativity Pod... Neural pathways synchronizing..."
    };
    
    alert(portals[type]);
    
    // Add glitch effect
    document.body.style.filter = 'hue-rotate(180deg) contrast(1.5)';
    setTimeout(() => {
      document.body.style.filter = 'none';
    }, 300);
  };

  const portalData = [
    {
      id: 'healthcare',
      title: 'HEALTHCARE DOME',
      description: 'DNA manipulation and regenerative medicine powered by quantum AI diagnostics'
    },
    {
      id: 'work',
      title: 'WORK HUB', 
      description: 'Collaborative virtual spaces where human creativity merges with artificial intelligence'
    },
    {
      id: 'city',
      title: 'SMART CITY',
      description: 'Autonomous transportation networks and holographic urban planning systems'
    },
    {
      id: 'creativity',
      title: 'CREATIVITY POD',
      description: 'Neural interfaces that amplify artistic expression through AI-enhanced imagination'
    }
  ];

  return (
    <section className="portals" id="portals">
      <div className="section-header">
        <h2 className="section-title">EXPLORE WORLDS</h2>
        <p className="section-subtitle">
          Step through holographic portals into different dimensions of AI-enhanced reality
        </p>
      </div>
      <div className="portals-grid">
        {portalData.map((portal) => (
          <div 
            key={portal.id}
            className="portal" 
            onClick={() => enterPortal(portal.id)}
          >
            <h3>{portal.title}</h3>
            <p>{portal.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Portals;