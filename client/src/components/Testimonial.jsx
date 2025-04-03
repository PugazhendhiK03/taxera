import React, { useState, useEffect, useRef } from 'react';
import '../styles/Testimonial.css';
import Client1Img from '../assets/image/client1.jpg';

const Testimonial = () => {
  const testimonials = [
    {
        text: "This<wbr></wbr> is an amazing<wbr></wbr> service!<wbr></wbr> Highly<wbr></wbr> recommended.",
      name: "John Doe",
      role: "Software Engineer",
      image: Client1Img
    },
    {
      text: "I had a great experience. Will use it again!",
      name: "Jane Smith",
      role: "Graphic Designer",
      image: Client1Img
    },
    {
      text: "Excellent quality and support. Very happy!",
      name: "Mark Wilson",
      role: "Entrepreneur",
      image: Client1Img
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(0);
  const [isSwiping, setIsSwiping] = useState(false);
  const testimonialRef = useRef(null);
  const cardRef = useRef(null);
  let autoSlideInterval = useRef(null);

  const showTestimonial = () => {
    if (cardRef.current && testimonialRef.current) {
      const width = cardRef.current.offsetWidth;
      testimonialRef.current.style.transform = `translateX(-${currentIndex * width}px)`;
    }
  };

  const nextTestimonial = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const startAutoSlide = () => {
    autoSlideInterval.current = setInterval(nextTestimonial, 3000);
  };

  const stopAutoSlide = () => {
    clearInterval(autoSlideInterval.current);
  };

  const handleStart = (clientX) => {
    stopAutoSlide();
    setStartX(clientX);
    setIsSwiping(true);
  };

  const handleMove = (clientX) => {
    if (!isSwiping) return;
    const moveX = clientX - startX;
    if (moveX > 50) {
      prevTestimonial();
      setIsSwiping(false);
    } else if (moveX < -50) {
      nextTestimonial();
      setIsSwiping(false);
    }
  };

  const handleEnd = () => {
    setIsSwiping(false);
    startAutoSlide();
  };

  useEffect(() => {
    showTestimonial();
    startAutoSlide();

    const handleResize = () => showTestimonial();
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(autoSlideInterval.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [currentIndex]);

  return (
    <section className="testimonials">
      <span className="testimonial-title">Customers <wbr />Testimonials</span>
      <div className="testimonial-container">
        <div 
          className="testimonial" 
          ref={testimonialRef}
          // ... (keep all existing event handlers)
        >
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="testimonial-card"
              ref={index === 0 ? cardRef : null}
            >
              <p 
                className="testimonial-text" 
                dangerouslySetInnerHTML={{ __html: `"${testimonial.text}"` }}
              />
              <div className="author">
                <img src={testimonial.image} alt={testimonial.name} />
                <h4 dangerouslySetInnerHTML={{ __html: testimonial.name }} />
                <span dangerouslySetInnerHTML={{ __html: testimonial.role }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;