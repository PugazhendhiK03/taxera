import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import '../styles/BookingMethod.css';

const BookingMethod = () => {
  const steps = [
    { icon: 'fa-user-plus', text: 'Book a Call with Expert' },
    { icon: 'fa-file-alt', text: 'Explain Your Query' },
    { icon: 'fa-indian-rupee-sign', text: 'Understand Pricing' },
    { icon: 'fa-credit-card', text: 'Pay the Fees' },
    { icon: 'fa-comments', text: 'Get Personalized Services' }
  ];

  return (
    <Box component="section" className="booking">
      <span variant="h3" component="h2" className="booking-title">
        How To Get <span className="highlight">Our Services?</span>
      </span>
      
      <Box className="booking-steps">
        {steps.map((step, index) => (
          <Box key={index} className="step">
            <Box className="step-number">{index + 1}</Box>
            <i className={`fa-solid ${step.icon} step-icon`}></i>
            <Typography variant="body1" component="p">{step.text}</Typography>
          </Box>
        ))}
      </Box>
      
      <Link to="/booking" className="advice-btn">
        <Button 
          variant="contained" 
          className="booking-btn"
          endIcon={<i className="fas fa-arrow-up-right-from-square btn-icon"></i>}
        >
          Get Tax Advice!
        </Button>
      </Link>
    </Box>
  );
};

export default BookingMethod;