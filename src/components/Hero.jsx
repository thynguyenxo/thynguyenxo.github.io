import React from 'react';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-header">
        <div className="hero-text">
          <h1 className="hero-name">Thy Nguyen</h1>
          <p className="hero-tagline">
            Product designer / vibe coder
          </p>
        </div>
        <div className="hero-portrait-container">
          <img
            src="/assets/notion-face-portrait.png"
            alt="Thy Nguyen"
            className="hero-portrait"
          />
        </div>
      </div>
      <p className="hero-description">
        Designing intuitive and polished digital products through strategic UX, visual clarity, and systems thinking—for startups and founders.
      </p>
    </section>
  );
}

export default Hero;

