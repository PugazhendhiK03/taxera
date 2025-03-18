function initializeTestimonialSlider() {
    let index = 0;
    let startX = 0;
    let isSwiping = false;

    const testimonials = document.getElementById("testimonial");
    const totalSlides = document.querySelectorAll(".testimonial-card").length;

    function showTestimonial() {
        const width = document.querySelector(".testimonial-card").offsetWidth;
        testimonials.style.transform = `translateX(-${index * width}px)`;
    }

    function nextTestimonial() {
        index = (index + 1) % totalSlides;
        showTestimonial();
    }

    function prevTestimonial() {
        index = (index - 1 + totalSlides) % totalSlides;
        showTestimonial();
    }

    // Auto-slide every 3 seconds
    let autoSlide = setInterval(nextTestimonial, 3000);

    // Touch event listeners for swipe gestures
    testimonials.addEventListener("touchstart", (e) => {
        clearInterval(autoSlide); // Pause auto-slide on interaction
        startX = e.touches[0].clientX;
        isSwiping = true;
    });

    testimonials.addEventListener("touchmove", (e) => {
        if (!isSwiping) return;
        let moveX = e.touches[0].clientX - startX;
        if (moveX > 50) {
            prevTestimonial();
            isSwiping = false;
        } else if (moveX < -50) {
            nextTestimonial();
            isSwiping = false;
        }
    });

    testimonials.addEventListener("touchend", () => {
        isSwiping = false;
        autoSlide = setInterval(nextTestimonial, 3000); // Resume auto-slide
    });

    // Mouse event listeners for swipe gestures (desktop support)
    testimonials.addEventListener("mousedown", (e) => {
        clearInterval(autoSlide);
        startX = e.clientX;
        isSwiping = true;
    });

    testimonials.addEventListener("mousemove", (e) => {
        if (!isSwiping) return;
        let moveX = e.clientX - startX;
        if (moveX > 50) {
            prevTestimonial();
            isSwiping = false;
        } else if (moveX < -50) {
            nextTestimonial();
            isSwiping = false;
        }
    });

    testimonials.addEventListener("mouseup", () => {
        isSwiping = false;
        autoSlide = setInterval(nextTestimonial, 3000);
    });

    // Adjust slider width on window resize
    window.addEventListener("resize", showTestimonial);
}

// Initialize the testimonial slider
document.addEventListener("DOMContentLoaded", initializeTestimonialSlider);