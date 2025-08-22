import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="cyberpunk-footer">
      <div className="footer-content">
        {/* Main Footer */}
        <div className="footer-main">
          <div className="footer-brand">
            <h2 className="brand-name">
              <span className="cyber-text">CYBER</span>
              <span className="punk-text">PUNK</span>
            </h2>
            <p className="brand-tagline">
              Exploring Tomorrow's Digital Frontiers
            </p>
          </div>

          <div className="footer-links">
            <div className="link-group">
              <h3>Explore</h3>
              <a href="#timeline">Timeline</a>
              <a href="#portals">Worlds</a>
              <a href="#contact">Contact</a>
            </div>
            
            <div className="link-group">
              <h3>Connect</h3>
              <a href="https://github.com" className="social-link" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://twitter.com" className="social-link" target="_blank" rel="noopener noreferrer">Twitter</a>
              <a href="https://discord.com" className="social-link" target="_blank" rel="noopener noreferrer">Discord</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <span className="copyright">
            © {currentYear} CyberPunk. All rights reserved.
          </span>
          <div className="footer-legal">
            <a href="/privacy" rel="noopener noreferrer">Privacy</a>
            <a href="/terms" rel="noopener noreferrer">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
