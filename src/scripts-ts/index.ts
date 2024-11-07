// Simulates a typewriter effect for text
function typingAnim(element: HTMLElement, text: string, resolve = () => {return}, i = 0)
{
    // Add next letter
    element.textContent += text[i];

    if (i === text.length - 1) {
        // Resolve the Future
        return resolve();
    }

    // Run recursively after a 50ms timeout
    setTimeout(() => typingAnim(element, text, resolve, i + 1), 50);
}

// Do not animate if the user does not want animations or is a bot
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && !/bot|googlebot|crawler|spider|robot|crawling|powermapper|sortsite/i.test(navigator.userAgent)) {
    // Remove text for writing animation
    const legadoText = document.getElementById("legado-de-lideres") as HTMLTitleElement;
    const modeloText = document.getElementById("modelo-de-naciones-unidas") as HTMLTitleElement;

    legadoText.innerText = "\xa0";
    modeloText.innerText = "\xa0";

    // Animate "Legado de Líderes"
    const legadoTypingAnim = new Promise<void>((resolve, reject) => {
        typingAnim(legadoText, "| Legado de Líderes", resolve);
    });

    // When "Legado de Líderes" is done, animate SMMUN text
    legadoTypingAnim.then(() =>
        setTimeout(() => typingAnim(modeloText, "Modelo de Naciones Unidas del Sureste Mexicano"), 100)
    );
}

// Update navbar after scrolling
const nav = document.getElementsByClassName("nav-normal")[0];
const navMobile = document.getElementsByClassName("nav-normal")[1];
const navLogo = (document.getElementsByClassName("navbar-logo") as HTMLCollectionOf<HTMLAnchorElement>)[0];
const navLogoMobile = (document.getElementsByClassName("navbar-logo") as HTMLCollectionOf<HTMLAnchorElement>)[1];
const header = document.getElementById("greeting")!;
const navHeight = nav.getBoundingClientRect().height;

function updateNavColor(entries: IntersectionObserverEntry[]) {
    const [entry] = entries;

    if (!entry.isIntersecting) {
        navLogo.style.display = "initial";
        navLogoMobile.style.display = "initial";

        nav.classList.remove("nav-transparent");
        navMobile.classList.remove("nav-transparent");
    }
    else {
        nav.classList.add("nav-transparent");
        navMobile.classList.add("nav-transparent");

        navLogo.style.display = "none";
        navLogoMobile.style.display = "none";
    }
}

const headerObserver = new IntersectionObserver(function(entries: IntersectionObserverEntry[]) {
    const [entry] = entries;

    if (!entry.isIntersecting) {
        navLogo.style.display = "initial";
        navLogoMobile.style.display = "initial";

        nav.classList.remove("nav-transparent");
        navMobile.classList.remove("nav-transparent");
    }
    else {
        nav.classList.add("nav-transparent");
        navMobile.classList.add("nav-transparent");

        navLogo.style.display = "none";
        navLogoMobile.style.display = "none";
    }
}, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`
});

headerObserver.observe(header);
