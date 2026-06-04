import React, { useRef, useMemo } from 'react';
import './Hobbies.css';

// --- THE MAGNETIC FLOATING CIRCLE COMPONENT ---
const FloatingCircle = ({ name, icon, theme, posClass, delay }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    card.style.transform = `translate(${x * 0.4}px, ${y * 0.4}px) scale(1.1)`;
    card.style.transition = 'transform 0.1s ease-out';
    card.style.zIndex = 10; 
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    card.style.transform = `translate(0px, 0px) scale(1)`;
    card.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'; 
    card.style.zIndex = 1;
  };

  return (
    <div className={`circle-wrapper ${posClass}`} style={{ animationDelay: delay }}>
      <div 
        ref={cardRef}
        className={`floating-circle ${theme}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <span className="circle-icon">{icon}</span>
        <span className="circle-name">{name}</span>
      </div>
    </div>
  );
};

// --- YOUR MAIN HOBBIES COMPONENT ---
export default function Hobbies() {
  const hobbies = [
    { name: "Meditation", icon: "🧘‍♀️", theme: "theme-indigo", posClass: "pos-top", delay: "0s" },
    { name: "Yoga", icon: "🌿", theme: "theme-emerald", posClass: "pos-right", delay: "-2s" },
    { name: "Dancing", icon: "💃", theme: "theme-rose", posClass: "pos-bottom-right", delay: "-4s" },
    { name: "Singing", icon: "🎤", theme: "theme-amber", posClass: "pos-bottom-left", delay: "-1s" },
    { name: "Reading", icon: "📚", theme: "theme-cyan", posClass: "pos-left", delay: "-3s" }
  ];

  // --- NEW: The Particle Generator (Same math as your Projects section) ---
  const particles = useMemo(() => {
    const dots = [];
    const colors = ['#67e8f9', '#f9a8d4', '#fde047', '#86efac', '#d8b4fe']; 
    
    for (let i = 0; i < 300; i++) { // Slightly fewer dots so it doesn't crowd the circles
      const size = Math.random() * 3 + 2; 
      const top = (Math.random() * 140) - 20; 
      const left = (Math.random() * 140) - 20; 
      const duration = Math.random() * 1 + 8; 
      const delay = Math.random() * -20; 
      
      dots.push(
        <div 
          key={i} 
          className="particle-dot"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
            backgroundColor: colors[i % colors.length],
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`
          }}
        ></div>
      );
    }
    return dots;
  }, []);

  return (
    <section className="hobbies-section" id="about">
      
      {/* --- NEW: The Dots Container --- */}
      <div className="floating-dots-container">
        {particles}
      </div>

      <div className="hobbies-header">
        <h2>Beyond the Screen</h2>
        <p>My approach to engineering and my passions outside of it.</p>
      </div>

      <div className="hobbies-content">
        <div className="philosophy-card">
          <h3 className="card-title">Code Philosophy</h3>
          <p className="philosophy-text">
            I love giving structure and functionality to code, and I'm very enthusiastic 
            about working upon the optimality of the systems I build. Whether it's refining 
            a routing algorithm or structuring a full-stack architecture, finding the most 
            elegant and efficient solution is what drives me.
          </p>
        </div>

        <div className="personal-hobbies">
          <h3 className="card-title text-center">Passions & Interests</h3>
          <div className="hobbies-circle-container">
            {hobbies.map((hobby, index) => (
              <FloatingCircle key={index} {...hobby} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}