import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoiceDollar, faBook, faBriefcase } from '@fortawesome/free-solid-svg-icons';
import '../styles/AboutServices.css'; // Assuming you have a CSS file for styling

const AboutServices = () => {
  return (
    <section className="about-services">
      <h2>Our Services</h2>
      <div className="services-grid">
        <div className="service-card">
          <FontAwesomeIcon icon={faFileInvoiceDollar} />
          <h3>Taxation & Compliance</h3>
          <ul>
            <li>GST Registration & Filing</li>
            <li>Income Tax Filing</li>
            <li>TDS Compliance</li>
            <li>International Taxation</li>
          </ul>
        </div>
        <div className="service-card">
          <FontAwesomeIcon icon={faBook} />
          <h3>Accounting & Financial Services</h3>
          <ul>
            <li>Bookkeeping & Accounting</li>
            <li>Payroll Management</li>
            <li>Financial Statement Preparation</li>
            <li>Tax Planning & Advisory</li>
          </ul>
        </div>
        <div className="service-card">
          <FontAwesomeIcon icon={faBriefcase} />
          <h3>Business Compliance & Advisory</h3>
          <ul>
            <li>MSME Registration</li>
            <li>Company Compliance Filings</li>
            <li>Business Licensing Assistance</li>
            <li>Audit & Compliance Support</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutServices;