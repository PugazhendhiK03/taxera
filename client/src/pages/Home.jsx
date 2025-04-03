import { Container } from '@mui/material';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Goals from '../components/Goals';
import Service from '../components/Service';
import BookingMethod from '../components/BookingMethod';
import '../styles/Home.css';
import WhyUs from '../components/WhyUs.jsx';
import Testimonial from '../components/Testimonial.jsx';

const Home = () => {
  return (
    <Container maxWidth={false} disableGutters className="home-container">
      {/* Hero Section */}
      <Hero />
      
      {/* Goals Section */}
      <Goals />
      
      {/* Services Section */}
      <Service />
      
      {/* Booking Method Section */}
      <BookingMethod />

      {/* Why Choose Us Section */}
      <WhyUs/>

      {/* Testimonial Section */}
      <Testimonial/>

    </Container>
  );
};

export default Home;