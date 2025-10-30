import React from 'react';

function DarkModeToggle({ isDark, toggleDarkMode }) {
  return (
    <button
      className="dark-mode-toggle"
      onClick={toggleDarkMode}
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <img 
          src="/assets/sun-svgrepo-com.svg" 
          alt="Sun icon"
          className="dark-mode-icon"
        />
      ) : (
        <img 
          src="/assets/moon-svgrepo-com.svg" 
          alt="Moon icon"
          className="dark-mode-icon"
        />
      )}
    </button>
  );
}

export default DarkModeToggle;

