import React, { useState, useEffect } from 'react';

const Auth = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  // Load users from localStorage on component mount
  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('cyberpunk_users') || '[]');
    setUsers(savedUsers);
  }, []);

  // Save users to localStorage
  const saveUsers = (userList) => {
    localStorage.setItem('cyberpunk_users', JSON.stringify(userList));
    setUsers(userList);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Neural ID required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Neural ID must be at least 3 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Digital signature required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid digital signature format';
    }

    if (!formData.password) {
      newErrors.password = 'Access code required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Access code must be at least 6 characters';
    }

    if (isSignUp) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirm access code required';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Access codes do not match';
      }

      // Check if user already exists
      const existingUser = users.find(user => 
        user.email === formData.email || user.username === formData.username
      );
      if (existingUser) {
        if (existingUser.email === formData.email) {
          newErrors.email = 'This digital signature is already registered';
        }
        if (existingUser.username === formData.username) {
          newErrors.username = 'This Neural ID is already taken';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      if (isSignUp) {
        // Sign Up Logic
        const newUser = {
          id: Date.now(),
          username: formData.username,
          email: formData.email,
          password: formData.password, // In production, this should be hashed
          createdAt: new Date().toISOString(),
          level: 1,
          xp: 0,
          achievements: []
        };

        const updatedUsers = [...users, newUser];
        saveUsers(updatedUsers);
        
        // Store current user session
        localStorage.setItem('cyberpunk_current_user', JSON.stringify({
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
          level: newUser.level,
          xp: newUser.xp
        }));

        onAuthSuccess({
          type: 'signup',
          user: newUser,
          message: 'Neural interface established! Welcome to CyberPunk.'
        });

      } else {
        // Sign In Logic
        const user = users.find(u => 
          (u.email === formData.email || u.username === formData.email) && 
          u.password === formData.password
        );

        if (user) {
          // Store current user session
          localStorage.setItem('cyberpunk_current_user', JSON.stringify({
            id: user.id,
            username: user.username,
            email: user.email,
            level: user.level || 1,
            xp: user.xp || 0
          }));

          onAuthSuccess({
            type: 'signin',
            user: user,
            message: `Welcome back, ${user.username}! Neural link reestablished.`
          });
        } else {
          setErrors({ 
            general: 'Invalid credentials. Neural connection failed.' 
          });
        }
      }
    } catch (error) {
      setErrors({ 
        general: 'System malfunction. Please try again.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <div className="auth-header">
          <h2 className="auth-title">
            <span className="auth-icon">🔐</span>
            {isSignUp ? 'Neural Registration' : 'Neural Authentication'}
          </h2>
          <button className="auth-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="auth-content">
          <div className="auth-description">
            {isSignUp 
              ? 'Initialize your neural interface and join the CyberPunk network'
              : 'Reestablish your neural connection to access CyberPunk'
            }
          </div>

          {errors.general && (
            <div className="error-message general-error">
              <span className="error-icon">⚠️</span>
              {errors.general}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">
                🆔 Neural ID {!isSignUp && '/ Digital Signature'}
              </label>
              <input
                type="text"
                name={isSignUp ? 'username' : 'email'}
                value={isSignUp ? formData.username : formData.email}
                onChange={handleInputChange}
                className={`form-input ${errors.username || errors.email ? 'error' : ''}`}
                placeholder={isSignUp ? 'Choose your neural ID...' : 'Neural ID or digital signature...'}
                disabled={isLoading}
              />
              {(errors.username || errors.email) && (
                <span className="error-text">{errors.username || errors.email}</span>
              )}
            </div>

            {isSignUp && (
              <div className="form-group">
                <label className="form-label">📧 Digital Signature</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="your.digital@signature.net"
                  disabled={isLoading}
                />
                {errors.email && (
                  <span className="error-text">{errors.email}</span>
                )}
              </div>
            )}

            <div className="form-group">
              <label className="form-label">🔑 Access Code</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Enter your secure access code..."
                disabled={isLoading}
              />
              {errors.password && (
                <span className="error-text">{errors.password}</span>
              )}
            </div>

            {isSignUp && (
              <div className="form-group">
                <label className="form-label">🔐 Confirm Access Code</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder="Confirm your access code..."
                  disabled={isLoading}
                />
                {errors.confirmPassword && (
                  <span className="error-text">{errors.confirmPassword}</span>
                )}
              </div>
            )}

            <button 
              type="submit" 
              className={`auth-submit ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner">⚡</span>
                  {isSignUp ? 'Establishing Neural Link...' : 'Authenticating...'}
                </>
              ) : (
                <>
                  <span className="submit-icon">
                    {isSignUp ? '🚀' : '⚡'}
                  </span>
                  {isSignUp ? 'Initialize Neural Interface' : 'Establish Connection'}
                </>
              )}
            </button>
          </form>

          <div className="auth-toggle">
            <span className="toggle-text">
              {isSignUp 
                ? 'Already have a neural interface?' 
                : 'Need to initialize your neural interface?'
              }
            </span>
            <button 
              className="toggle-button"
              onClick={toggleAuthMode}
              disabled={isLoading}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </div>

          {/* Demo credentials for testing */}
          {!isSignUp && (
            <div className="demo-info">
              <div className="demo-title">🧪 Demo Access:</div>
              <div className="demo-credentials">
                <div>Neural ID: <code>demo</code></div>
                <div>Access Code: <code>demo123</code></div>
              </div>
            </div>
          )}
        </div>

        <div className="auth-bg-effects">
          <div className="auth-particle"></div>
          <div className="auth-particle"></div>
          <div className="auth-particle"></div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
