// Get full document height
const body = document.body;
const html = document.documentElement;
const height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

// Only use dots when page length is more than 100%
if (height > window.innerHeight) {
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
            dots[i].style.opacity = Math.max(distance, 0.5).toString();
        }
    }

    // Set alpha and change it on scroll event
    setDotsAlpha();
    window.addEventListener("scroll", () => setDotsAlpha(), true);
}
else {
    // Do not display dots
    document.getElementById("dot-progress").style.display = "none";
}
