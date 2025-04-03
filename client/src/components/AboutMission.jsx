import React from 'react';
import '../styles/AboutMission.css'; // Assuming you have a CSS file for styling
import missionImg from '../assets/image/mission.png'; // Replace with your actual image path

const AboutMission = () => {
  return (
    <section className="about-mission">
      <div className="mission-content">
        <h2>Our Mission</h2>
        <p>To help businesses and individuals save time and money through expert tax planning and compliance solutions.</p>
      </div>
      <div className="mission-image">
        <img src={missionImg} alt="Our Mission" />
      </div>
    </section>
  );
};

export default AboutMission;