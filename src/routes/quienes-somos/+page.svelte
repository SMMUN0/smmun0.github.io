<script lang="ts">
    import SmmunEdition from "$lib/components/SmmunEdition.svelte";

    // Información de cada edición del SMMUN
    let ediciones = [
        {
            year: 2024,
            edition: "FOR EQUALITY",
            color: "#fffdfd",
            bgColor: "#e63b7a",
            imageDimensions: [[2000, 1500], [2000, 1500], [2000, 1500]],
            text: "Trabajando con base en el Objetivo de Desarrollo Sostenible 10, Reducción de las desigualdades, se buscó el impulsar una igualdad sustantiva e interseccional. Un mundo pacífico, justo y sostenible se construye con la participación activa de todas las personas; nuestras delegaciones representan esa ciudadanía que se educa y promueve el bienestar de su comunidad. En esta edición, se conmemora la segunda delegación oficial del SM que participó en un Modelo Internacional: el McMUN en Montreál, Canadá."
        },
        {
            year: 2023,
            edition: "FOR DIVERSITY",
            color: "#fffdfd",
            bgColor: "#693bd7",
            imageDimensions: [[960, 720], [960, 720], [960, 720]],
            text: "Las sociedades son grandes, cambiantes y diversas. En un mundo altamente relacionado, celebrar la diversidad es necesario; cada persona tiene cualidades propias que benefician la vida en conjunto. Para respetar esta diversidad, se promovió el uso de comités a distancia en modalidad digital; además, fue la primera vez que se recibieron, de manera presencial, delegaciones oficiales de otros países. Además, se conmemora a la primera delegación oficial del SM que fue partícipe de un Modelo Internacional: el FWWMUN en Nueva York, Estados Unidos."
        },
        {
            year: 2022,
            edition: "FOR YOUTH",
            color: "#fffdfd",
            bgColor: "#38b6ff",
            imageDimensions: [[2000, 1500], [2000, 1500], [2000, 1500]],
            text: "Por primera vez, el Modelo se enfocó en su público objetivo: las juventudes. Buscando dejar atrás el adultocentrismo, se visibilizó el deseo e interés de participar en la política por parte de sus delegaciones. La inclusión de estas juventudes en temas políticos demuestra el compromiso a construir un futuro que responda a las necesidades e intereses de todas las generaciones. Trabajando en conjunto y de manera interseccional, se regresó a debatir bajo la nueva normalidad e impulsó la reapertura de actividades académicas en Mérida."
        },
        {
            year: 2021,
            edition: "FOR HEALTH",
            color: "#fffdfd",
            bgColor: "#042654",
            imageDimensions: [[1421, 1066], [949, 712], [1421, 1066]],
            text: "Aún viviendo una pandemia, el SMMUN procuró darle un espacio de diálogo y entendimiento a las delegaciones interesadas. Contando con participación nacional e internacional en modalidad digital, se brindaron soluciones a aquellas problemáticas que ocurrían en sus espacios de crecimiento. Aún con un futuro incierto ante las contingencias sanitarias, las delegaciones demostraron que es posible mantenerse optimista ante los cambios en nuestra sociedad."
        },
        {
            year: 2020,
            edition: "FOR WOMEN",
            color: "#fffdfd",
            bgColor: "#84b8fd",
            imageDimensions: [[1421, 1066], [1421, 1066], [1421, 1066]],
            text: "Relacionado principalmente con el Objetivo de Desarrollo Sostenible 5, garantizar la igualdad de género ha representado una meta a lograr en todos los ámbitos. Sin embargo, el desafío de la nueva época es el visibilizar que se debe hablar sobre mujeres desde la pluralidad, ya que es importante mantener una interseccionalidad en sus problemáticas. Las delegaciones, aún a la distancia, aprendieron a trabajar en equipo y a utilizar las herramientas digitales para promover un futuro más inclusivo."
        },
        {
            year: 2019,
            edition: "FOR PEACE",
            color: "#fffdfd",
            bgColor: "#6f75d5",
            imageDimensions: [[1072, 804], [1280, 960], [1072, 804]],
            text: "La paz es el principio fundacional de la ONU, además de ser el principal objetivo a alcanzar en un mundo que vive en conflicto. Al conocer las diferentes historias, realidades y preocupaciones, nuestras delegaciones entendieron las situaciones que dificultan el alcanzar la paz. Sin embargo, también aprendieron que el diálogo es la mejor herramienta para una vida en armonía y que su voz es importante para lograr un cambio en el mundo."
        },
        {
            year: 2018,
            edition: "FOR DEVELOPMENT",
            color: "#fffdfd",
            bgColor: "#0097b2",
            imageDimensions: [[996, 747], [1080, 810], [1080, 810]],
            text: "El desarrollo se define como un proceso continuo y destinado a mejorar la calidad de vida de la ciudadanía. Esta edición permitió a las delegaciones trabajar con cada una de las aristas más importantes del desarrollo: la estabilidad económica, progreso social, protección al medio ambiente, participación política activa e igualdad y justicia en la sociedad.<br><br>Tener una ciudadanía informada garantiza un correcto desarrollo a futuro y nuestras delegaciones liderarán el cambio."
        },
        {
            year: 2017,
            edition: "FOR CHILDREN",
            color: "#fffdfd",
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
    #model-edition {
        background-color: #7872a1;
        background-image: url("/assets/img/backgrounds/blue_bg_darker.webp");
        background-repeat: repeat;
        background-size: cover;
        padding: 3.5vh 0 2vh 0;
        color: #fffdfd;
        font-family: "The Seasons Regular";
    }

    #model-edition h1 {
        margin: 0;
        font-weight: normal;
        padding: 0.5vh 3vw;
    }

    #model-year {
        font-size: 2.8rem;
    }

    #model-name {
        font-size: 1.9rem;
    }

    #quienes-somos {
        font-family: "Glacial Indifference Bold";
        font-size: 1.5rem;
        margin: 2.5vh 0 2.5vh 5vw;
        font-weight: normal;
    }

    #fotos-2024 {
        margin: 0;
    }

    #fotos-2024 img {
        width: 100%;
        height: auto;
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

    #smmun-info {
        background-color: #95b897;
        color: #576b58;
    }

    #mun-info {
        background-color: #898fec;
        background-image: url("/assets/img/images/un_flag.webp");
        color: #3e4176;
    }

    #un-info {
        background-color: #898fec;
        background-image: url("/assets/img/images/un_building.webp");
        color: #3e4176;
    }

    #sm-2025-info {
        background-color: #7061b3;
        background-image: url("/assets/img/ediciones/2025/bg.webp");
        color: #fffdfd;
    }
</style>

<!-- Introducción -->
<section>
    <!-- Título -->
    <article id="model-edition">
        <h1>
            <span id="model-year">SMMUN 2025 <br></span>
            <span id="model-name">| El Modelo de Naciones Unidas del Sureste Mexicano</span>
        </h1>
    </article>

    <h2 id="quienes-somos">
        ¿Quiénes somos?
    </h2>

    <!-- Fotos kodak -->
    <figure id="fotos-2024">
        <picture>
            <source media="(min-width: 820px)" srcset="/assets/img/images/img_strip.webp">
            <source media="(max-width: 820px)" srcset="/assets/img/images/img_strip_mob.webp">
            <img src="/assets/img/images/img_strip.webp" width="3783" height="593" alt="Fotos representativas de distintas ediciones del SMMUN.">
        </picture>
    </figure>
</section>

<!-- Información general -->
<section class="info-section">
    <!-- Información del SMMUN -->
    <article id="smmun-info">
        <h3>
            ¿Qué es el Modelo de Naciones Unidas del Sureste Mexicano?
        </h3>
        <p>
            El Modelo de las Naciones Unidas del Sureste Mexicano (o SMMUN por sus siglas en inglés) es un modelo de naciones hecho por y para jóvenes estudiantes con intereses en temas de derecho internacional, relaciones internacionales, derechos humanos y todo lo relacionado a la ONU. Tiene el propósito de otorgarle a las personas participantes una oportunidad para experimentar las sesiones de trabajo llevadas a cabo en las Naciones Unidas en la vida real, tratando temas de suma relevancia internacional, a la par que le permite a los participantes desarrollar habilidades de liderazgo, negociación, diplomacia, trabajo en equipo, investigación, entre otros.
            <br>
            <br>
            Tras el éxito de su primer año en 2016, se llevan a cabo las ediciones anuales del Modelo de Naciones Unidas del Sureste de México en Mérida, Yucatán. Todo estudiante de preparatoria o universidad entre los 15 y 25 años está invitado a participar en el evento que será el máximo representante del sentimiento juvenil de la Organización de las Naciones Unidas en el sureste de México.
        </p>
    </article>

    <!-- Información del MUN -->
    <article id="mun-info">
        <h3>
            ¿Qué es un MUN?
        </h3>
        <p>
            Un Modelo de Naciones Unidas es una simulación o representación del Sistema de Naciones Unidas en el que participan alumnos de escuelas secundarias, preparatorias o universidades. Los alumnos representan a los delegados de diferentes países e intervienen en debates y negociaciones en los que tratan temas que corresponden a los programas de trabajo de los diferentes órganos y comisiones de las Naciones Unidas.
            <br>
            <br>
            Un Modelo es un evento educativo y cultural en el que los jóvenes que participan, además de capacitarse sobre temas de política internacional y sobre el funcionamiento de Naciones Unidas, adquieren una visión global del mundo en donde desarrollan sus vidas.
            <br>
            <br>
            Para resolver más dudas, puedes entrar a <a target="_blank" rel="noopener noreferrer" href="http://www.cinu.mx/modelos/preguntas-frecuentes/">este link</a> o contactarnos.
        </p>
    </article>

    <!-- Información de la ONU -->
    <article id="un-info">
        <h3>
            ¿Qué es la ONU?
        </h3>
        <p>
            La Organización de las Naciones Unidas (ONU) es una organización internacional fundada en 1945 tras la Segunda Guerra Mundial por 51 países que se comprometieron a mantener la paz y la seguridad internacional, fomentar entre las naciones relaciones de amistad y promover el progreso social, la mejora del nivel de vida y los Derechos Humanos. Actualmente cuenta con 193 Estados Miembros.
            <br>
            <br>
            La ONU cuenta con 6 órganos principales y tiene una amplia gama de agencias especializadas y programas que trabajan en cuestiones específicas, como el desarrollo económico y social, la salud, la educación, los derechos humanos y el medio ambiente.
        </p>
    </article>
</section>

<!-- Ediciones del SMMUN -->
<section class="info-section">
    <!-- SMMUN 2025 -->
    <article id="sm-2025-info">
        <h3>
            SMMUN 2025; LEGADO DE LÍDERES
        </h3>
        <p>
            1-5 DE ABRIL
        </p>
    </article>

    <!-- SMMUN 2024 - 2016 -->
    {#each ediciones as { year, edition, color, bgColor, imageDimensions, text }}
        <SmmunEdition {year} {edition} {color} {bgColor} {imageDimensions} {text}></SmmunEdition>
    {/each}
</section>
