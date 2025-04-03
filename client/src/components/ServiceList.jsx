import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ServiceModal from './ServiceModal';
import '../styles/ServiceList.css';

// Import all service images
import gstImg from '../assets/image/gst.png';
import incomeTaxImg from '../assets/image/incometax.jpg';
import tdsImg from '../assets/image/tds.jpeg';
import ptImg from '../assets/image/pt.jpg';
import itaImg from '../assets/image/ita.jpg';
import bkImg from '../assets/image/bk.jpg';
import prImg from '../assets/image/pr.jpg';
import fspImg from '../assets/image/fsp.png';
import fpbImg from '../assets/image/fpb.jpeg';
import msmeImg from '../assets/image/msme.jpg';
import cpfImg from '../assets/image/cpf.jpeg';
import blcImg from '../assets/image/blc.png';
import acsImg from '../assets/image/acs.jpg';

const ServicesList = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleLearnMoreClick = (service, e) => {
    e.preventDefault();
    setSelectedService(service);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const serviceCategories = [
    {
      name: "Taxation & Compliance",
      services: [
        {
          img: gstImg,
          title: "GST Registration & Filing",
          description: "Get your GST number and file returns hassle-free!",
          link: "/services/gst",
          details: [
            "Complete GST registration process",
            "Monthly/quarterly return filing",
            "GST reconciliation services",
            "Input tax credit optimization",
            "GST audit and compliance"
          ]
        },
        {
          img: incomeTaxImg,
          title: "Income Tax Filing",
          description: "File your income tax returns accurately and on time!",
          link: "/services/income-tax",
          details: [
            "ITR preparation and filing",
            "Tax saving investment advisory",
            "Capital gains tax planning",
            "NRI taxation services",
            "Tax notice resolution"
          ]
        },
        {
          img: tdsImg,
          title: "TDS Compliance & Filing",
          description: "Ensure TDS compliance with expert assistance!",
          link: "/services/tds",
          details: [
            "TDS return preparation and filing",
            "TDS certificate issuance",
            "Quarterly TDS compliance",
            "TDS assessment representation",
            "TDS refund processing"
          ]
        },
        {
          img: ptImg,
          title: "Professional Tax Filing",
          description: "Seamless PT registration and filing services!",
          link: "/services/professional-tax",
          details: [
            "Professional tax registration",
            "Monthly/quarterly returns",
            "PT compliance advisory",
            "PT assessment support",
            "PT certificate issuance"
          ]
        },
        {
          img: itaImg,
          title: "International Taxation & Advisory",
          description: "Get expert advice on international taxation policies!",
          link: "/services/international-tax",
          details: [
            "DTAA advisory services",
            "Transfer pricing compliance",
            "Foreign tax credit planning",
            "Expatriate taxation",
            "FEMA compliance advisory"
          ]
        }
      ]
    },
    {
      name: "Accounting & Financial",
      services: [
        {
          img: bkImg,
          title: "Bookkeeping & Accounting",
          description: "Accurate bookkeeping & financial records!",
          link: "/services/bookkeeping",
          details: [
            "Daily transaction recording",
            "Bank reconciliation",
            "Accounts payable/receivable",
            "Financial statement preparation",
            "Chart of accounts setup"
          ]
        },
        {
          img: prImg,
          title: "Payroll Management",
          description: "Manage salaries, EPF, and ESI hassle-free!",
          link: "/services/payroll",
          details: [
            "Salary processing",
            "PF/ESI compliance",
            "Professional tax deduction",
            "Form 16 generation",
            "Payroll reporting"
          ]
        },
        {
          img: fspImg,
          title: "Financial Statements Preparation",
          description: "Get professional financial statement preparation!",
          link: "/services/financial-statements",
          details: [
            "Balance sheet preparation",
            "Profit & loss statements",
            "Cash flow statements",
            "Notes to accounts",
            "Financial ratio analysis"
          ]
        },
        {
          img: fpbImg,
          title: "Financial Planning & Budgeting",
          description: "Optimize your finances with expert planning!",
          link: "/services/financial-planning",
          details: [
            "Annual budget preparation",
            "Cash flow forecasting",
            "Financial modeling",
            "Investment planning",
            "Cost reduction strategies"
          ]
        }
      ]
    },
    {
      name: "Business Compliance",
      services: [
        {
          img: msmeImg,
          title: "MSME (Udyam) Registration",
          description: "Register your business easily as an MSME!",
          link: "/services/msme-registration",
          details: [
            "MSME registration process",
            "Documentation assistance",
            "Benefits advisory",
            "Renewal services",
            "Government scheme access"
          ]
        },
        {
          img: cpfImg,
          title: "Company Compliance Filings",
          description: "Stay compliant with ROC & annual returns!",
          link: "/services/company-compliance",
          details: [
            "Annual return filing",
            "Board meeting minutes",
            "Director's report preparation",
            "ROC form submissions",
            "Compliance calendar"
          ]
        },
        {
          img: blcImg,
          title: "Business Licensing & Certification",
          description: "Get licenses & certifications (FSSAI, IEC, etc.)",
          link: "/services/business-licensing",
          details: [
            "Trade license registration",
            "FSSAI license assistance",
            "IEC code registration",
            "Shop & establishment license",
            "Other regulatory licenses"
          ]
        },
        {
          img: acsImg,
          title: "Audit & Compliance Support",
          description: "Professional audit assistance & compliance!",
          link: "/services/audit-support",
          details: [
            "Statutory audit support",
            "Tax audit representation",
            "Internal audit services",
            "Stock audit assistance",
            "Compliance audit"
          ]
        }
      ]
    }
  ];

  return (
    <section className="services-list">
      {serviceCategories.map((category, index) => (
        <div key={index} className="services-list__category">
          <h2 className="services-list__category-title">{category.name}</h2>
          <div className="services-list__grid">
            {category.services.map((service, serviceIndex) => (
              <div className="services-list__card" key={serviceIndex}>
                <div className="services-list__card-image-container">
                  <img 
                    src={service.img} 
                    alt={service.title}
                    className="services-list__card-image"
                    loading="lazy"
                  />
                </div>
                <div className="services-list__card-content">
                  <h3 className="services-list__card-title">{service.title}</h3>
                  <p className="services-list__card-description">{service.description}</p>
                  <a 
                    href="#" 
                    className="services-list__card-button"
                    onClick={(e) => handleLearnMoreClick(service, e)}
                  >
                    Learn More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
  
      {showModal && selectedService && (
        <ServiceModal 
          service={selectedService} 
          onClose={closeModal} 
        />
      )}
    </section>
  );
};

export default ServicesList;