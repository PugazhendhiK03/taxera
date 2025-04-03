import React from 'react';
import '../styles/AboutFounder.css'; // Assuming you have a CSS file for styling
import founderImg from '../assets/image/mani.png';

const AboutFounder = () => {
  return (
    <section className="about-founder">
      <h2>Meet Our Founder</h2>
      <div className="founder-profile">
        <div className="founder-image">
          <img src={founderImg} alt="Mani Murugan" />
        </div>
        <div className="founder-details">
          <h3>Mani Murugan</h3>
          <p><strong>Founder & Tax Consultant</strong></p>
          <p>Mani Murugan is a finance and tax consultant with 7+ years of experience in taxation, bookkeeping, payroll management, and business compliance. He has successfully managed financial operations for over seven entities across India, the US, the UK, Malaysia, Singapore, Indonesia, and Dubai.</p>
          <p><strong>Key Expertise:</strong></p>
          <ul>
            <li>Tax Compliance (GST, TDS, Income Tax)</li>
            <li>Bookkeeping & Accounting</li>
            <li>Payroll Processing & Compliance</li>
            <li>Financial Statements & Reporting</li>
            <li>Business Financial Consulting</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutFounder;