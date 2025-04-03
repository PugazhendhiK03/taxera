import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ServiceCTA.css'; // Assuming you have a CSS file for styling

const ServicesCTA = () => {
  return (
    <section className="cta-section">
      <h2>Need Help with Your Taxes?</h2>
      <p>Contact us today to get expert advice and support for all your tax-related needs.</p>
      <Link to="/contact" className="btn-primary">Contact Us</Link>
    </section>
  );
};

export default ServicesCTA;