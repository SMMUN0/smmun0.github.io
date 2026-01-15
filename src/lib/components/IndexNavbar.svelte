<script lang="ts">
    import { page } from "$app/state";

    let { mobile }: { mobile: string } = $props();

    let menuOpen = $state(false);

    const pages = {
        "/": "Inicio",
        "/quienes-somos": "¿Quiénes somos?",
        "/registro": "Registro",
        "/recursos": "Recursos"
    };
</script>

<style>
    nav {
        display: grid;
        /*row-gap: 10vh;
        column-gap: 2vw;*/
        grid-auto-rows: auto;
        /*flex-direction: row;*/
        align-items: end;
        justify-content: space-evenly;
        margin: 4vh 0;
        text-align: center;
        position: relative;
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
        color: #ea6880;
        margin: 0;
    }

    #center h2 {
        font-weight: normal;
        font-family: "Catchy Mager";
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

    .bar {
        display: block;
        width: 25px;
        height: 3px;
        margin: 5px auto;
        -webkit-transition: all 0.3s ease-in-out;
        transition: all 0.3s ease-in-out;
        background-color: #454140;
    }

    #nav-menu {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: fixed;
        left: -105%;
        top: 5rem;
        flex-direction: column;
        width: 100%;
        border-radius: 24px;
        text-align: center;
        transition: 0.3s;
        background-color: #fff;
        box-shadow: 0px 0px 5px 2px;
        z-index: 6;
        padding: 0;
    }

    #nav-menu.active {
        left: 0;
    }

    .nav-item {
        margin: 2.5rem 0;
        list-style: none;
        width: 80%;
        border-radius: 24px;
    }

    .nav-item a {
        font-family: "Glacial Indifference Bold";
        line-height: 3rem;
        font-size: 1.6rem;
        text-decoration: none;
        display: block;
        color: #845a50;
    }

    #hamburger {
        border: none;
        background-color: transparent;
        display: block;
        cursor: pointer;
        padding: 1vh 5vw 1vh 0;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 7;
    }

    #hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }

    #hamburger.active .bar:nth-child(1) {
        -webkit-transform: translateY(8px) rotate(45deg);
        transform: translateY(8px) rotate(45deg);
    }

    #hamburger.active .bar:nth-child(3) {
        -webkit-transform: translateY(-8px) rotate(-45deg);
        transform: translateY(-8px) rotate(-45deg);
    }

    @media (prefers-reduced-motion: no-preference) {
        a:hover::after {
            transform: scaleX(1);
        }
    }
</style>

<nav style="grid-template-columns: {mobile ? "repeat(1, 1fr)" : "repeat(6, 1fr)"};">
    {#if mobile}
        <ul id="nav-menu" class:active={menuOpen}>
            {#each Object.entries(pages) as [slug, name]}
                <li class="nav-item">
                    <a href={slug} onclick={() => menuOpen = false}>{name}</a>
                </li>
            {/each}
        </ul>
        <button
            id="hamburger"
            class:active={menuOpen}
            onclick={() => menuOpen = !menuOpen}
            aria-label="Menú"
        >
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </button>
    {/if}
    {#if !mobile}
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
    {/if}

    <div id="center" style="margin-top: {mobile ? "2vh" : "0"};">
        <figure>
            <img src="/assets/img/logos/smmun_deg.svg" alt="Logo del SMMUN." style="height: {mobile ? "8vh" : "6vh"};">
        </figure>

        <h1 style="font-size: {mobile ? "1.6rem" : "1.3rem"};">SMMUN</h1>
        <h2 style="font-size: {mobile ? "2.3rem" : "2rem"};">POR UNA NUEVA HISTORIA</h2>
    </div>

    {#if !mobile}
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
    {/if}
</nav>
