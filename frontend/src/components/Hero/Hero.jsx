import React from 'react';
import './Hero.css';
import hero_image from '../Assets/omnamahshivayya.png'; // Use transparent PNG

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div className="hero-text">
          <h1>new <span role="img" aria-label="wave">👋</span></h1>
          <h1>collections</h1>
          <h1>for everyone</h1>
        </div>
        <button className="latest-button">Latest Collection →</button>
      </div>

      <div className="hero-right">
        <img src={hero_image} alt="hero model" />
      </div>
    </div>
  );
};

export default Hero;
