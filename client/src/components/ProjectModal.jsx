import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ProjectModal.css';

const ProjectModal = ({ project, onClose }) => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/contact');
    onClose();
  };

  return (
    <div className="project-modal__overlay" onClick={onClose}>
      <div className="project-modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="project-modal__close-btn" onClick={onClose}>×</button>
        
        <div className="project-modal__header">
          <img 
            src={project.image} 
            alt={project.title}
            className="project-modal__image"
          />
          <h2 className="project-modal__title">{project.title}</h2>
        </div>
        
        <div className="project-modal__body">
          <p className="project-modal__description">{project.description}</p>
          
          <div className="project-modal__details">
            <h3 className="project-modal__subtitle">Project Details</h3>
            <ul className="project-modal__features">
              <li>Customized tax strategy implementation</li>
              <li>Regular compliance monitoring</li>
              <li>Quarterly financial reviews</li>
              <li>Dedicated account manager</li>
              <li>Ongoing support and consultation</li>
            </ul>
          </div>
          
          <div className="project-modal__results">
            <h3 className="project-modal__subtitle">Achieved Results</h3>
            <ul className="project-modal__features">
              <li>Average 25-30% tax savings</li>
              <li>100% compliance rate</li>
              <li>Reduced filing time by 40%</li>
              <li>Improved financial visibility</li>
            </ul>
          </div>
        </div>
        
        <div className="project-modal__footer">
          <button 
            className="project-modal__btn project-modal__btn--primary"
            onClick={handleGetStartedClick}
          >
            Get Started
          </button>
          <button 
            className="project-modal__btn project-modal__btn--secondary"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;