const services = {
    taxation: [
        { img: "assets/image/gst.png", title: "GST Registration & Filing", desc: "Get your GST number and file returns hassle-free!" },
        { img: "assets/image/incometax.jpg", title: "Income Tax Filing", desc: "File your income tax returns accurately and on time!" },
        { img: "assets/image/tds.jpeg", title: "TDS Compliance & Filing", desc: "Ensure TDS compliance with expert assistance!" },
        { img: "assets/image/pt.jpg", title: "Professional Tax Filing", desc: "Seamless PT registration and filing services!" },
        { img: "assets/image/ita.jpg", title: "International Taxation & Advisory", desc: "Get expert advice on international taxation policies!" },
    ],
    accounting: [
        { img: "assets/image/bk.jpg", title: "Bookkeeping & Accounting", desc: "Accurate bookkeeping & financial records!" },
        { img: "assets/image/pr.jpg", title: "Payroll Management", desc: "Manage salaries, EPF, and ESI hassle-free!" },
        { img: "assets/image/fsp.png", title: "Financial Statements Preparation", desc: "Get professional financial statement preparation!" },
        { img: "assets/image/fpb.jpeg", title: "Financial Planning & Budgeting", desc: "Optimize your finances with expert planning!" },
    ],
    business: [
        { img: "assets/image/msme.jpg", title: "MSME (Udyam) Registration", desc: "Register your business easily as an MSME!" },
        { img: "assets/image/cpf.jpeg", title: "Company Compliance Filings", desc: "Stay compliant with ROC & annual returns!" },
        { img: "assets/image/blc.png", title: "Business Licensing & Certification Assistance", desc: "Get licenses & certifications (FSSAI, IEC, etc.)" },
        { img: "assets/image/acs.jpg", title: "Audit & Compliance Support", desc: "Professional audit assistance & compliance!" },
    ],
};

let currentCategory = "taxation";
let index = 0;
let startX = 0;
let isSwiping = false;

const serviceTrack = document.querySelector(".service-track");
const paginationDots = document.getElementById("pagination-dots");

function showCategory(category) {
    currentCategory = category;
    index = 0;
    document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
    document.querySelector(`[onclick="showCategory('${category}')"]`).classList.add("active");
    updateServices();
}

function updateServices() {
    const servicesToShow = services[currentCategory];
    serviceTrack.innerHTML = "";

    // Create service cards
    servicesToShow.forEach(service => {
        const card = document.createElement("div");
        card.classList.add("service-card");
        card.innerHTML = `
            <img src="${service.img}" alt="${service.title}">
            <span>${service.title}</span>
            <span>${service.desc}</span>
        `;
        serviceTrack.appendChild(card);
    });

    // Update pagination dots
    paginationDots.innerHTML = "";
    servicesToShow.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (i === index) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide(i));
        paginationDots.appendChild(dot);
    });

    showSlide();
}

function showSlide() {
    const width = document.querySelector(".service-card").offsetWidth;
    serviceTrack.style.transform = `translateX(-${index * width}px)`;
}

function goToSlide(slideIndex) {
    index = slideIndex;
    showSlide();
    updateDots();
}

function updateDots() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });
}

// Touch event listeners for mobile
serviceTrack.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
});

serviceTrack.addEventListener("touchmove", (e) => {
    if (!isSwiping) return;
    let moveX = e.touches[0].clientX - startX;
    if (moveX > 50) {
        prevSlide();
        isSwiping = false;
    } else if (moveX < -50) {
        nextSlide();
        isSwiping = false;
    }
});

serviceTrack.addEventListener("touchend", () => {
    isSwiping = false;
});

// Mouse event listeners for desktop/laptop
serviceTrack.addEventListener("mousedown", (e) => {
    startX = e.clientX;
    isSwiping = true;
});

serviceTrack.addEventListener("mousemove", (e) => {
    if (!isSwiping) return;
    let moveX = e.clientX - startX;
    if (moveX > 50) {
        prevSlide();
        isSwiping = false;
    } else if (moveX < -50) {
        nextSlide();
        isSwiping = false;
    }
});

serviceTrack.addEventListener("mouseup", () => {
    isSwiping = false;
});

serviceTrack.addEventListener("mouseleave", () => {
    isSwiping = false;
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
});

function nextSlide() {
    const servicesToShow = services[currentCategory];
    index = (index + 1) % servicesToShow.length;
    showSlide();
    updateDots();
}

function prevSlide() {
    const servicesToShow = services[currentCategory];
    index = (index - 1 + servicesToShow.length) % servicesToShow.length;
    showSlide();
    updateDots();
}

// Initialize the first category
document.addEventListener("DOMContentLoaded", () => {
    updateServices();
});