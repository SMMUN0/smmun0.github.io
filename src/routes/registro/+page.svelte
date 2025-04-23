<style>
    #convocatorias-title {
        background-color: #6f75d5cf;
        padding: 2vh 0 2vh 0;
        color: #fffdfd;
        font-family: "Glacial Indifference Regular";
    }

    #convocatorias-title h1 {
        margin: 0;
        font-weight: normal;
        padding: 0.5vh 3vw;
        font-size: 2.3rem;
    }

    #oval {
        max-width: fit-content;
        border: solid #fffdfd;
        border-radius: 120px / 70px;
        text-align: center;
        margin: auto;
    }

    #convocatorias {
        display: flex;
        margin-top: 5vh;
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
        border-radius: 12px;
    }

    .convocatoria h2 {
        margin: 0;
        font-family: "Glacial Indifference Bold";
        font-size: 1.75rem;
        font-weight: normal;
    }

    .convocatoria p {
        margin: 0;
        font-family: "Glacial Indifference Bold";
        font-size: 1rem;
        font-weight: normal;
        color: #809f81;
    }

    .convocatoria a {
        text-decoration: none;
        color: #8d7abb;
    }

    .convocatoria a:hover {
        opacity: 0.8;
    }

    .convocatoria a:visited {
        margin: 0;
        color: #8d7abb;
    }
</style>

<section>
    <!-- Título -->
    <article id="convocatorias-title">
        <div id="oval">
            <h1>
                Convocatorias
            </h1>
        </div>
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

        <div class="convocatoria">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSeOeD_QRVnQkeZk8SlzDmNoIuuC1gf3e7WyDj1ylHg8ouzbgw/viewform" aria-label="Registro para staff.">
                <figure>
                    <enhanced:img src="/static/assets/img/convocatorias/staff.webp" alt="Staff del SMMUN.">
                </figure>
            </a>
            <h2><a href="https://docs.google.com/forms/d/e/1FAIpQLSeOeD_QRVnQkeZk8SlzDmNoIuuC1gf3e7WyDj1ylHg8ouzbgw/viewform">Staff</a></h2>
            <p>¡Sé parte del cambio!</p>
        </div>
    </article>
</section>
