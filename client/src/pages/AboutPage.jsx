import React from 'react';
import AboutHero from '../components/AboutHero';
import AboutMission from '../components/AboutMission';
import AboutVision from '../components/AboutVision';
import AboutServices from '../components/AboutServices';
import AboutFounder from '../components/AboutFounder';
import AboutAchievements from '../components/AboutAchivements';
import '../styles/AboutPage.css'; // Assuming you have a CSS file for styling

const AboutPage = () => {
  return (
    <main className="about">
      <AboutHero />
      <AboutMission />
      <AboutVision />
      <AboutServices />
      <AboutFounder />
      <AboutAchievements />
    </main>
  );
};

export default AboutPage;