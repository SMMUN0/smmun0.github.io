<style>
    #section-error {
        height: 100vh;
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    #error {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 4vw;
    }

    #cross {
        margin-bottom: 5vh;
        font-size: 9rem;
        color: var(--pink-color);
        border-radius: 50%;
    }

    #error h1 {
        font-family: "Catchy Mager";
        font-weight: bold;
        font-size: 2.5rem;
        color: var(--pink-color);
        margin: 0;
    }

    #error p {
        font-family: "Catchy Mager";
        font-size: 1rem;
        text-align: center;
        display: flex;
        flex-direction: column;
    }

    #error span {
        margin: 1vh 0;
    }

    #error a {
        color: #44372b;
    }

    #contacto {
        color: #44372b;
    }
</style>

<section id="section-error">
    <article id="error">
        <span id="cross" class="fa-stack fa-2x">
            <i class="fa-solid fa-circle fa-stack-2x" style="color: var(--pink-color);"></i>
            <i class="fa-solid fa-xmark fa-stack-1x" style="color: #ffffff;"></i>
        </span>

        <h1>Hubo un error con tu inscripción</h1>

        <p>
            <span>Intenta de nuevo, y verifica que todos tus datos estén correctos.</span>
            <span>En caso de tener alguna duda, puedes contactarnos a través de:</span>
            <span id="contacto">
                <i class="fa-brands fa-whatsapp"></i>&ensp;<strong>Correo:</strong> <a href="mailto:secretariadefinanzas@smmun.com">secretariadefinanzas@smmun.com</a>
                <br>
                <i class="fa-regular fa-envelope"></i>&ensp;<strong>WhatsApp:</strong> <a target="_blank" rel="noopener noreferrer" href="https://wa.me/529999033025?text=Hola,%20mi%20*nombre*%20es:%0A%0A*Tengo%20dudas%20sobre:*%0A%5B%5D%20Delegaci%C3%B3n%20oficial%0A%5B%5D%20Datos%20personales%0A%5B%5D%20Comit%C3%A9s%20y/o%20pa%C3%ADses%0A%5B%5D%20Proceso%20de%20pago%0A">+52 999 903 3025</a>
            </span>
        </p>
    </article>
</section>
