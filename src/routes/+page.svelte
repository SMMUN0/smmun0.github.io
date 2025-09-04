<style>
    #convocatorias-title {
        background-color: #ea6880;
        padding: 2vh 0 2vh 0;
        color: #f0f0f0;
        font-family: "Catchy Mager";
        margin-top: 10vh;
    }

    #convocatorias-title h1 {
        margin: 0;
        padding: 0.5vh 3vw;
        font-size: 2.3rem;
        text-align: center;
        font-weight: bold;
    }

    #convocatorias {
        display: flex;
        margin-top: 10vh;
    }

    .convocatoria {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: top;
        text-align: center;
    }

    @media screen and (min-width: 820px) {
        #convocatorias {
            flex-direction: row;
            align-items: top;
            justify-content: space-around;
        }

        .convocatoria {
            width: 23vw;
        }
    }

    @media screen and (max-width: 820px) {
        #convocatorias {
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .convocatoria {
            width: 80vw;
            margin-bottom: 2vh;
        }
    }

    .convocatoria figure {
        margin: 0;
    }

    .convocatoria img {
        width: 100%;
        height: auto;
        border-radius: 24px;
    }

    .convocatoria h2 {
        margin: 0.4rem 0 0 0;
        font-family: "Catchy Mager";
        font-weight: bold;
        font-size: 1.75rem;
    }

    .convocatoria p {
        margin: 0;
        font-family: "Catchy Mager";
        font-weight: bold;
        font-size: 1rem;
        color: #44372b;
    }

    .convocatoria a {
        text-decoration: none;
        color: var(--pink-color);
    }

    .convocatoria a:hover {
        opacity: 0.8;
    }

    .convocatoria a:visited {
        margin: 0;
        color: var(--pink-color);
    }
</style>

<section>
    <!-- Título -->
    <article id="convocatorias-title">
        <h1>
            REGISTRO RLM-MUN
        </h1>
    </article>

    <!-- Convocatorias -->
    <article id="convocatorias">
        <div class="convocatoria">
            <a href="/registro/delegaciones" aria-label="Registro para delegaciones.">
                <figure>
                    <enhanced:img src="/static/assets/img/convocatorias/delegaciones.webp" alt="Delegaciones del SMMUN." />
                </figure>
            </a>
            <h2><a href="/registro/delegaciones">Delegaciones</a></h2>
            <p>¿Quieres cambiar al mundo? Este es tu lugar.</p>
        </div>

        <div class="convocatoria">
            <a href="/registro/faculty" aria-label="Registro para faculty advisors.">
                <figure>
                    <enhanced:img src="/static/assets/img/convocatorias/faculty.webp" alt="Delegaciones del SMMUN." />
                </figure>
            </a>
            <h2><a href="/registro/faculty">Faculty</a></h2>
            <p>Inscribe a tu institución como delegación oficial.</p>
        </div>
    </article>
</section>
