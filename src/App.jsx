import React, { useState, useEffect } from 'react';
import './App.css';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';
import DarkModeToggle from './components/DarkModeToggle';

function App() {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return saved === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Apply dark mode class to document
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Save preference to localStorage
    localStorage.setItem('darkMode', isDark.toString());
  }, [isDark]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="app">
      <section className="dark-mode-section">
        <DarkModeToggle isDark={isDark} toggleDarkMode={toggleDarkMode} />
      </section>
      <Hero />
      <Projects />
      <Contact />
    </div>
  );
}

export default App;

