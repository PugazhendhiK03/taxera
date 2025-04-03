import React from 'react';
import ProjectsHero from '../components/ProjectsHero';
import ProjectsGrid from '../components/ProjectsGrid';
import ProjectsCTA from '../components/ProjectsCTA';
import '../styles/ProjectPage.css'; // Assuming you have a CSS file for styling

const ProjectPage = () => {
  return (
    <main className="projects-page">
      <ProjectsHero />
      <ProjectsGrid />
      <ProjectsCTA />
    </main>
  );
};

export default ProjectPage;