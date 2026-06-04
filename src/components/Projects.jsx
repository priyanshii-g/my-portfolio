import React, { useState, useEffect, useMemo } from 'react';
import './Projects.css';

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace this string with your actual GitHub username!
  const githubUsername = 'priyanshii-g';

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        
        // Add the exact paths to your collaborative projects here (OwnerUsername/RepoName)
        const collaborativeRepos = [
          'AbhinavMisra69/think-fit', 
          'AbhinavMisra69/CargoVista-App',
        ];

        // 2. Fetch your personal repositories
        const personalResponse = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=50`);
        if (!personalResponse.ok) throw new Error('Failed to connect to GitHub');
        const personalRepos = await personalResponse.json();

        // 3. Fetch the collaborative repositories simultaneously
        // We use a safe fetch here so if one link breaks, it doesn't crash your whole portfolio
        const collabPromises = collaborativeRepos.map(repoPath =>
          fetch(`https://api.github.com/repos/${repoPath}`)
            .then(res => res.ok ? res.json() : null)
            .catch(() => null) 
        );
        
        // Wait for all collaborative repos to finish downloading, and filter out any broken ones
        const collabReposData = (await Promise.all(collabPromises)).filter(repo => repo !== null);

        // 4. Combine them into one massive list!
        const allRepos = [...collabReposData, ...personalRepos];

        // 5. Pin your absolute best work to the top
        const pinnedNames = ['think-fit', 'CargoVista-App', 'Real-Time-Speech-Emotion-Recognition', 'TutorTrail'];
        
        const pinnedRepos = allRepos.filter(repo => pinnedNames.includes(repo.name));
        const otherRepos = allRepos.filter(repo => !pinnedNames.includes(repo.name));

        // 6. Finalize the grid (Showing top 6)
        const finalDisplayRepos = [...pinnedRepos, ...otherRepos].slice(0, 6);

        setRepos(finalDisplayRepos);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const particles = useMemo(() => {
    const dots = [];
    const colors = ['#67e8f9', '#f9a8d4', '#fde047', '#86efac', '#d8b4fe']; 
    
    for (let i = 0; i < 300; i++) {
      const size = Math.random() * 3 + 2; 
      
      // THE FIX: Spawn from -20% to 120% so they cover the corners!
      const top = (Math.random() * 140) - 20; 
      const left = (Math.random() * 140) - 20; 
      
      const duration = Math.random() * 10 + 6; 
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
    <section className="projects-section" id="projects">
      {/* --- INJECT THE PARTICLES HERE --- */}
      <div className="floating-dots-container">
        {particles}
      </div>

      <div className="projects-header">
        <h2>Live Repository Feed</h2>
        <p>Recent commits and code dynamically fetched from GitHub.</p>
      </div>

      {/* 1. The Loading State */}
      {isLoading && (
        <div className="state-card">
          <div className="spinner"></div>
          <p>Fetching repositories...</p>
        </div>
      )}

      {/* 2. The Error State */}
      {error && (
        <div className="state-card error-card">
          <p>Oops! {error}. Please check your connection and refresh.</p>
        </div>
      )}

      {/* 3. The Success State (Dynamic Rendering) */}
      {!isLoading && !error && (
        <div className="projects-grid">
          {repos.map((repo, index) => {
            // Cycle through 5 pastel themes dynamically
            const themes = ['card-cyan', 'card-pink', 'card-yellow', 'card-green', 'card-purple'];
            const activeTheme = themes[index % themes.length];

            return (
              <div key={repo.id} className={`project-card ${activeTheme}`}>
                <h3 className="project-title">{repo.name}</h3>
                <p className="project-desc">
                  {repo.description || "No description provided for this repository."}
                </p>
                
                <div className="project-meta">
                  {repo.language && <span className="project-lang">{repo.language}</span>}
                  
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="project-link">
                    View Source ➔
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}