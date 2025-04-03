import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProjectsCTA.css'; // Assuming you have a CSS file for styling

const ProjectsCTA = () => {
  return (
    <section className="projects-cta">
      <h2 className="projects-cta__title">Have a Project in Mind?</h2>
      <p className="projects-cta__description">
        Let us help you achieve your financial goals. Contact us today!
      </p>
      <Link to="/contact" className="projects-cta__button">Get Started</Link>
    </section>
  );
};

export default ProjectsCTA;