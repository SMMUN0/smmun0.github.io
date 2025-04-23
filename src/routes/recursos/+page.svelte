<script lang="ts">
    import ManualComite from "$lib/components/ManualComite.svelte";

    let comites = [
        {
            nombre: "Comisión de Ciencia y Tecnología para el Desarrollo",
            siglas: "CSTD"
        },
        {
            nombre: "United Nations Committee on the Rights of the Child",
            siglas: "CRC"
        },
        {
            nombre: "Organización Internacional del Trabajo",
            siglas: "OIT"
        },
        {
            nombre: "Comité Noruego del Nobel",
            siglas: "Nobel"
        },
        {
            nombre: "Conferencia Regional sobre la Mujer de América Latina y el Caribe",
            siglas: "CRM"
        },
        {
            nombre: "Fondo de Población de las Naciones Unidas",
            siglas: "UNFPA"
        },
        {
            nombre: "United Nations Office of the Secretary-General's Envoy on Youth",
            siglas: "OSGEY"
        },
        {
            nombre: "Comisión Interamericana de Derechos Humanos",
            siglas: "CIDH"
        },
        {
            nombre: "Corte Internacional de Justicia",
            siglas: "CIJ"
        },
        {
            nombre: "Comité Olímpico Internacional",
            siglas: "COI"
        }
    ];
</script>

<style>
    #titulo-carta, #titulo-manuales {
        background-color: #042654;
        padding: 3.5vh 0 2vh 0;
        color: #fffdfd;
        font-family: "The Seasons Regular";
        font-size: 2.5rem;
    }

    #titulo-manuales {
        background-color: #95b897;
    }

    #titulo-carta h1, #titulo-manuales h1 {
        margin: 0;
        font-weight: normal;
        padding: 0.5vh 9vw;
    }

    #comites-manuales {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: auto;
        margin: 0 9vw;
    }

    #comites-manuales div {
        flex: 40%;
    }

    #texto-carta {
        font-family: "Glacial Indifference Regular";
        font-size: 1rem;
        color: #000000;
        padding: 0 20vw 0 9vw;
        text-align: justify;
    }

    @media screen and (max-width: 820px) {
        #texto-carta {
            padding: 0 9vw;
        }
    }

    #texto-carta strong {
        font-weight: normal;
        font-family: "Glacial Indifference Bold";
    }

    #texto-carta .center {
        display: block;
        text-align: center;
    }

    #texto-carta .blue {
        color: #063372;
    }

    #texto-carta .green {
        color: #809f81;
    }

    #texto-carta .purple {
        color: #8d7abb;
    }

    #bienvenidas {
        font-size: 1.2rem;
    }

    #comite-organizador {
        font-size: 0.9rem;
    }
</style>

<!-- Manuales -->
<section>
    <div id="titulo-manuales">
        <h1>
            Manuales para Delegaciones
        </h1>
    </div>

    <article id="comites-manuales">
        {#each comites as { nombre, siglas }}
            <div>
                <ManualComite {nombre} {siglas}></ManualComite>
            </div>
        {/each}
    </article>
</section>

<!-- Carta -->
<section>
    <!-- Carta para las delegaciones -->
    <article id="carta-delegacion">
        <div id="titulo-carta">
            <h1>
                Querida Delegación,
            </h1>
        </div>
        <p id="texto-carta">
            <em id="bienvenidas" class="center">Bienvenidas al Modelo de Soñadores,</em>
            <br>
            Con gran entusiasmo y emoción, el Comité Organizador de la Décima Edición del Modelo de Naciones Unidas del Sureste Mexicano (SMMUN), "Legado de Líderes", les da la más cordial bienvenida.
            <br>
            <br>
            Nos llena de profunda alegría saber que han decidido formar parte de esta aventura, donde se conjugan la diplomacia, el liderazgo y el compromiso por construir un mundo mejor.
            <br>
            <br>
            En esta carta, queremos expresarles nuestra más sincera felicitación por haber tomado la valiente decisión de inscribirse. Creemos en su potencial y estamos seguros de que tienen todo lo necesario para alcanzar grandes objetivos.
            <br>
            <br>
            El SMMUN  es un modelo formado de soñadores, gente que está dispuesta a no tener límites cuando sueñan. Bajo las condiciones precisas y sobre todo, aquellas personas que tienen la pasión que les caracteriza, esos sueños encuentran un espacio para volverse realidad. <em>Sigan soñando, sigan alzando la voz.</em>
            <br>
            <br>
            <strong class="blue">No tengan miedo de alzar su voz.</strong>
            <br>
            <br>
            Cada una de ustedes tiene algo valioso que aportar al mundo. Confíen en sus habilidades y en su potencial. Esperamos que al alzar tu placard puedas también alzar tu voz, que lo que te incomode no permitas que incomode a las demás. En definitiva, no solo es tener las ideas sino el poder materializarlas, encontremos con amor, empatía y respeto como hacerlo. Su apoyo y su esfuerzo será el camino que deberán seguir para cumplir todas sus metas, pongan todo su empeño y disfruten de esta aventura y que la suerte esté siempre de su lado.
            <br>
            <br>
            Por otra parte, cabe destacar que la valentía que se requiere para llegar aquí es invaluable y es el primer paso para transformar su realidad. Muchas veces nos cuestionamos el porqué haremos esta clase de cosas, porque estamos aquí, pero recuerda siempre que se trata de las personas que impactas y te impactan, de la experiencia, que si, tienes que vivir para entender.
            <br>
            <br>
            <strong class="green">El SMMUN es un espacio para soñar, para crecer y para transformar.</strong>
            <br>
            <br>
            Aquí tendrán la oportunidad de conocer a personas de diferentes culturas, de debatir sobre temas de actualidad y de proponer soluciones a los problemas que aquejan a nuestra sociedad. No subestimen el poder de sus voces y acciones. Ustedes son la fuerza impulsora de la transformación. Hagan oír su eco en el mundo.
            <br>
            <br>
            Sueña en grande, vive al máximo y siempre, siempre, pero siempre, cree en tí.
            <br>
            <br>
            <strong class="purple">Aprovechen al máximo esta experiencia.</strong>
            <br>
            <br>
            Hagan nuevas amistades, aprendan cosas nuevas y dejen que su voz resuene en el mundo. Sé que quizás sentir miedo e incertidumbre sea una realidad por lo que está por venir, pero respira y reconoce lo que has logrado para estar aquí, has tenido que ser valiente, superado miedos, y por más caídas que has tenido, te has levantado. Disfruta lo que tienes, ama quien eres y goza todo lo que haces porque te hace ser increíble.
            <br>
            <br>
            <strong class="blue">¡El cambio comienza en ti!</strong>
            <br>
            <br>
            Sean la generación de líderes que el mundo necesita. Hay decisiones en la vida que marcan profundas transformaciones en nuestras personas y si estas aquí, es porque tienes algo valioso que aportar, confía en tus habilidades, estas cada vez más cerca de cambiar el mundo.
            <br>
            <br>
            Ustedes son personas mágicas y capaces de todo, siguen atreviéndose a luchar por una sociedad más justa, romper estigmas  y patrones. Como juventudes hay que atrevernos a tomar lugares y actuar por lo que consideran correcto, ser los futuros líderes, comenzar a transformar el mundo que conocemos y seguir construyendo un legado de cambios y crear el camino para que todas podamos crecer sin obstáculos.
            <br>
            <br>
            <strong class="green">El Comité Organizador está aquí para apoyarles en cada paso del camino.</strong>
            <br>
            <br>
            Nuestro compromiso es para que este <strong>SMMUN 2025; Legado de Líderes</strong> sea una experiencia inolvidable para todas ustedes. El comité organizador está más que feliz de tenerles aquí, arriesgate a vivir esta experiencia, si tienes miedo, hazlo con miedo, pero nunca dejes escapar este sueño.
            <br>
            <br>
            No olvides que el legado del SM es dejar huella, aprender, liderar e inspirar.
            <br>
            <br>
            <strong class="purple">
                Gracias por ser parte del Legado de Líderes. <br>
                Gracias a ustedes existe el SMMUN.
            </strong>
            <br>
            <br>
            <strong class="center purple">
                Una parte de todas queda en el foro y nos vamos cambiadas, <br>
                porque sus voces cambian el mundo.
            </strong>
            <br>
            <strong class="purple">Con los mejores deseos,</strong><br>
            <strong id="comite-organizador" class="green">Comité Organizador del SMMUN 2025; Legado de Líderes</strong>
        </p>
    </article>
</section>
