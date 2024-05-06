// Get all dots
const dots = document.getElementsByClassName("dot");

// Sets the dots alpha based on the page's scrolling position
function setDotsAlpha() {
    // Calculate scroll percentage
    const scrollPercentage = (document.documentElement.scrollTop || document.body.scrollTop)
        / ((document.documentElement.scrollHeight || document.body.scrollHeight) - document.documentElement.clientHeight);

    for (let i = 0; i < 5; i++) {
        // Find the distance between scroll percentage and dot percentile
        const distance = (1 - Math.abs(0.25 * i - scrollPercentage));

        // Set dot opacity with min 0.5
        (dots[i] as HTMLElement).style.opacity = Math.max(distance, 0.5).toString();
    }
}

// Set alpha and change it on scroll event
setDotsAlpha();
window.addEventListener("scroll", () => setDotsAlpha(), true);
