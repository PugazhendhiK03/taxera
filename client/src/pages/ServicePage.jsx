import React from 'react';
import ServicesHero from '../components/ServiceHero';
import ServicesList from '../components/ServiceList';
import ServicesCTA from '../components/ServiceCTA';
import '../styles/ServicePage.css'; // Assuming you have a CSS file for styling

const ServicePage = () => {
  return (
    <main className="service-page">
      <ServicesHero />
      <ServicesList />
      <ServicesCTA />
    </main>
  );
};

export default ServicePage;