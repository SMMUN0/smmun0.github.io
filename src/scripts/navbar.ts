// Update navbar after scrolling
const nav = document.getElementById("navbar") as HTMLElement;
const navMobile = document.getElementById("navbar-mobile") as HTMLElement;
const navLogo = document.getElementById("navbar-logo") as HTMLElement;
const navLogoMobile = document.getElementById("navbar-logo-mobile") as HTMLElement;
const header = document.getElementById("greeting") as HTMLElement;
const navHeight = nav.getBoundingClientRect().height;

function updateNavColor(entries: IntersectionObserverEntry[]) {
    const [entry] = entries;

    if (!entry.isIntersecting) {
        nav.classList.add("nav-colored");
        navMobile.classList.add("nav-colored");

        navLogo.style.display = "inherit";
        navLogoMobile.style.opacity = "1";

        nav.classList.remove("nav-transparent");
        navMobile.classList.remove("nav-transparent");
    }
    else {
        nav.classList.add("nav-transparent");
        navMobile.classList.add("nav-transparent");

        navLogo.style.display = "none";
        navLogoMobile.style.opacity = "0";

        nav.classList.remove("nav-colored");
        navMobile.classList.remove("nav-colored");
    }
}

const headerObserver = new IntersectionObserver(updateNavColor, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`
});

headerObserver.observe(header);

// Hamburger menu for mobile and small screens
const hamburger = document.getElementById("hamburger") as HTMLElement;
const navMenu = document.getElementById("nav-menu") as HTMLElement;
const navLink = document.querySelectorAll(".nav-link");

hamburger.addEventListener("click", mobileMenu);
navLink.forEach(n => n.addEventListener("click", closeMenu));

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}
