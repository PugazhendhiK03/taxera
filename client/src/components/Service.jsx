import React, { useState, useEffect, useRef } from 'react';
import '../styles/Service.css'; // Assuming you have a CSS file for styling

// Import your images
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

const services = {
  taxation: [
    { img: gstImg, title: "GST Registration & Filing", desc: "Get your GST number and file returns hassle-free!" },
    { img: incomeTaxImg, title: "Income Tax Filing", desc: "File your income tax returns accurately and on time!" },
    { img: tdsImg, title: "TDS Compliance & Filing", desc: "Ensure TDS compliance with expert assistance!" },
    { img: ptImg, title: "Professional Tax Filing", desc: "Seamless PT registration and filing services!" },
    { img: itaImg, title: "International Taxation & Advisory", desc: "Get expert advice on international taxation policies!" },
  ],
  accounting: [
    { img: bkImg, title: "Bookkeeping & Accounting", desc: "Accurate bookkeeping & financial records!" },
    { img: prImg, title: "Payroll Management", desc: "Manage salaries, EPF, and ESI hassle-free!" },
    { img: fspImg, title: "Financial Statements Preparation", desc: "Get professional financial statement preparation!" },
    { img: fpbImg, title: "Financial Planning & Budgeting", desc: "Optimize your finances with expert planning!" },
  ],
  business: [
    { img: msmeImg, title: "MSME (Udyam) Registration", desc: "Register your business easily as an MSME!" },
    { img: cpfImg, title: "Company Compliance Filings", desc: "Stay compliant with ROC & annual returns!" },
    { img: blcImg, title: "Business Licensing & Certification Assistance", desc: "Get licenses & certifications (FSSAI, IEC, etc.)" },
    { img: acsImg, title: "Audit & Compliance Support", desc: "Professional audit assistance & compliance!" },
  ],
};

const Service = () => {
  const [currentCategory, setCurrentCategory] = useState('taxation');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const trackRef = useRef(null);
  const cardRef = useRef(null);

  const showCategory = (category) => {
    setCurrentCategory(category);
    setCurrentSlide(0);
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  const nextSlide = () => {
    const servicesToShow = services[currentCategory];
    setCurrentSlide((prev) => (prev + 1) % servicesToShow.length);
  };

  const prevSlide = () => {
    const servicesToShow = services[currentCategory];
    setCurrentSlide((prev) => (prev - 1 + servicesToShow.length) % servicesToShow.length);
  };

  useEffect(() => {
    if (trackRef.current && cardRef.current) {
      const cardWidth = cardRef.current.offsetWidth;
      trackRef.current.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
    }
  }, [currentSlide, currentCategory]);

  // Touch and mouse event handlers
  const handleStart = (clientX) => {
    setStartX(clientX);
    setIsSwiping(true);
  };

  const handleMove = (clientX) => {
    if (!isSwiping) return;
    const moveX = clientX - startX;
    if (moveX > 50) {
      prevSlide();
      setIsSwiping(false);
    } else if (moveX < -50) {
      nextSlide();
      setIsSwiping(false);
    }
  };

  const handleEnd = () => {
    setIsSwiping(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentCategory]);

  return (
    <section className="services">
      <div className="service-title">
        <span className="service-text">Plan Your Taxes Today with Our Tax Consultants</span>
        <span className="service-subtitle">What Services Can You Get?</span>
      </div>

      {/* Tabs for Service Categories */}
      <div className="service-tabs">
        <button
          className={`tab-btn ${currentCategory === 'taxation' ? 'active' : ''}`}
          onClick={() => showCategory('taxation')}
        >
          Taxation & Compliance
        </button>
        <button
          className={`tab-btn ${currentCategory === 'accounting' ? 'active' : ''}`}
          onClick={() => showCategory('accounting')}
        >
          Accounting & Financial
        </button>
        <button
          className={`tab-btn ${currentCategory === 'business' ? 'active' : ''}`}
          onClick={() => showCategory('business')}
        >
          Business Compliance
        </button>
      </div>

      {/* Service Container (Cards) */}
      <div className="service-slider">
        <div
          className="service-track"
          ref={trackRef}
          onTouchStart={(e) => handleStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleMove(e.touches[0].clientX)}
          onTouchEnd={handleEnd}
          onMouseDown={(e) => handleStart(e.clientX)}
          onMouseMove={(e) => handleMove(e.clientX)}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
        >
          {services[currentCategory].map((service, i) => (
            <div
              key={i}
              className="service-card"
              ref={i === 0 ? cardRef : null}
            >
              <img 
                src={service.img} 
                alt={service.title} 
                className="service-image"
                loading="lazy"
              />
              <span className="service-card-title">{service.title}</span>
              <span className="service-card-desc">{service.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="pagination-dots">
        {services[currentCategory].map((_, i) => (
          <span
            key={i}
            className={`dot ${i === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(i)}
          />
        ))}
      </div>
    </section>
  );
};

export default Service;