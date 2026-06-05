import React from 'react';
import './Skills.css';
import { useScrollReveal } from '../useScrollReveal';

export default function Skills() {
  const sectionRef = useScrollReveal();
  const skillCategories = [
    {
      title: "Frontend & UI",
      glowColor: "rgba(103, 232, 249, 0.4)", // Pastel Cyan
      theme: "theme-cyan",
      skills: ["React.js", "Next.js", "JavaScript", "HTML5", "CSS3", "Bootstrap"]
    },
    {
      title: "Backend & Databases",
      glowColor: "rgba(134, 239, 172, 0.4)", // Pastel Light Green
      theme: "theme-green",
      skills: ["Node.js", "Express", "RESTful APIs", "MongoDB", "MySQL", "PHP", "EJS"]
    },
    {
      title: "AI, ML & Core Logic",
      glowColor: "rgba(253, 224, 71, 0.4)", // Pastel Yellow
      theme: "theme-yellow",
      skills: ["Python", "TensorFlow/Keras", "CNN-LSTM", "C++", "C", "Data Structures", "OOP"]
    },
    {
      title: "Tools & Environments",
      glowColor: "rgba(249, 168, 212, 0.4)", // Pastel Pink
      theme: "theme-pink",
      skills: ["Git", "GitHub", "Linux", "UNIX", "Computer Networks"]
    }
  ];

  // This function tracks the mouse position exactly over the individual card
  const handleMouseMove = (e) => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Injects the exact X and Y pixel coordinates into CSS variables
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section className="skills-section reveal-on-scroll" id="skills" ref={sectionRef}>
      <div className="skills-header">
        <h2>Technical Arsenal</h2>
        <p>A balanced stack across full-stack development, systems logic, and machine learning.</p>
      </div>

      <div className="skills-grid">
        {skillCategories.map((category, index) => (
          <div 
            key={index} 
            className="skill-card"
            onMouseMove={handleMouseMove}
            style={{ "--card-glow": category.glowColor }} // Assigns the unique color to this card
          >
            <div className="card-content">
              <h3 className="category-title">{category.title}</h3>
              <div className="skill-pills">
                {category.skills.map((skill, skillIndex) => (
                  <span 
                    key={skillIndex} 
                    className={`skill-pill ${category.theme}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}