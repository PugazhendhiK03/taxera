import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ServiceHero.css'; // Assuming you have a CSS file for styling

const ServicesHero = () => {
  return (
    <section className="services-hero">
      <h1>Our Services</h1>
      <p>We offer a wide range of tax-related services to help you save time and money.</p>
      <div className="hero-buttons">
        <Link to="#services-list" className="btn-primary">Explore Services</Link>
        <Link to="/contact" className="btn-secondary">Contact Us</Link>
      </div>
    </section>
  );
};

export default ServicesHero;