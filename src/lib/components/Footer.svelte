<script lang="ts">
    let { full, color }: { full: boolean, color:string } = $props();
</script>

<style>
    #normal-footer {
        font-family: "The Seasons";
        font-weight: bold;
        font-size: 0.6rem;
        text-align: center;
        margin: 2vh 0 1vh 0;
    }

    #extended-footer {
        width: 100%;
        background-image: url("/assets/img/footer/gradient.png");
        background-repeat: no-repeat;
        background-size: cover;
        background: linear-gradient(
            330deg,
            rgba(247, 203, 172, 0.91) 0%,
            rgba(234, 104, 128, 0.615) 14.29%,
            rgba(234, 104, 128, 0.485) 28.57%,
            rgba(246, 163, 183, 0.69) 42.86%,
            rgba(254, 165, 187, 0.675) 57.14%,
            rgba(247, 152, 137, 0.595) 71.43%,
            rgba(244, 184, 147, 0.59) 85.71%,
            rgba(252, 233, 221, 0.645) 100%
        );
        background-size: 141%;
        background-position: center;
        display: flex;
        flex-direction: column;
    }

    #logo-name {
        display: flex;
        flex-direction: row;
        align-content: center;
        margin: 2vh 3vw 3vh 3vw;
        margin-bottom: 2vh;
    }

    #logo-name figure {
        margin: 0 1rem 0 0;
    }

    #logo-name img {
        width: auto;
        height: 4rem;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }

    #logo-name p {
        font-family: "The Seasons";
        font-weight: bold;
        font-size: 1.5rem;
        color: #e33d73;
    }

    #contact-info {
        width: 100%;
        display: flex;
        flex-direction: row;
    }

    @media screen and (min-width: 820px) {
        #contact-info {
            flex-direction: row;
        }
    }

    @media screen and (max-width: 820px) {
        #contact-info {
            flex-direction: column;
            align-items: self-start;
            text-align: left;
        }
    }

    #contact-email {
        margin: 0 3vw;
        text-align: left;
        flex-grow: 1;
        color: #e33d73;
    }

    @media screen and (min-width: 820px) {
        #contact-email {
            align-self: center;
        }
    }

    #email-title {
        font-family: "The Seasons";
        font-weight: bold;
        font-size: 1.3rem;
    }

    #email-list {
        font-family: "The Seasons";
        font-size: 1rem;
        list-style-position: inside;
        padding-left: 0;
        margin: 0.5vh 0 2vh 0;
    }

    #email-list li {
        padding-bottom: 0.5vh;
    }

    #contact-email a {
        color: #e33d73;
    }

    #contact-email a:visited {
        color: #e33d73;
    }

    #social-media {
        margin: 0 3vw;
        color: #fffdfd;
        font-size: 1rem;
    }

    @media screen and (min-width: 820px) {
        #social-media {
            align-self: self-end;
        }
    }

    #social-title {
        font-family: "The Seasons";
        font-weight: bold;
        color: #e33d73;
    }

    @media screen and (max-width: 820px) {
        #social-title {
            font-size: 1.3rem;
        }
    }

    #social-icons {
        font-family: "The Seasons";
        margin: 1.3vh 0 2vh 0;
    }

    @media screen and (min-width: 820px) {
        #social-icons {
            text-align: center;
        }
    }

    #social-icons a {
        text-decoration: none;
        color: #e33d73;
        padding: 0 0.5vw;
    }

    #social-icons a:visited {
        color: #e33d73;
    }

</style>

{#if full}
    <!-- Footer completo -->
    <footer id="extended-footer">
        <!-- Logo y nombre -->
        <div id="logo-name">
            <figure>
                <img src="/assets/img/logos/smmun_deg.svg" alt="Logo del SMMUN." />
            </figure>
            <p>
                Modelo de Naciones Unidas del Sureste Mexicano
            </p>
        </div>

        <!-- Correos y redes sociales -->
        <div id="contact-info">
            <div id="contact-email">
                <span id="email-title">¡Contáctanos!</span>
                <ul id="email-list">
                    <li><a href="mailto:secretariageneral@smmun.com">secretariageneral@smmun.com</a></li>
                    <li><a href="mailto:contacto@smmun.com">contacto@smmun.com</a></li>
                    <li><a href="mailto:secretariadefinanzas@smmun.com">secretariadefinanzas@smmun.com</a></li>
                    <li>Para más contactos: <a target="_blank" rel="noopener noreferrer" href="https://bit.ly/4bHj52i">link</a></li>
                </ul>
            </div>
            <div id="social-media">
                <span id="social-title">¡Síguenos en nuestras redes sociales!</span>
                <p id="social-icons">
                    <a target="_blank" rel="noopener noreferrer" href="https://instagram.com/smmunoficial" aria-label="Instagram"><i class="fa-brands fa-instagram fa-xl"></i></a>
                    <a target="_blank" rel="noopener noreferrer" href="https://facebook.com/smmunoficial" aria-label="Facebook"><i class="fa-brands fa-facebook fa-xl"></i></a>
                </p>
            </div>
        </div>
    </footer>
{:else}
    <!-- Footer con copyright -->
    <footer id="normal-footer" style="color: {color};">
        &copy; 2016 - {new Date().getFullYear()} SMMUN
    </footer>
{/if}
