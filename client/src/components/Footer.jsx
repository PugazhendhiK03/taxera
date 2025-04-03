import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="support">
        <div className="support-content">
          <span>Need support ?</span>
          <span><i className="fas fa-phone-alt"></i> +91 93421 27722</span>
          <span><i className="fas fa-envelope"></i> cs.taxera@gmail.com</span>
        </div>
        <div className="social-icons">
          <a href="https://www.facebook.com/profile.php?id=61574495906906&sk=following" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://www.linkedin.com/in/tax-era-376500357" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://youtube.com/@taxera-v7k?si=cIUfXd5KuXz0ZLEW" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube"></i>
          </a>
          <a href="https://www.instagram.com/cs.taxera?igsh=ZGQ3dm9nenR5dm9v&utm_source=qr" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
      
      <div className="footer-links">
        <div className="column">
          <span>Quick Links</span>
          <div>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </div>
        </div>
        <div className="column">
          <span>Products</span>
          <div>
            <li><Link to="/projects">File Income Tax Return</Link></li>
            <li><Link to="/projects">Upload Form 16</Link></li>
            <li><Link to="/projects">CA Assisted ITR Filing</Link></li>
          </div>
        </div>
        <div className="column">
          <span>Services</span>
          <div>
            <li><Link to="/services">Income Tax Filing</Link></li>
            <li><Link to="/services">TDS Returns</Link></li>
            <li><Link to="/services">Tax Planning</Link></li>
          </div>
        </div>
      </div>
      
      <p className="copyright">© {new Date().getFullYear()} TAXERA. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;