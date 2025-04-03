import React from 'react';
import '../styles/ContactPage.css'; // Assuming you have a CSS file for styling
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

const ContactInfo = () => {
  return (
    <section className="contact-info-section">
      <div className="contact-info-card">
        <FaPhoneAlt className="contact-info-icon" />
        <h3>Call Us</h3>
        <p>+91 93421 27722</p>
      </div>
      <div className="contact-info-card">
        <FaMapMarkerAlt className="contact-info-icon" />
        <h3>Our Office</h3>
        <p>Chennai - 600119</p>
      </div>
      <div className="contact-info-card">
        <FaEnvelope className="contact-info-icon" />
        <h3>Email Us</h3>
        <p>cs.taxera@gmail.com</p>
      </div>
    </section>
  );
};

export default ContactInfo;