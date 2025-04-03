import React, { useState } from 'react';
import ProjectModal from './ProjectModal';
import '../styles/ProjectCard.css';

const ProjectCard = ({ image, title, description, link }) => {
  const [showModal, setShowModal] = useState(false);

  const handleViewDetails = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="project-card">
        <img 
          src={image} 
          alt={title}
          className="project-card__image"
          loading="lazy"
        />
        <div className="project-card__info">
          <h3 className="project-card__title">{title}</h3>
          <p className="project-card__description">{description}</p>
          <button 
            className="project-card__button"
            onClick={handleViewDetails}
          >
            View Details
          </button>
        </div>
      </div>

      {showModal && (
        <ProjectModal 
          project={{ image, title, description, link }}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default ProjectCard;