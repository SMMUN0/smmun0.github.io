// Hamburger menu for mobile and small screens
const hamburger = document.getElementById("hamburger") as HTMLDivElement;
const navMenu = document.getElementById("nav-menu") as HTMLUListElement;

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}

hamburger.addEventListener("click", mobileMenu);
