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
        { img: "assets/image/", title: "Accounts Payable & Receivable Management", desc: "" },
        { img: "assets/image/TaxPlanning.png", title: "Tax Planning & Advisory", desc: "Expert tax planning strategies for your business!" },
        { img: "assets/image/Budgeting.png", title: "Financial Planning & Budgeting", desc: "Optimize your finances with expert planning!" },
    ],
    business: [
        { img: "assets/image/MSME.png", title: "MSME (Udyam) Registration", desc: "Register your business easily as an MSME!" },
        { img: "assets/image/CompanyCompliance.png", title: "Company Compliance Filings", desc: "Stay compliant with ROC & annual returns!" },
        { img: "assets/image/Licensing.png", title: "Business Licensing & Certification Assistance", desc: "Get licenses & certifications (FSSAI, IEC, etc.)" },
        { img: "assets/image/Audit.png", title: "Audit & Compliance Support", desc: "Professional audit assistance & compliance!" },
        { img: "assets/image/Automation.png", title: "Process Automation & Financial Optimization", desc: "Optimize business processes with automation!" },
    ],
};

let currentCategory = "taxation";
let currentPage = 1;
const itemsPerPage = 3;

// Function to Show Services by Category
function showCategory(category) {
    currentCategory = category;
    currentPage = 1;
    document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
    document.querySelector(`[onclick="showCategory('${category}')"]`).classList.add("active");
    updateServices();
}

// Function to Update Services & Handle Pagination
function updateServices() {
    const serviceContainer = document.getElementById("service-container");
    serviceContainer.innerHTML = "";

    const servicesToShow = services[currentCategory].slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    
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

    updatePagination();
}

// Function to Handle Pagination
function updatePagination() {
    const totalPages = Math.ceil(services[currentCategory].length / itemsPerPage);
    document.getElementById("page-number").innerText = `${currentPage} / ${totalPages}`;
    document.getElementById("prev-btn").disabled = currentPage === 1;
    document.getElementById("next-btn").disabled = currentPage === totalPages;
}

function nextPage() {
    if (currentPage < Math.ceil(services[currentCategory].length / itemsPerPage)) {
        currentPage++;
        updateServices();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        updateServices();
    }
}

// Initialize First Category
showCategory("taxation");
