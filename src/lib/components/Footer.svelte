<script lang="ts">
    let { full }: { full: boolean } = $props();
</script>

<style>
    #normal-footer {
        font-family: "Glacial Indifference Bold";
        font-size: 0.6rem;
        color: #063372;
        text-align: center;
        margin: 2vh 0 1vh 0;
    }

    #extended-footer {
        width: 100%;
        background-color: #6d659a;
        background-image: url("/assets/img/backgrounds/blue_bg_darkest.webp");
        background-repeat: no-repeat;
        background-size: cover;
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
        font-family: "The Seasons Bold";
        font-size: 1.5rem;
        color: #fffdfd;
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
        color: #fffdfd;
    }

    @media screen and (min-width: 820px) {
        #contact-email {
            align-self: center;
        }
    }

    #email-title {
        font-family: "The Seasons Bold";
        font-size: 1.3rem;
    }

    #email-list {
        font-family: "The Seasons Regular";
        font-size: 1rem;
        list-style-position: inside;
        padding-left: 0;
        margin: 0.5vh 0 2vh 0;
    }

    #email-list li {
        padding-bottom: 0.5vh;
    }

    #contact-email a {
        color: #fffdfd;
    }

    #contact-email a:visited {
        color: #fffdfd;
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
        font-family: "The Seasons Bold";
    }

    @media screen and (max-width: 820px) {
        #social-title {
            font-size: 1.3rem;
        }
    }

    #social-icons {
        font-family: "The Seasons Regular";
        margin: 1.3vh 0 2vh 0;
    }

    @media screen and (min-width: 820px) {
        #social-icons {
            text-align: center;
        }
    }

    #social-icons a {
        text-decoration: none;
        color: #fffdfd;
        padding: 0 0.5vw;
    }

    #social-icons a:visited {
        color: #fffdfd;
    }

</style>

{#if full}
    <!-- Footer completo -->
    <footer id="extended-footer">
        <!-- Logo y nombre -->
        <div id="logo-name">
            <figure>
                <enhanced:img src="/static/assets/img/logos/smmun_dorado.webp" alt="Logo del SMMUN." />
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
    <footer id="normal-footer">
        &copy; 2016 - {new Date().getFullYear()} SMMUN
    </footer>
{/if}
