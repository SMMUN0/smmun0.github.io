<script lang="ts">

</script>

<style>
    section {
        min-height: calc(100vh - 8vh - 2rem);
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 6vh 6vw;
        background-color: #ffffff;
        box-sizing: border-box;
        background-image: url("/assets/img/registro/bg.webp");
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
    }

    .convocatorias {
        width: 100%;
        max-width: 1680px;
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: clamp(1.5rem, 3vw, 3rem);
        align-items: start;
    }

    .convocatoria {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    .convocatoria figure {
        margin: 0;
        width: 100%;
        max-width: 560px;
    }

    .image-a:hover {
        opacity: 0.8;
    }

    .convocatoria img {
        width: 100%;
        height: auto;
        display: block;
    }

    .convocatoria-title {
        margin: 1.2rem 0 0;
        font-family: "The Seasons";
        font-size: clamp(1.2rem, 2vw, 1.7rem);
        font-weight: normal;
        letter-spacing: 0.02em;
    }

    .convocatoria-title a {
        cursor: pointer;
        font-family: "The Seasons";
        font-size: 1.5rem;
        color: #454140;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        position: relative;
    }

    .convocatoria-title a::after {
        content: "";
        position: absolute;
        width: 100%;
        transform: scaleX(0);
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: #454140;
        transition: transform 0.25s ease-out;
        transform-origin: bottom center;
    }

    @media (prefers-reduced-motion: no-preference) {
        .convocatoria-title a:hover::after {
            transform: scaleX(1);
        }
    }

    @media (max-width: 1100px) {
        .convocatorias {
            grid-template-columns: 1fr;
            gap: 2.5rem;
        }

        .convocatoria figure {
            max-width: 92vw;
        }
    }
</style>

<section>
    <div class="convocatorias">
        <article class="convocatoria">

            <a class="image-a" href="/registro/delegaciones">
                <figure>
                    <img src="/assets/img/registro/1.webp" alt="Convocatoria de delegaciones." />
                </figure>
            </a>

            <h2 class="convocatoria-title">
                <a href="/registro/delegaciones">Convocatoria de delegaciones</a>
            </h2>
        </article>

        <article class="convocatoria">
            <a class="image-a" href="/registro/faculty">
                <figure>
                    <img src="/assets/img/registro/2.webp" alt="Convocatoria de faculty." />
                </figure>
            </a>

            <h2 class="convocatoria-title">
                <a href="/registro/faculty">Convocatoria de faculty</a>
            </h2>
        </article>

        <article class="convocatoria">
            <a class="image-a" href="https://docs.google.com/forms/d/e/1FAIpQLSeiqQqbGhnpURvTsp43gH3CuMtaJprV1fdSGgjBT2JRETrHtg/viewform" target="_blank" rel="noopener noreferrer">
                <figure>
                    <img src="/assets/img/registro/3.webp" alt="Convocatoria de staff." />
                </figure>
            </a>

            <h2 class="convocatoria-title">
                <a href="https://docs.google.com/forms/d/e/1FAIpQLSeiqQqbGhnpURvTsp43gH3CuMtaJprV1fdSGgjBT2JRETrHtg/viewform" target="_blank" rel="noopener noreferrer">
                    Convocatoria de staff
                </a>
            </h2>
        </article>
    </div>
</section>
