import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faCogs, faHandHoldingUsd, faChartLine } from '@fortawesome/free-solid-svg-icons';
import '../styles/AboutAchivements.css'; // Assuming you have a CSS file for styling

const AboutAchievements = () => {
  return (
    <section className="about-achievements">
      <h2>Key Achievements</h2>
      <div className="achievements-grid">
        <div className="achievement-card">
          <FontAwesomeIcon icon={faGlobe} />
          <p>Managed tax compliance across multiple countries for seven+ entities.</p>
        </div>
        <div className="achievement-card">
          <FontAwesomeIcon icon={faCogs} />
          <p>Automated bookkeeping and financial processes, improving efficiency.</p>
        </div>
        <div className="achievement-card">
          <FontAwesomeIcon icon={faHandHoldingUsd} />
          <p>Optimized AP/AR workflows, enhancing cash flow management.</p>
        </div>
        <div className="achievement-card">
          <FontAwesomeIcon icon={faChartLine} />
          <p>Supported startups in fundraising and investor compliance.</p>
        </div>
      </div>
    </section>
  );
};

export default AboutAchievements;