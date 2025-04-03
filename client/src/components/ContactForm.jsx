import React from 'react';
import '../styles/ContactPage.css'; // Assuming you have a CSS file for styling

const ContactForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    formData.append('_subject', 'New Contact Request');

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        alert('Thank you for contacting us! We will get back to you soon.');
        form.reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      alert('Oops! Something went wrong. Please try again later.');
    }
  };

  return (
    <section className="contact-form-section">
      <div className="contact-form-container">
        <form 
          id="contactForm" 
          action="https://formspree.io/f/xrbpelqa" 
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="contact-form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Enter your name" required />
          </div>
          <div className="contact-form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required />
          </div>
          <div className="contact-form-group">
            <label htmlFor="phone">Phone</label>
            <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" required />
          </div>
          <div className="contact-form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" placeholder="Enter your message" rows="5" required></textarea>
          </div>
          <button type="submit" className="contact-submit-btn">Send Message</button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;