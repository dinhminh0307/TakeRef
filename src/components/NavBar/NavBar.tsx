import React, { useState } from 'react';
import './NavBar.css';

interface NavBarProps {
  className?: string;
}

const NavBar: React.FC<NavBarProps> = ({ className = '' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${className}`}>
      <div className="navbar-container">
        {/* Logo/Brand */}
        <div className="navbar-brand">
          <a href="/" className="brand-link">
            TakeRef
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <div className={`navbar-menu ${isMenuOpen ? 'is-active' : ''}`}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <a href="/" className="nav-link" onClick={closeMenu}>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="/about" className="nav-link" onClick={closeMenu}>
                About
              </a>
            </li>
            <li className="nav-item">
              <a href="/prices" className="nav-link" onClick={closeMenu}>
                Prices
              </a>
            </li>
            <li className="nav-item">
              <a href="/contact" className="nav-link" onClick={closeMenu}>
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div className="navbar-burger" onClick={toggleMenu}>
          <span className={`burger-line ${isMenuOpen ? 'is-active' : ''}`}></span>
          <span className={`burger-line ${isMenuOpen ? 'is-active' : ''}`}></span>
          <span className={`burger-line ${isMenuOpen ? 'is-active' : ''}`}></span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;