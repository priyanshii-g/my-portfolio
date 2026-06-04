import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Education from './components/Education.jsx'
import Hobbies from './components/Hobbies.jsx'

function App() {
  return (
  <>
    <Navbar />
    <Hero />
    <Hobbies />
    <Skills />
    <Projects />
    <Education />
  </>
  )
}

export default App
