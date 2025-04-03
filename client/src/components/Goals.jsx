import React from 'react';
import { 
  FaUsers, 
  FaShieldAlt, 
  FaPiggyBank, 
  FaLaptopCode 
} from 'react-icons/fa';
import '../styles/Goals.css';

const Goals = () => {
  return (
    <section className="goals">
      <span>
        <strong><big>Our Goal:</big></strong> Helping businesses stay compliant with tax laws while saving time and money!
      </span>
      <span>
        <wbr />Need Expert Assistance? <wbr /> 
        WhatsApp Us Now{' '}
        <a href="https://wa.me/9342127722" target="_blank" rel="noopener noreferrer">
          +91 93421 27722
        </a>
      </span>
      
      <div className="goals-grid">
        <div className="goal-card">
          <FaUsers className="goal-icon" />
          <span>4.8</span>
          <span>Google Ratings</span>
        </div>
        <div className="goal-card">
          <FaShieldAlt className="goal-icon" />
          <span>100+</span>
          <span>Satisfied Customers</span>
        </div>
        <div className="goal-card">
          <FaPiggyBank className="goal-icon" />
          <span>1+ Lakh</span>
          <span>Saved Already!</span>
        </div>
        <div className="goal-card">
          <FaLaptopCode className="goal-icon" />
          <span>7+ Years</span>
          <span>Industry Experience</span>
        </div>
      </div>
    </section>
  );
};

export default Goals;