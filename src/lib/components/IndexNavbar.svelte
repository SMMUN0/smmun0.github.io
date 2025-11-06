<style>
    nav {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        /*row-gap: 10vh;
        column-gap: 2vw;*/
        grid-auto-rows: auto;
        /*flex-direction: row;*/
        align-items: end;
        justify-content: space-evenly;
        margin: 4vh 0;
        text-align: center;
    }

    #center {
        grid-column: auto / span 2;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    #center img {
        width: auto;
        height: 6vh;
    }

    #center h1 {
        font-weight: normal;
        font-family: "The Seasons";
        font-size: 1.3rem;
        color: #ea6880;
        margin: 0;
    }

    #center h2 {
        font-weight: normal;
        font-family: "Catchy Mager";
        font-size: 2rem;
        color: #f4b893;
        margin: 0;
    }

    div:has(a) {
        margin-bottom: 1vh;
        display: flex;
        flex-direction: column;
        justify-content: end;
        align-items: center;
    }

    a {
        cursor: pointer;
        font-family: "The Seasons";
        font-size: 1rem;
        color: #845a50;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        position: relative;
    }

    a::after {
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
        a:hover::after {
            transform: scaleX(1);
        }
    }
</style>

<nav>
    <div>
        <a href="/">
            Inicio
        </a>
    </div>

    <div>
        <a href="/quienes-somos">
            ¿Quiénes somos?
        </a>
    </div>

    <div id="center">
        <figure>
            <img src="/assets/img/logos/smmun_deg.svg" alt="Logo del SMMUN.">
        </figure>

        <h1>SMMUN</h1>
        <h2>POR UNA NUEVA HISTORIA</h2>
    </div>

    <div>
        <a href="/registro">
            Registro
        </a>
    </div>

    <div>
        <a href="/recursos">
            Recursos
        </a>
    </div>
</nav>
