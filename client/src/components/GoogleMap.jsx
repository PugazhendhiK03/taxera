import React from 'react';
import '../styles/ContactPage.css'; // Assuming you have a CSS file for styling

const GoogleMap = () => {
  return (
    <section className="google-map-section">
      <h2>Our Location</h2>
      <iframe
        title="Our Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31114.760197935593!2d80.22596769999998!3d12.885521899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525b9b5d63cd89%3A0x15ef36517defe7!2sChennai%2C%20Tamil%20Nadu%20600119!5e0!3m2!1sen!2sin!4v1742372578641!5m2!1sen!2sin"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>
  );
};

export default GoogleMap;