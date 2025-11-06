<script lang="ts">
    import { fit, parent_style } from "@leveluptuts/svelte-fit";
</script>

<style>
    :global(body:has(main.quienes-somos)) {
        background: radial-gradient(
            circle,
            rgba(247, 203, 172, 0.91) 0%,
            rgba(234, 104, 128, 0.615) 11.1%,
            rgba(234, 104, 128, 0.485) 22.2%,
            rgba(246, 163, 183, 0.69) 33.3%,
            rgba(254, 165, 187, 0.675) 44.4%,
            rgba(247, 152, 137, 0.595) 55.6%,
            rgba(244, 184, 147, 0.59) 66.7%,
            rgba(252, 233, 221, 0.645) 77.8%,
            rgba(255, 255, 255, 0.835) 88.9%,
            rgba(255, 255, 255, 0.825) 100%
        );
        background-size: 141%;
        background-position: center;
    }

    section {
        height: calc(100vh - 8vh - 2rem);
        width: 100vw;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    figure, picture, img {
        width: auto;
        height: 100%;
        margin: 0;
    }

    article {
        flex: 1;
        height: 90%;
        background-image: url("/assets/img/quienes-somos/star_bg.webp");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center top;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    article h1 {
        font-weight: normal;
        font-family: "The Seasons";
        color: #ffffff;
        margin: 2vh 3vw;
        text-align: center;
    }

    article p {
        font-family: "The Seasons";
        margin: 0 3vw;
        text-align: center;
    }

    #quienes-somos-title {
        height: 20%;
        margin-bottom: 2vh;
    }

    #quienes-somos-text {
        height: calc(80% - 2vh);
    }

    @media screen and (max-width: 1080px) {
        section {
            height: unset;
            flex-direction: column;
        }

        figure, picture, img {
            width: 100%;
            height: auto;
        }

        article {
            height: unset;
            width: 90%;
            margin: 2vh 0;
        }

        #quienes-somos-title {
            height: 10vh;
        }

        #quienes-somos-text {
            height: 38vh;
        }
    }

    @media screen and (max-width: 820px) {
        article {
            margin-bottom: 0;
        }
    }
</style>

<section>
    <figure>
        <picture>
            <source media="(min-width: 1080px)" srcset="/assets/img/quienes-somos/strip_1.webp">
            <source media="(max-width: 1080px)" srcset="/assets/img/quienes-somos/strip_1_mob.webp">
            <img src="/assets/img/quienes-somos/strip_1.webp" width="1024" height="2048" alt="Fotos representativas de distintas ediciones del SMMUN.">
        </picture>
    </figure>

    <article>
        <div id="quienes-somos-title">
            <div style={parent_style}>
                <h1 use:fit>¿Quienes somos?</h1>
            </div>
        </div>

        <div id="quienes-somos-text">
            <div style={parent_style}>
                <p use:fit>
                    El Modelo de las Naciones Unidas del Sureste Mexicano (o SMMUN por sus siglas en inglés) es un modelo de naciones hecho por y para jóvenes estudiantes con intereses en temas de derecho internacional, relaciones internacionales, derechos humanos y todo lo relacionado a la ONU. Tiene el propósito de otorgarle a las personas participantes una oportunidad para experimentar las sesiones de trabajo llevadas a cabo en las Naciones Unidas en la vida real, tratando temas de suma relevancia internacional, a la par que le permite a los participantes desarrollar habilidades de liderazgo, negociación, diplomacia, trabajo en equipo, investigación, entre otros.
                    <br><br>
                    Tras el éxito de su primer año en 2016, se llevan a cabo las ediciones anuales del Modelo de Naciones Unidas del Sureste de México en Mérida, Yucatán. Todo estudiante de preparatoria o universidad entre los 15 y 25 años está invitado a participar en el evento que será el máximo representante del sentimiento juvenil de la Organización de las Naciones Unidas en el sureste de México.

                </p>
            </div>
        </div>
    </article>

    <figure>
        <picture>
            <source media="(min-width: 1080px)" srcset="/assets/img/quienes-somos/strip_2.webp">
            <source media="(max-width: 1080px)" srcset="/assets/img/quienes-somos/strip_2_mob.webp">
            <img src="/assets/img/quienes-somos/strip_1.webp" width="1024" height="2048" alt="Fotos representativas de distintas ediciones del SMMUN.">
        </picture>
    </figure>
</section>
