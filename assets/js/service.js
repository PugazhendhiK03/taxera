const services = {
    taxation: [
        { img: "assets/image/gst.png", title: "GST Registration & Filing", desc: "Get your GST number and file returns hassle-free!" },
        { img: "assets/image/incometax.jpg", title: "Income Tax Filing", desc: "File your income tax returns accurately and on time!" },
        { img: "assets/image/tds.png", title: "TDS Compliance & Filing", desc: "Ensure TDS compliance with expert assistance!" },
        { img: "assets/image/PT.png", title: "Professional Tax Filing", desc: "Seamless PT registration and filing services!" },
        { img: "assets/image/TaxAdvisory.png", title: "International Taxation & Advisory", desc: "Get expert advice on international taxation policies!" },
    ],
    accounting: [
        { img: "assets/image/Bookkeeping.png", title: "Bookkeeping & Accounting", desc: "Accurate bookkeeping & financial records!" },
        { img: "assets/image/Payroll.png", title: "Payroll Management", desc: "Manage salaries, EPF, and ESI hassle-free!" },
        { img: "assets/image/fsp.png", title: "Financial Statements Preparation", desc: "Get professional financial statement preparation!" },
        { img: "assets/image/Budgeting.png", title: "Financial Planning & Budgeting", desc: "Optimize your finances with expert planning!" },
    ],
    business: [
        { img: "assets/image/MSME.png", title: "MSME (Udyam) Registration", desc: "Register your business easily as an MSME!" },
        { img: "assets/image/CompanyCompliance.png", title: "Company Compliance Filings", desc: "Stay compliant with ROC & annual returns!" },
        { img: "assets/image/Licensing.png", title: "Business Licensing & Certification Assistance", desc: "Get licenses & certifications (FSSAI, IEC, etc.)" },
        { img: "assets/image/Audit.png", title: "Audit & Compliance Support", desc: "Professional audit assistance & compliance!" },
    ],
};

let currentCategory = "taxation";
let currentIndex = 0;

function showCategory(category) {
    currentCategory = category;
    currentIndex = 0;
    document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
    document.querySelector(`[onclick="showCategory('${category}')"]`).classList.add("active");
    updateServices();
}

function updateServices() {
    const serviceContainer = document.getElementById("service-container");
    serviceContainer.innerHTML = "";

    const servicesToShow = services[currentCategory];
    servicesToShow.forEach(service => {
        const card = document.createElement("div");
        card.classList.add("service-card");
        card.innerHTML = `
            <img src="${service.img}" alt="${service.title}">
            <span>${service.title}</span>
            <span>${service.desc}</span>
        `;
        serviceContainer.appendChild(card);
    });

    createDots(servicesToShow.length);
    updateSlide();
}

function createDots(count) {
    const dotsContainer = document.getElementById("dots-container");
    dotsContainer.innerHTML = "";
    for (let i = 0; i < count; i++) {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        dot.setAttribute("onclick", `changeSlide(${i})`);
        dotsContainer.appendChild(dot);
    }
}

function changeSlide(index) {
    currentIndex = index;
    updateSlide();
}

function updateSlide() {
    const cards = document.querySelectorAll(".service-card");
    const dots = document.querySelectorAll(".dot");
    cards.forEach((card, i) => {
        card.style.transform = `translateX(${-currentIndex * 100}%)`;
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
    });
}

// Initialize the first category
document.addEventListener("DOMContentLoaded", () => {
    updateServices();
});