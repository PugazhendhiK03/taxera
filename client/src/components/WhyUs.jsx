import React from 'react';
import { Box, Typography } from '@mui/material';
import '../styles/WhyUs.css';

const WhyUs = () => {
  const features = [
    "100% Online Process – No paperwork, no office visits",
    "Affordable & Transparent Pricing – No hidden charges",
    "Timely Compliance Management – Never miss a deadline",
    "Expert Consultation – Professional tax advisors at your service",
    "Dedicated Support – Assistance via WhatsApp, Email & Call"
  ];

  return (
    <Box component="section" className="why-us">
      <Box className="container">
        <span variant="h2" component="h2">
          WHY CHOOSE TAXERA?
        </span>
        <Box component="ul" className="features">
          {features.map((feature, index) => (
            <Box 
              component="li" 
              key={index}
              className="feature-item"
            >
              {feature}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default WhyUs;