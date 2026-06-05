import React, { Suspense } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx'; 
const Skills = React.lazy(() => import('./components/Skills.jsx'))
const Projects = React.lazy(() => import('./components/Projects.jsx'))
const Education = React.lazy(() => import('./components/Education.jsx'));
const Hobbies = React.lazy(() => import('./components/Hobbies.jsx'));

export default function App() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
        <Hobbies />
        <Skills />
        <Projects />
        <Education />
      </Suspense>
    </main>
  );
}
