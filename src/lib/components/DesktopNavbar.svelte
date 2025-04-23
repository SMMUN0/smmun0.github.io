<script lang="ts">
    import { page } from "$app/state";
    import { indexNavTransparent } from "$lib/stores/index-nav-transparent";

    // Tipo de nav: transparente, index o normal
    const navClass = $derived(page.url.pathname == "/" ? ($indexNavTransparent ? "transparent-index-variant" : "index-variant") : "");
</script>

<style>
    nav {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-evenly;
        padding: 2vh 0;
        background-color: #fffdfd;
        background-image: url("/assets/img/backgrounds/white_bg.webp");
        background-repeat: repeat;
        background-size: cover;
        transition: background-color 200ms linear;
    }

    .navbar-logo {
        z-index: 5;
        padding-right: 2vw;
    }

    nav figure {
        margin: 0;
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
                <enhanced:img src="/static/assets/img/logos/smmun_deg.webp" alt="Logo del SMMUN." />
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
