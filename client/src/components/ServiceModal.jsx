import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ServiceModal.css';

const ServiceModal = ({ service, onClose }) => {
  const navigate = useNavigate();

  const handleGetServiceClick = () => {
    navigate(service.link);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <div className="modal-header">
          <div className="modal-image-container">
            <img 
              src={service.img} 
              alt={service.title}
              className="modal-image"
            />
          </div>
          <h2>{service.title}</h2>
        </div>
        <div className="modal-body">
          <p>{service.description}</p>
          <div className="modal-features">
            <h3>Service Includes:</h3>
            <ul>
              {service.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="modal-footer">
          <button className="modal-button primary" onClick={handleGetServiceClick}>
            Get This Service
          </button>
          <button className="modal-button secondary" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;