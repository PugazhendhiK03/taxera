import React from 'react';
import '../styles/ContactPage.css'; // Assuming you have a CSS file for styling
import ContactHero from '../components/ContactHero';
import ContactForm from '../components/ContactForm';
import ContactInfo from '../components/ContactInfo';
import GoogleMap from '../components/GoogleMap';

const ContactPage = () => {
  return (
    <main className="contact-container">
      <ContactHero />
      <ContactForm />
      <ContactInfo />
      <GoogleMap />
    </main>
  );
};

export default ContactPage;