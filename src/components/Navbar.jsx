import React, { useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // This function flips the state between true and false
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      {/* Brand / Logo */}
      <div className="nav-brand">Priyanshi Garg</div>
      
      {/* The Hamburger Button (Shows ✖ if open, ☰ if closed) */}
      <button className="hamburger" onClick={toggleMenu} aria-label="Toggle navigation">
        {isOpen ? '✖' : '☰'}
      </button>
      
      {/* Navigation Links */}
      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        <li><a href="#home" onClick={toggleMenu}>Home</a></li>
        <li><a href="#projects" onClick={toggleMenu}>Projects</a></li>
        <li><a href="#skills" onClick={toggleMenu}>Skills</a></li>
        <li><a href="#contact" onClick={toggleMenu}>Contact</a></li>
      </ul>
    </nav>
  );
}