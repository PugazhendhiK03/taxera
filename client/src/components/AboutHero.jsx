import React from 'react';
import '../styles/AboutHero.css';
import aboutHeroImg from '../assets/image/aboutHero.png'; // Replace with your actual image path
const AboutHero = () => {
  return (
    <section className="about-hero">
      <div className="about-hero-img">
        <img src={aboutHeroImg} alt="About Img" />
      </div>
      <div className="about-hero-content">
        <h1>About Taxera</h1>
        <p>Your trusted partner for tax consultancy and compliance services. We help you save time and taxes with our expert solutions.</p>
      </div>
    </section>
  );
};

export default AboutHero;