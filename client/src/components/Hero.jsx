import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Hero.css'; // Assuming you have a CSS file for styling

const Hero = () => {
  return (
    <section className="hero" id="hero">
      <span className="hero-title">Welcome To <span>TaxEra</span></span>
      <span className="hero-text">Save Time, Save Tax!</span>
      <span className="hero-subtitle">
        <strong></strong>Hassle-free online tax and compliance services for individuals and businesses.
      </span>
      <Link to="/booking" className="btn">
        <button className="ctn-btn">Book Free <wbr />Consultation</button>
      </Link>
    </section>
  );
};

export default Hero;