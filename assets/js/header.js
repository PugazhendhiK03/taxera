function toggleMenu() {
    const navLinks = document.getElementById("nav-links");
    const menuToggle = document.querySelector(".menu-toggle i");

    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        menuToggle.classList.remove("fa-bars");
        menuToggle.classList.add("fa-xmark");
    } else {
        menuToggle.classList.remove("fa-xmark");
        menuToggle.classList.add("fa-bars");
    }
}
