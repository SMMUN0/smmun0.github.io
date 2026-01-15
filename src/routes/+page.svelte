<script lang="ts">
    import BeholdWidget from "@behold/svelte";
</script>

<svelte:head>
    <!-- Precargar imágenes -->

    <!-- Metadatos para google -->
    <script type="application/ld+json">
        {
            "@context" : "https://schema.org",
            "@type" : "WebSite",
            "name" : "SMMUN",
            "url" : "https://smmun.com/"
        }
    </script>

    <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            "image": "https://smmun.com/assets/img/images/greeting.webp",
            "url": "https://smmun.com/",
            "logo": "https://smmun.com/assets/img/logos/smmun_deg.svg",
            "name": "SMMUN",
            "description": "El Modelo de Naciones Unidas de soñadores, estrellas y líderes.",
            "email": "secretariageneral@smmun.com"
        }
    </script>
</svelte:head>

<style>
    :global(body:has(main.index)) {
        margin-top: 0 !important;
        height: auto;
        background-image: url("/assets/img/index/fondo.png");
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center top;
    }

    :global(main.index) {
        position: relative;
    }

    #principal {
        background-image: url("/assets/img/index/fondo-2.webp");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center top;
        width: 100vw;
        height: 77vh;
        justify-self: end;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
    }

    #conoce {
        margin: 10vh 0 0 5vw;
        max-width: 45vw;
    }

    #conoce h3 {
        font-weight: normal;
        font-family: "The Seasons";
        font-size: 4.2rem;
        color: #ffffff;
        margin: 0;
        text-wrap: wrap;
    }

    #conoce-boton {
        margin: 2vh 0 0 5vw;
        cursor: pointer;
        text-decoration: none;
        display: flex;
        flex-direction: row;
        align-items: center;
        background-color: #ffffff;
        width: fit-content;
        padding: 1.5vh 2vw;
        border-radius: 50px / 100px;
    }

    #conoce-boton:hover {
        opacity: 0.8;
    }

    #conoce-boton span {
        font-family: "The Seasons";
        font-size: 1.2rem;
        color: #e63b7a;
        margin: 0;
        text-wrap: wrap;
        margin-right: 2vw;
    }

    #conoce-boton img {
        height: 1.5rem;
        width: auto;
        margin-top: 0.2rem;
        display: inline-block;
    }

    @media (prefers-reduced-motion: no-preference) {
        #conoce-boton img {
            animation: bounceX 1s infinite;
        }
    }

    @keyframes bounceX {
        0%   { transform: translateX(0); }
        50%  { transform: translateX(5px); }
        100% { transform: translateX(0); }
    }

    #insta-feed {
        padding: 2vh 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    @media screen and (min-width: 820px) {
        #insta-feed div {
            width: 70vw;
        }
    }

    @media screen and (max-width: 820px) {
        #insta-feed div {
            width: 90vw;
        }
    }
</style>

<section style="height: 23vh;"></section>

<section id="principal">
    <article id="conoce">
        <h3>
            Conoce los nuevos capítulos
        </h3>

        <a id="conoce-boton" href="/quienes-somos">
            <span>¿Quiénes somos?</span>

            <figure>
                <img src="/assets/img/index/arrow.svg" alt="Flecha">
            </figure>
        </a>
    </article>
</section>

<section id="insta-feed" aria-hidden="true">
    <div>
        <BeholdWidget feedId="Cj9y7jXZhXrNjkJj2O91"></BeholdWidget>
    </div>
</section>
