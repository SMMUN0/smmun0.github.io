<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { indexNavTransparent } from "$lib/stores/index-nav-transparent";
    import SmmunMarquee from "$lib/components/SmmunMarquee.svelte";
    import BeholdWidget from "@behold/svelte";

    let legadoText = $state({ str: "| Legado de Líderes"});
    let modeloText = $state({ str: "Modelo de Naciones Unidas del Sureste Mexicano"}); // Workaround para poder actualizar los strings desde la función
    let sentinel: HTMLDivElement;
    let navObserver: IntersectionObserver;

    // Simular animación de typewriter
    function typingAnim(element: { str: string }, text: string, resolve = () => {return}, i = 0)
    {
        // Añadir siguiente letra
        element.str += text[i];

        if (i === text.length - 1) {
            // Resolver el Future
            return resolve();
        }

        // Ejecutar recursivamente después de un timeout de 50ms
        setTimeout(() => typingAnim(element, text, resolve, i + 1), 50);
    }

    onMount(() => {
        // No animar en caso de que el usuario deshabilite animaciones o sea un bot
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && !/bot|googlebot|crawler|spider|robot|crawling|powermapper|sortsite/i.test(navigator.userAgent)) {
            // Eliminar texto
            legadoText.str = "\xa0";
            modeloText.str = "\xa0";

            // Animar "Legado de Líderes"
            const legadoTypingAnim = new Promise<void>((resolve, reject) => {
                typingAnim(legadoText, "| Legado de Líderes", resolve);
            });

            // Animar "Modelo de Naciones Unidas del Sureste Mexicano" cuando acabe el anterior
            legadoTypingAnim.then(() =>
                setTimeout(() => typingAnim(modeloText, "Modelo de Naciones Unidas del Sureste Mexicano"), 100)
            );
        }

        // Actualizar navbar al hacer scroll
        navObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                indexNavTransparent.set(true);
            } else {
                indexNavTransparent.set(false);
            }
        }, {
            root: null,
            threshold: 0
        });

        navObserver.observe(sentinel);
    });

    onDestroy(() => {
        if (navObserver) {
            navObserver.disconnect();
        }
    });
</script>

<svelte:head>
    <!-- Precargar imágenes -->
    <link rel="preload" as="image" href="/assets/img/images/greeting.webp">
    <link rel="preload" as="image" href="/assets/img/logos/smmun_dorado.webp">
    <link rel="preload" as="image" href="/assets/img/logos/smmun_morado.webp">

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
            "logo": "https://smmun.com/assets/img/logos/smmun_deg.webp",
            "name": "SMMUN",
            "description": "El Modelo de Naciones Unidas de soñadores, estrellas y líderes.",
            "email": "secretariageneral@smmun.com"
        }
    </script>

    <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "Event",
            "name": "Modelo de Naciones Unidas del Sureste Mexicano",
            "startDate": "2025-04-01",
            "endDate": "2025-04-05",
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "eventStatus": "https://schema.org/EventScheduled",
            "location": {
                "@type": "Place",
                "name": "Campus De Ciencias Sociales, Económicas-Administrativas y Humanidades UADY",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Km. 1 Carretera Mérida-Tizimín",
                    "addressLocality": "Mérida",
                    "postalCode": "97305",
                    "addressRegion": "Yucatán",
                    "addressCountry": "México"
                }
            },
            "image": [
                "https://smmun.com/assets/img/ediciones/2024/img3.webp",
                "https://smmun.com/assets/img/ediciones/2023/img3.webp",
                "https://smmun.com/assets/img/ediciones/2023/img2.webp"
            ],
            "description": "La Décima Edición del Modelo de Naciones Unidas de soñadores, estrellas y líderes.",
            "offers": {
                "@type": "Offer",
                "url": "https://smmun.com/registro/delegaciones/",
                "price": 300,
                "priceCurrency": "MXN",
                "availability": "https://schema.org/InStock",
                "validFrom": "2024-11-11T11:11"
            },
            "organizer": {
                "@type": "EducationalOrganization",
                "name": "SMMUN",
                "url": "https://smmun.com/"
            }
        }
    </script>

    <!-- Workaround para aplicar estilos especiales a <body> -->
    <style>
        body {
            margin-top: 0 !important;
            background-color: #8e98ac !important;
            background-image: url("/assets/img/backgrounds/blue_bg.webp") !important;
            height: auto;
        }
    </style>
</svelte:head>

<style>
    section {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    #home {
        background-repeat: repeat;
        background-size: cover;
        height: 100vh;
        background-color: #fffdfd;
        background-image: url("/assets/img/backgrounds/white_bg.webp");
        background-repeat: repeat;
        background-size: cover;
    }

    #greeting {
        width: 100%;
        background-color: #544c76;
        background-image: url("/assets/img/images/greeting.webp");
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: end;
        user-select: none;
    }

    @media screen and (min-width: 820px) {
        #greeting {
            height: 72%;
        }
    }

    @media screen and (max-width: 820px) {
        #greeting {
            height: 80%;
        }
    }

    #greeting-sub {
        display: flex;
        flex-direction: column;
        padding: 0 0 1vmax 0;
        width: 100%;
    }

    #smmun-dorado {
        align-self: center;
    }

    #smmun-dorado img {
        width: auto;
        height: 30vh;
    }

    #legado-de-lideres, #modelo-de-naciones-unidas {
        align-self: flex-start;
        color: #fffdfd;
        padding: 1vh 3vw;
        margin: 0;
        font-weight: normal;
    }

    #legado-de-lideres {
        font-family: "The Seasons Bold";
        font-size: 3rem;
    }

    #modelo-de-naciones-unidas {
        font-family: "Glacial Indifference Bold";
        font-size: 2rem;
    }

    #nav-sentinel {
        height: 1px;
        width: 100%;
    }

    #modelo-de-sonadores {
        background-color: #95b897;
        margin: 2vh 0 0 0;
        padding: 3.5vh 0 2.5vh 0;
        color: #fffdfd;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #modelo-de-sonadores h2 {
        margin: 0;
        font-size: 1.5rem;
        text-align: center;
        font-weight: normal;
    }

    #sonadores-1 {
        font-family: "The Seasons Regular";
    }

    #sonadores-2-regular {
        font-family: "Glacial Indifference Regular";
    }

    #sonadores-2-italic {
        font-family: "Glacial Indifference Italic";
    }

    #insta-feed {
        background-color: #053a80;
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

    #info-prox {
        margin: 5vh 0;
    }

    /*#info-prox p {
        padding: 0 2vw;
        font-family: "The Seasons Bold";
        font-size: 2rem;
        color: #063372;
        text-align: center;
    }*/
</style>

<!-- Sección principal -->
<section id="home">
    <!-- Banner principal -->
    <article id="greeting">
        <div id="greeting-sub">
            <figure id="smmun-dorado">
                <enhanced:img src="/static/assets/img/logos/smmun_dorado.webp" alt="Logo del SMMUN." />
            </figure>

            <div id="nav-sentinel" bind:this={sentinel}></div>

            <section aria-label="Legado de Líderes: Modelo de Naciones Unidas del Sureste Mexicano">
                <!-- svelte-ignore a11y_hidden -->
                <h1 id="legado-de-lideres" aria-hidden="true">
                    {legadoText.str}
                </h1>

                <!-- svelte-ignore a11y_hidden -->
                <h2 id="modelo-de-naciones-unidas" aria-hidden="true">
                    {modeloText.str}
                </h2>
            </section>
        </div>
    </article>

    <!-- Sección verde -->
    <article id="modelo-de-sonadores">
        <h2>
            <span id="sonadores-1">Somos el Modelo de Naciones Unidas</span> <br>
            <span id="sonadores-2-regular">de</span> <span id="sonadores-2-italic">soñadores, estrellas y líderes</span>
        </h2>
    </article>


    <SmmunMarquee></SmmunMarquee>
</section>

<!-- Feed de instagram -->
<section id="insta-feed" aria-hidden="true">
    <div>
        <BeholdWidget feedId="Cj9y7jXZhXrNjkJj2O91"></BeholdWidget>
    </div>
</section>

<!-- To be continued... -->
<section id="info-prox">
    <!-- <p>MÁS INFORMACIÓN PRÓXIMAMENTE...</p> -->
</section>
