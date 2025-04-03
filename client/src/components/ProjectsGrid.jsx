import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import '../styles/ProjectsGrid.css';

// Import project images
import project1 from '../assets/image/project1.jpeg';
import project2 from '../assets/image/project2.jpg';
import project3 from '../assets/image/project3.jpg';
import project4 from '../assets/image/project4.jpeg';

const ProjectsGrid = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const projects = [
    {
      id: 1,
      image: project1,
      title: "Tax Optimization for SMEs",
      description: "Helped small and medium enterprises save up to 30% on taxes through strategic planning.",
      details: [
        "Customized tax strategy for each business",
        "Quarterly financial reviews",
        "Compliance monitoring system",
        "Average 28% tax savings achieved"
      ],
      results: [
        "Reduced tax liabilities by 25-30%",
        "100% compliance rate maintained",
        "40% reduction in filing time",
        "Improved financial decision-making"
      ],
      link: "/services/tax-optimization"
    },
    {
      id: 2,
      image: project2,
      title: "ITR Filing for Freelancers",
      description: "Streamlined income tax filing for over 500 freelancers, ensuring compliance and accuracy.",
      details: [
        "Dedicated tax consultant for each freelancer",
        "Automated expense tracking",
        "Quarterly tax estimates",
        "All forms and schedules included"
      ],
      results: [
        "500+ freelancers served",
        "99.8% accuracy rate",
        "Average refund increase of 18%",
        "Reduced audit risk by 65%"
      ],
      link: "/services/itr-filing"
    },
    {
      id: 3,
      image: project3,
      title: "TDS Compliance for Corporates",
      description: "Assisted large corporations in filing TDS returns on time, avoiding penalties.",
      details: [
        "End-to-end TDS management",
        "Monthly compliance reports",
        "Automated Form 16 generation",
        "Dedicated support team"
      ],
      results: [
        "100% on-time filings",
        "Zero penalty incidents",
        "30% reduction in compliance costs",
        "Improved employee satisfaction"
      ],
      link: "/services/tds-compliance"
    },
    {
      id: 4,
      image: project4,
      title: "Tax Planning for Startups",
      description: "Provided tailored tax planning solutions for startups to maximize savings.",
      details: [
        "Startup-specific tax strategies",
        "Investor-ready financials",
        "R&D credit optimization",
        "Equity compensation planning"
      ],
      results: [
        "Average 35% tax savings",
        "100% compliance rate",
        "Improved investor confidence",
        "Scalable tax infrastructure"
      ],
      link: "/services/startup-tax"
    }
  ];

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <section className="projects-grid">
      {projects.map(project => (
        <ProjectCard 
          key={project.id}
          image={project.image}
          title={project.title}
          description={project.description}
          onViewDetails={() => handleViewDetails(project)}
        />
      ))}

      {showModal && selectedProject && (
        <ProjectModal 
          project={selectedProject}
          onClose={closeModal}
        />
      )}
    </section>
  );
};

export default ProjectsGrid;