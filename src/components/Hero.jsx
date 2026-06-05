import React, { useState, useEffect } from 'react';
import './Hero.css';
import profilePic from '../assets/profile.webp';

// --- THE TYPEWRITER & SPARKS COMPONENT ---
const TypewriterWithSparks = ({ textToType }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [sparks, setSparks] = useState([]);
  const [textColor, setTextColor] = useState('inherit');

  // Your vibrant pastel palette
  const colors = ['#67e8f9', '#f9a8d4', '#fde047', '#86efac', '#d8b4fe'];

  useEffect(() => {
    let timeout;
    
    const handleTyping = () => {
      const currentLength = displayedText.length;
      const fullLength = textToType.length;

      if (!isDeleting && currentLength < fullLength) {
        // 1. Typing Forward
        setDisplayedText(textToType.slice(0, currentLength + 1));
        setTextColor('inherit'); // Keep normal text color while typing
        
        // Generate 2-3 colorful sparks per keystroke
        const sparkCount = Math.floor(Math.random() * 2) + 2; 
        const newSparks = Array.from({ length: sparkCount }).map(() => {
          const sparkColor = colors[Math.floor(Math.random() * colors.length)];
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * 50 + 20; // Explosion radius
          
          return {
            id: Date.now() + Math.random(),
            color: sparkColor,
            tx: Math.cos(angle) * distance,
            ty: Math.sin(angle) * distance,
            size: Math.random() * 4 + 3,
          };
        });
        
        setSparks(prev => [...prev, ...newSparks]);
        
        // Clean up sparks after their 1-second animation finishes
        setTimeout(() => {
          setSparks(prev => prev.filter(s => !newSparks.some(ns => ns.id === s.id)));
        }, 1000);

        timeout = setTimeout(handleTyping, 60); // Typing speed
        
      } else if (!isDeleting && currentLength === fullLength) {
        // 2. Pause at the end before deleting
        timeout = setTimeout(() => setIsDeleting(true), 2500);
        
      } else if (isDeleting && currentLength > 0) {
        // 3. Deleting Backward (The Colorful Disappearing Act!)
        setDisplayedText(textToType.slice(0, currentLength - 1));
        
        // Rapidly flash through the pastel palette as it erases
        setTextColor(colors[Math.floor(Math.random() * colors.length)]);
        
        timeout = setTimeout(handleTyping, 30); // Fast erase speed
        
      } else if (isDeleting && currentLength === 0) {
        // 4. Pause before restarting the endless loop
        setIsDeleting(false);
        setTextColor('inherit');
        timeout = setTimeout(handleTyping, 800);
      }
    };

    timeout = setTimeout(handleTyping, 100);
    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, textToType]);

  return (
    <h2 className="title typewriter-container">
      <span style={{ color: textColor, transition: 'color 0.1s ease' }}>
        {displayedText}
      </span>
      <span className="typewriter-cursor">
        |
        {/* Render the sparks physically attached to the cursor */}
        {sparks.map(spark => (
          <span
            key={spark.id}
            className="typewriter-spark"
            style={{
              backgroundColor: spark.color,
              boxShadow: `0 0 10px ${spark.color}`, // The Neon Glow
              width: `${spark.size}px`,
              height: `${spark.size}px`,
              '--tx': `${spark.tx}px`,
              '--ty': `${spark.ty}px`
            }}
          />
        ))}
      </span>
    </h2>
  );
};


// --- YOUR MAIN HERO COMPONENT ---
// --- YOUR MAIN HERO COMPONENT ---
export default function Hero() {
  return (
    <section className="hero" id="home">
      
      {/* --- NEW: The Ambient Frosted Glass Background --- */}
      <div className="hero-background">
        <div className="glass-blob blob-cyan"></div>
        <div className="glass-blob blob-pink"></div>
        <div className="glass-blob blob-yellow"></div>
        <div className="glass-blob blob-green"></div>
        <div className="glass-blob blob-purple"></div>
      </div>

      <div className="hero-content">
        <p className="greeting">Hi, I'm</p>
        <h1 className="name">Priyanshi Garg</h1>
        
        {/* Your awesome typewriter is here */}
        <TypewriterWithSparks textToType="Web Developer Intern @ NoQs Digital & CS Engineering Student" />
        
        <p className="bio">
          I build high-performance web applications and machine learning systems. 
          Whether I am engineering full-stack platforms, optimizing C++ routing algorithms, 
          or designing CNN-LSTM architectures, I focus on turning complex logic into 
          seamless digital experiences.
        </p>
        
        <div className="hero-buttons">
          <a href="#projects" className="btn-primary">View My Work</a>
          <a href="mailto:priyanshiig2004@gmail.com" className="btn-secondary">Let's Talk</a>
        </div>
      </div>
      
      <div className="hero-image-container">
        <div className="image-placeholder">
          <img 
            src={profilePic} 
            alt="Priyanshi Garg - Profile" 
            width="150" 
            height="150"  
            className = "profile-picture"
          />
        </div>
      </div>
    </section>
  );
}