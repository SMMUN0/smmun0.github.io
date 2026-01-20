<script lang="ts">
    import SmmunEdition from "$lib/components/SmmunEdition.svelte";
    import { fit, parent_style } from "@leveluptuts/svelte-fit";

    let ediciones = [
        {
            year: 2026,
            edition: "UNA NUEVA HISTORIA",
            color: "#ffffff",
            bgColor: "#ef7b98",
            imageDimensions: [[0]],
            text: "26-30 DE MAYO"
        },
        {
            year: 2025,
            edition: "LEGADO DE LÍDERES",
            color: "#ffffff",
            bgColor: "#7061b3",
            imageDimensions: [[2000, 1500], [960, 720], [2000, 1500]],
            text: "“De soñadores en acción, para lideres con pasión”\n\nEn la décima edición aniversario del SMMUN, vivimos muchas sorpresas y aventuras rompiendo récords que previamente se habían establecido. Con mas de 500 participantes en los distintos 10 comités que representaban a cada una de las ediciones del Modelo de Naciones Unidas del Sureste Mexicano desde su origen en 2016.\n\nEn esta edición, se realizó por primera vez un viaje internacional a dos destinos; Madrid, España y Paris, Francia, donde se participo en el URJCMUN y en Paris, se visito la sede de la UNESCO. De igual forma, el primer viaje nacional se realizo a Puebla, Mexico para ser parte del UPAMUN.\n\nDurante los meses que abarco la edición, se realizaron 5 eventos buscando honrar la historia y el crecimiento del modelo pero sobre todo, celebrando las cualidades únicas de liderazgo de las personas que participamos en estos espacios, entre ellos se destacan el Dia SM, RLMMUN y Leadership Lab, asi como una Entrega de Kits inolvidable."
        },
        {
            year: 2024,
            edition: "FOR EQUALITY",
            color: "#ffffff",
            bgColor: "#e63b7a",
            imageDimensions: [[2000, 1500], [2000, 1500], [2000, 1500]],
            text: "Trabajando con base en el Objetivo de Desarrollo Sostenible 10, Reducción de las desigualdades, se buscó el impulsar una igualdad sustantiva e interseccional. Un mundo pacífico, justo y sostenible se construye con la participación activa de todas las personas; nuestras delegaciones representan esa ciudadanía que se educa y promueve el bienestar de su comunidad. En esta edición, se conmemora la segunda delegación oficial del SM que participó en un Modelo Internacional: el McMUN en Montreál, Canadá."
        },
        {
            year: 2023,
            edition: "FOR DIVERSITY",
            color: "#ffffff",
            bgColor: "#693bd7",
            imageDimensions: [[960, 720], [960, 720], [960, 720]],
            text: "Las sociedades son grandes, cambiantes y diversas. En un mundo altamente relacionado, celebrar la diversidad es necesario; cada persona tiene cualidades propias que benefician la vida en conjunto. Para respetar esta diversidad, se promovió el uso de comités a distancia en modalidad digital; además, fue la primera vez que se recibieron, de manera presencial, delegaciones oficiales de otros países. Además, se conmemora a la primera delegación oficial del SM que fue partícipe de un Modelo Internacional: el FWWMUN en Nueva York, Estados Unidos."
        },
        {
            year: 2022,
            edition: "FOR YOUTH",
            color: "#ffffff",
            bgColor: "#38b6ff",
            imageDimensions: [[2000, 1500], [2000, 1500], [2000, 1500]],
            text: "Por primera vez, el Modelo se enfocó en su público objetivo: las juventudes. Buscando dejar atrás el adultocentrismo, se visibilizó el deseo e interés de participar en la política por parte de sus delegaciones. La inclusión de estas juventudes en temas políticos demuestra el compromiso a construir un futuro que responda a las necesidades e intereses de todas las generaciones. Trabajando en conjunto y de manera interseccional, se regresó a debatir bajo la nueva normalidad e impulsó la reapertura de actividades académicas en Mérida."
        },
        {
            year: 2021,
            edition: "FOR HEALTH",
            color: "#ffffff",
            bgColor: "#042654",
            imageDimensions: [[1421, 1066], [949, 712], [1421, 1066]],
            text: "Aún viviendo una pandemia, el SMMUN procuró darle un espacio de diálogo y entendimiento a las delegaciones interesadas. Contando con participación nacional e internacional en modalidad digital, se brindaron soluciones a aquellas problemáticas que ocurrían en sus espacios de crecimiento. Aún con un futuro incierto ante las contingencias sanitarias, las delegaciones demostraron que es posible mantenerse optimista ante los cambios en nuestra sociedad."
        },
        {
            year: 2020,
            edition: "FOR WOMEN",
            color: "#ffffff",
            bgColor: "#84b8fd",
            imageDimensions: [[1421, 1066], [1421, 1066], [1421, 1066]],
            text: "Relacionado principalmente con el Objetivo de Desarrollo Sostenible 5, garantizar la igualdad de género ha representado una meta a lograr en todos los ámbitos. Sin embargo, el desafío de la nueva época es el visibilizar que se debe hablar sobre mujeres desde la pluralidad, ya que es importante mantener una interseccionalidad en sus problemáticas. Las delegaciones, aún a la distancia, aprendieron a trabajar en equipo y a utilizar las herramientas digitales para promover un futuro más inclusivo."
        },
        {
            year: 2019,
            edition: "FOR PEACE",
            color: "#ffffff",
            bgColor: "#6f75d5",
            imageDimensions: [[1072, 804], [1280, 960], [1072, 804]],
            text: "La paz es el principio fundacional de la ONU, además de ser el principal objetivo a alcanzar en un mundo que vive en conflicto. Al conocer las diferentes historias, realidades y preocupaciones, nuestras delegaciones entendieron las situaciones que dificultan el alcanzar la paz. Sin embargo, también aprendieron que el diálogo es la mejor herramienta para una vida en armonía y que su voz es importante para lograr un cambio en el mundo."
        },
        {
            year: 2018,
            edition: "FOR DEVELOPMENT",
            color: "#ffffff",
            bgColor: "#0097b2",
            imageDimensions: [[996, 747], [1080, 810], [1080, 810]],
            text: "El desarrollo se define como un proceso continuo y destinado a mejorar la calidad de vida de la ciudadanía. Esta edición permitió a las delegaciones trabajar con cada una de las aristas más importantes del desarrollo: la estabilidad económica, progreso social, protección al medio ambiente, participación política activa e igualdad y justicia en la sociedad.<br><br>Tener una ciudadanía informada garantiza un correcto desarrollo a futuro y nuestras delegaciones liderarán el cambio."
        },
        {
            year: 2017,
            edition: "FOR CHILDREN",
            color: "#ffffff",
            bgColor: "#5ce1e6",
            imageDimensions: [[1549, 1162], [639, 479], [1549, 1162]],
            text: "Las infancias son de los grupos mas vulnerables de la población, por lo que se buscó crear conciencia sobre estas problemáticas a lo largo de esta edición, promoviendo sus derechos como el vivir en un mundo libre de violencia, explotación y discriminación, el derecho a la salud y el bienestar, el derecho a una educación de calidad, entre otros."
        },
        {
            year: 2016,
            edition: "FOR EDUCATION",
            color: "#042654",
            bgColor: "#089cf1",
            imageDimensions: [[1820, 1365], [1064, 798], [1080, 810]],
            text: "La educación es un tema fundamental para el desarrollo del SMMUN, ya que es un derecho humano fundamental y un bien público esencial. Todas las infancias, juventudes y adultos, tienen derecho a una educación de calidad que les permita desarrollar todo su potencial y contribuir plenamente a la sociedad.<br><br>La educación debe ser inclusiva y de calidad para todos. Esto significa que debe adaptarse a las necesidades de todos los estudiantes, independientemente de su origen, género, discapacidad o cualquier otra condición."
        }
    ];
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

    #quienes-somos-section {
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

    #quienes-somos-article {
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

    #quienes-somos-article h1 {
        font-weight: normal;
        font-family: "The Seasons";
        color: #ffffff;
        margin: 2vh 3vw;
        text-align: center;
    }

    #quienes-somos-article p {
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
        #quienes-somos-section {
            height: unset;
            flex-direction: column;
        }

        figure, picture, img {
            width: 100%;
            height: auto;
        }

        #quienes-somos-article {
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
        #quienes-somos-article {
            margin-bottom: 0;
        }
    }

    .info-section article {
        margin: 2vh 0 0 0;
        padding: 3.5vh 0 2.5vh 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
    }

    .info-section h3 {
        font-family: "Glacial Indifference Bold";
        font-size: 1.5rem;
        margin-bottom: 2vh;
        margin-top: 0;
        font-weight: normal;
    }

    .info-section p {
        font-family: "Glacial Indifference Regular";
        font-size: 1rem;
        padding: 0 5vw;
        margin: 0;
    }
</style>

<section id="quienes-somos-section">
    <figure>
        <picture>
            <source media="(min-width: 1080px)" srcset="/assets/img/quienes-somos/strip_1.webp">
            <source media="(max-width: 1080px)" srcset="/assets/img/quienes-somos/strip_1_mob.webp">
            <img src="/assets/img/quienes-somos/strip_1.webp" width="1024" height="2048" alt="Fotos representativas de distintas ediciones del SMMUN.">
        </picture>
    </figure>

    <article id="quienes-somos-article">
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

<section class="info-section">
    {#each ediciones as { year, edition, color, bgColor, imageDimensions, text }}
        <SmmunEdition {year} {edition} {color} {bgColor} {imageDimensions} {text}></SmmunEdition>
    {/each}
</section>
