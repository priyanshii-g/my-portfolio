import React, { useRef } from 'react';
import './Education.css';

export default function Education() {
  const sectionRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    
    const cards = sectionRef.current.getElementsByClassName('info-card');
    for (const card of cards) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    }
  };

  const academics = [
    {
      degree: "Bachelor of Technology in CSE",
      institution: "Jaypee Institute of Information Technology, Noida",
      duration: "2023 - Present",
      highlight: "CGPA: 8.56",
      theme: "theme-indigo"
    },
    {
      degree: "Class 12th Boards (CBSE)",
      institution: "Delhi Public School, Aligarh",
      duration: "2022",
      highlight: "Scored 97.4% (PCM with Computer Science)",
      theme: "theme-emerald"
    }
  ];

  const achievements = [
    {
      title: "Elite-Gold Professional Certification",
      organization: "IIT Guwahati",
      description: "Earned an Elite-Gold certification in Neural Networks for Computer Vision and Natural Language Processing.",
      theme: "theme-amber"
    },
    {
      title: "Community Service",
      organization: "Art of Living Foundation",
      description: "Active volunteer contributing to community well-being and social initiatives.",
      theme: "theme-rose"
    }
  ];

  return (
    <section className="education-section" id="education">
      <div className="education-header">
        <h2>Background & Achievements</h2>
        <p>My academic foundation, professional certifications, and community involvement.</p>
      </div>

      <div className="education-grid" ref={sectionRef} onMouseMove={handleMouseMove}>
        
        <div className="education-column">
          <h3 className="column-title">Academic Journey</h3>
          <div className="card-stack">
            {academics.map((item, index) => (
              
              <div key={index} className={`info-card ${item.theme}`}>
                
                <div className="card-border-glow"></div>
                <div className="card-background-glow"></div>
                
                <div className="card-content-wrapper">
                  <div className="card-header">
                    <h4>{item.degree}</h4>
                    <span className={`badge ${item.theme}`}>{item.highlight}</span>
                  </div>
                  <p className="institution">{item.institution}</p>
                  <p className="duration">{item.duration}</p>
                </div>

              </div>
            ))}
          </div>
        </div>

        <div className="education-column">
          <h3 className="column-title">Certifications & Community</h3>
          <div className="card-stack">
            {achievements.map((item, index) => (
              <div key={index} className={`info-card ${item.theme}`}>
                
                <div className="card-border-glow"></div>
                <div className="card-background-glow"></div>

                <div className="card-content-wrapper">
                  <div className="card-header">
                    <h4>{item.title}</h4>
                    <span className={`badge ${item.theme}`}>{item.organization}</span>
                  </div>
                  <p className="description">{item.description}</p>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}