import React, { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <span className="logo-text">CYBERPUNK</span>
        </div>
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li><span className="nav-link" onClick={() => scrollToSection('hero')}>Home</span></li>
          <li><span className="nav-link" onClick={() => scrollToSection('timeline')}>Timeline</span></li>
          <li><span className="nav-link" onClick={() => scrollToSection('portals')}>Explore</span></li>
          <li><span className="nav-link" onClick={() => scrollToSection('toggle')}>Worlds</span></li>
          <li><span className="nav-link" onClick={() => scrollToSection('quiz')}>Quiz</span></li>
          <li><span className="nav-link" onClick={() => scrollToSection('contact')}>Contact</span></li>
        </ul>
        <div className={`nav-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;