<!--<script lang="ts">
    import { page } from "$app/state";

    // Tipo de nav: transparente, index o normal
    const navClass = $derived(page.url.pathname == "/" ? "index-variant" : "");
</script>

<style>
    nav {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        padding: 2vh 0;
        background-color: #fffdfd;
        transition: background-color 200ms linear;
    }

    .navbar-logo {
        z-index: 5;
        padding-right: 2vw;
    }

    .navbar-logo img {
        width: auto;
        height: 9vh;
    }

    nav .button {
        cursor: pointer;
        background-color: #8d7abb;
        border-color: transparent;
        border-radius: 24px;
        font-family: "Glacial Indifference Bold";
        font-size: 1rem;
        color: #fffdfd;
        min-width: 13vw;
        height: 8vh;
        text-align: center;
        line-height: 8vh;
        text-decoration: none;
    }

    .inactive-button {
        opacity: 0.70;
    }

    nav .button:hover {
        opacity: 0.85;
    }

    nav.index-variant {
        background-color: #8e98ac !important;
        background-image: url("/assets/img/backgrounds/blue_bg.webp") !important;
    }

    nav.transparent-index-variant {
        background-color: transparent !important;
        background-image: none !important;
        padding: 5vh 0;
    }

    nav.transparent-index-variant .navbar-logo {
        display: none;
    }
</style>

<nav class={navClass}>
    <a class="navbar-logo" href="/">
        <figure>
            {#if page.url.pathname == "/"}
                <enhanced:img src="/static/assets/img/logos/smmun_dorado.webp" alt="Logo del SMMUN." />
            {:else}
                <enhanced:img src="/static/assets/img/logos/smmun_deg.svg" alt="Logo del SMMUN." />
            {/if}
        </figure>
    </a>
    <a href="/" id="index-button" class="button" class:inactive-button={page.url.pathname != "/"}>
        Inicio
    </a>
    <a href="/quienes-somos" class="button" class:inactive-button={page.url.pathname != "/quienes-somos"}>
        ¿Quiénes somos?
    </a>
    <a href="/registro" class="button" class:inactive-button={!page.url.pathname.includes("/registro")}>
        Registro
    </a>
    <a href="/recursos" class="button" class:inactive-button={page.url.pathname != "/recursos"}>
        Recursos
    </a>
</nav>
-->

<script lang="ts">
    import { page } from "$app/state";

    // Tipo de nav: transparente, index o normal
    //const navClass = $derived(page.url.pathname == "/" ? "index-variant" : "");
    let { color }: { color: string } = $props();

    const pages = {
        "/": "Inicio",
        "/quienes-somos/": "¿Quiénes somos?",
        "/registro/": "Registro",
        "/recursos/": "Recursos",
        "/merch/": "Merch"
    };
</script>

<style>
    nav {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        /*row-gap: 10vh;
        column-gap: 2vw;*/
        grid-auto-rows: auto;
        /*flex-direction: row;*/
        align-items: end;
        justify-content: space-evenly;
        padding: 4vh 0;
        text-align: center;
    }

    div:has(> div) {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    div:has(> a) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 2rem;
        padding: 0 2vw;
    }

    a {
        cursor: pointer;
        font-family: "The Seasons";
        font-size: 1rem;
        color: #ffffff;
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
        background-color: #ffffff;
        transition: transform 0.25s ease-out;
        transform-origin: bottom center;
    }

    @media (prefers-reduced-motion: no-preference) {
        a:hover::after {
            transform: scaleX(1);
        }
    }

    .active-page div {
        background-color: black !important;
        border-radius: 24px;
    }
</style>

<nav style="background-color: {color};">
    {#each Object.entries(pages) as [slug, name]}
        <div class:active-page={page.url.pathname == slug}>
            <div>
                <a href={slug}>
                    {name}
                </a>
            </div>
        </div>
    {/each}
</nav>
