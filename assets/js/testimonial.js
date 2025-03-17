let index = 0;
        function showTestimonial() {
            const testimonials = document.getElementById("testimonial");
            const width = document.querySelector(".testimonial-card").offsetWidth;
            testimonials.style.transform = `translateX(-${index * width}px)`;
        }

        function nextTestimonial() {
            index = (index + 1) % 3;
            showTestimonial();
        }

        function prevTestimonial() {
            index = (index - 1 + 3) % 3;
            showTestimonial();
        }