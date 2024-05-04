// Simulates a typewriter effect for text
function typingAnim(element: HTMLElement, text: string, resolve = (value: unknown) => {return}, i = 0)
{
    if (i === 0) {
        element.textContent = "";
    }

    // Add next letter
    element.textContent += text[i];

    if (i === text.length - 1) {
        // Resolve the Future
        return resolve("");
    }

    // Run recursively after a 50ms timeout
    setTimeout(() => typingAnim(element, text, resolve, i + 1), 50);
}

// Animate "Legado de Líderes"
const legadoTypingAnim = new Promise((resolve, reject) => {
    typingAnim(document.getElementById("legado-de-lideres")!, "| Legado de Líderes", resolve);
});

// When "Legado de Líderes" is done, animate SMMUN text
legadoTypingAnim.then(() =>
    setTimeout(() => typingAnim(document.getElementById("modelo-de-naciones-unidas")!, "Modelo de Naciones Unidas del Sureste Mexicano"), 100)
);
